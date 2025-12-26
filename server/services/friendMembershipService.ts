// Friend-Based Membership Service - Automatic Group Creation & Free Membership
import { db } from "../db";
import { users, friendConnections, groups, groupMembers, friendMembershipTracking, friendBets } from "@shared/schema";
import { eq, and, or, sql } from "drizzle-orm";

export class FriendMembershipService {
  
  // Automatically create friend connection and group when users interact
  async createFriendConnection(userId: number, friendId: number) {
    try {
      // Check if connection already exists
      const existingConnection = await db
        .select()
        .from(friendConnections)
        .where(
          or(
            and(eq(friendConnections.userId, userId), eq(friendConnections.friendId, friendId)),
            and(eq(friendConnections.userId, friendId), eq(friendConnections.friendId, userId))
          )
        )
        .limit(1);

      if (existingConnection.length > 0) {
        return existingConnection[0];
      }

      // Create bidirectional friend connections
      const [connection1] = await db
        .insert(friendConnections)
        .values({
          userId,
          friendId,
          status: 'accepted', // Auto-accept for betting together
        })
        .returning();

      const [connection2] = await db
        .insert(friendConnections)
        .values({
          userId: friendId,
          friendId: userId,
          status: 'accepted',
        })
        .returning();

      // Automatically create private group for these friends
      const autoGroup = await this.createAutoFriendGroup(userId, friendId);
      
      // Update connections with group reference
      await db
        .update(friendConnections)
        .set({ autoGroupId: autoGroup.id })
        .where(eq(friendConnections.id, connection1.id));

      await db
        .update(friendConnections)
        .set({ autoGroupId: autoGroup.id })
        .where(eq(friendConnections.id, connection2.id));

      return connection1;
    } catch (error) {
      console.error('Error creating friend connection:', error);
      throw error;
    }
  }

  // Automatically create private group for friend pair
  async createAutoFriendGroup(userId: number, friendId: number) {
    try {
      const [user, friend] = await Promise.all([
        db.select().from(users).where(eq(users.id, userId)).limit(1),
        db.select().from(users).where(eq(users.id, friendId)).limit(1)
      ]);

      if (!user[0] || !friend[0]) {
        throw new Error('Users not found');
      }

      // Create private group for friends
      const [group] = await db
        .insert(groups)
        .values({
          name: `${user[0].username} & ${friend[0].username}`,
          description: 'Private betting group - Auto-created for friends',
          isPrivate: true,
          createdBy: userId,
          maxMembers: 2,
        })
        .returning();

      // Add both users to the group
      await db.insert(groupMembers).values([
        {
          groupId: group.id,
          userId: userId,
          role: 'admin',
          joinedAt: new Date(),
        },
        {
          groupId: group.id,
          userId: friendId,
          role: 'member',
          joinedAt: new Date(),
        }
      ]);

      // Update user friend group counts
      await Promise.all([
        db
          .update(users)
          .set({ 
            friendGroupsCount: sql`${users.friendGroupsCount} + 1` 
          })
          .where(eq(users.id, userId)),
        db
          .update(users)
          .set({ 
            friendGroupsCount: sql`${users.friendGroupsCount} + 1` 
          })
          .where(eq(users.id, friendId))
      ]);

      return group;
    } catch (error) {
      console.error('Error creating auto friend group:', error);
      throw error;
    }
  }

  // Check and activate free membership when friends bet together
  async checkFriendBettingMembership(userId: number, friendId: number, betAmount: number) {
    try {
      // Find their shared group
      const friendConnection = await db
        .select()
        .from(friendConnections)
        .where(
          and(
            eq(friendConnections.userId, userId),
            eq(friendConnections.friendId, friendId)
          )
        )
        .limit(1);

      if (!friendConnection[0] || !friendConnection[0].autoGroupId) {
        // Create connection and group if they don't exist
        await this.createFriendConnection(userId, friendId);
        return this.checkFriendBettingMembership(userId, friendId, betAmount);
      }

      const groupId = friendConnection[0].autoGroupId;

      // Check existing membership tracking
      let membershipTracking = await db
        .select()
        .from(friendMembershipTracking)
        .where(
          and(
            eq(friendMembershipTracking.userId, userId),
            eq(friendMembershipTracking.friendId, friendId),
            eq(friendMembershipTracking.groupId, groupId)
          )
        )
        .limit(1);

      if (membershipTracking.length === 0) {
        // Create new tracking record
        const [newTracking] = await db
          .insert(friendMembershipTracking)
          .values({
            userId,
            friendId,
            groupId,
            activeBetsCount: 1,
            membershipActive: true,
            lastBetAt: new Date(),
            membershipStartedAt: new Date(),
            membershipExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          })
          .returning();

        membershipTracking = [newTracking];
      } else {
        // Update existing tracking
        await db
          .update(friendMembershipTracking)
          .set({
            activeBetsCount: sql`${friendMembershipTracking.activeBetsCount} + 1`,
            lastBetAt: new Date(),
            membershipActive: true,
            membershipExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Extend 30 days
            updatedAt: new Date(),
          })
          .where(eq(friendMembershipTracking.id, membershipTracking[0].id));
      }

      // Activate free membership for both users
      await this.activateFreeMembership(userId, friendId);

      // Update friend connection stats
      await db
        .update(friendConnections)
        .set({
          lastBetTogether: new Date(),
          totalBetsTogether: sql`${friendConnections.totalBetsTogether} + 1`,
          freeMembershipActive: true,
          freeMembershipStartedAt: new Date(),
        })
        .where(
          and(
            eq(friendConnections.userId, userId),
            eq(friendConnections.friendId, friendId)
          )
        );

      return membershipTracking[0];
    } catch (error) {
      console.error('Error checking friend betting membership:', error);
      throw error;
    }
  }

  // Activate free membership for friend pair
  async activateFreeMembership(userId: number, friendId: number) {
    try {
      const membershipExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

      await Promise.all([
        db
          .update(users)
          .set({
            membershipType: 'premium_free',
            membershipExpiresAt: membershipExpiry,
            hasActiveFriendBets: true,
            lastFriendBetAt: new Date(),
            freeMembershipEligible: true,
          })
          .where(eq(users.id, userId)),
        db
          .update(users)
          .set({
            membershipType: 'premium_free',
            membershipExpiresAt: membershipExpiry,
            hasActiveFriendBets: true,
            lastFriendBetAt: new Date(),
            freeMembershipEligible: true,
          })
          .where(eq(users.id, friendId))
      ]);

      return { success: true, expiresAt: membershipExpiry };
    } catch (error) {
      console.error('Error activating free membership:', error);
      throw error;
    }
  }

  // Check if user is eligible for free membership
  async checkFreeMembershipEligibility(userId: number) {
    try {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (!user[0]) {
        return { eligible: false, reason: 'User not found' };
      }

      // Check if they have active friend bets
      const activeFriendBets = await db
        .select()
        .from(friendMembershipTracking)
        .where(
          and(
            eq(friendMembershipTracking.userId, userId),
            eq(friendMembershipTracking.membershipActive, true)
          )
        );

      const hasActiveFriendBets = activeFriendBets.length > 0;
      const currentMembership = user[0].membershipType;
      const membershipExpired = user[0].membershipExpiresAt && 
        new Date(user[0].membershipExpiresAt) < new Date();

      return {
        eligible: hasActiveFriendBets && user[0].freeMembershipEligible,
        currentMembership,
        hasActiveFriendBets,
        membershipExpired,
        friendBetsCount: activeFriendBets.length,
        expiresAt: user[0].membershipExpiresAt,
      };
    } catch (error) {
      console.error('Error checking free membership eligibility:', error);
      throw error;
    }
  }

  // Get user's friend groups and membership status
  async getUserFriendGroups(userId: number) {
    try {
      const friendGroups = await db
        .select({
          groupId: friendConnections.autoGroupId,
          friendId: friendConnections.friendId,
          friendUsername: users.username,
          friendAvatar: users.avatarUrl,
          lastBetTogether: friendConnections.lastBetTogether,
          totalBetsTogether: friendConnections.totalBetsTogether,
          freeMembershipActive: friendConnections.freeMembershipActive,
          membershipActive: friendMembershipTracking.membershipActive,
          membershipExpiresAt: friendMembershipTracking.membershipExpiresAt,
        })
        .from(friendConnections)
        .leftJoin(users, eq(users.id, friendConnections.friendId))
        .leftJoin(
          friendMembershipTracking,
          and(
            eq(friendMembershipTracking.userId, userId),
            eq(friendMembershipTracking.friendId, friendConnections.friendId)
          )
        )
        .where(eq(friendConnections.userId, userId));

      return friendGroups;
    } catch (error) {
      console.error('Error getting user friend groups:', error);
      throw error;
    }
  }

  // Automatically process friend bet and update memberships
  async processFriendBet(creatorId: number, targetId: number, betAmount: number, raceId: number) {
    try {
      // Record the friend bet
      const [friendBet] = await db
        .insert(friendBets)
        .values({
          creatorId,
          targetId,
          amount: betAmount.toString(),
          raceId,
          status: 'pending',
        })
        .returning();

      // Check and update friend membership for both users
      await Promise.all([
        this.checkFriendBettingMembership(creatorId, targetId, betAmount),
        this.checkFriendBettingMembership(targetId, creatorId, betAmount),
      ]);

      return friendBet;
    } catch (error) {
      console.error('Error processing friend bet:', error);
      throw error;
    }
  }

  // Get membership dashboard info
  async getMembershipDashboard(userId: number) {
    try {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (!user[0]) {
        throw new Error('User not found');
      }

      const eligibility = await this.checkFreeMembershipEligibility(userId);
      const friendGroups = await this.getUserFriendGroups(userId);

      return {
        user: user[0],
        eligibility,
        friendGroups,
        membershipStatus: {
          type: user[0].membershipType,
          expiresAt: user[0].membershipExpiresAt,
          isFree: user[0].membershipType === 'premium_free',
          isActive: user[0].membershipExpiresAt ? 
            new Date(user[0].membershipExpiresAt) > new Date() : false,
        }
      };
    } catch (error) {
      console.error('Error getting membership dashboard:', error);
      throw error;
    }
  }

  // Clean up expired free memberships
  async cleanupExpiredMemberships() {
    try {
      const now = new Date();

      // Find expired memberships
      const expiredUsers = await db
        .select()
        .from(users)
        .where(
          and(
            eq(users.membershipType, 'premium_free'),
            sql`${users.membershipExpiresAt} < ${now}`
          )
        );

      if (expiredUsers.length === 0) {
        return { cleaned: 0 };
      }

      // Reset to free membership
      await db
        .update(users)
        .set({
          membershipType: 'free',
          membershipExpiresAt: null,
          hasActiveFriendBets: false,
        })
        .where(
          and(
            eq(users.membershipType, 'premium_free'),
            sql`${users.membershipExpiresAt} < ${now}`
          )
        );

      // Deactivate expired friend membership tracking
      await db
        .update(friendMembershipTracking)
        .set({
          membershipActive: false,
          updatedAt: now,
        })
        .where(sql`${friendMembershipTracking.membershipExpiresAt} < ${now}`);

      return { cleaned: expiredUsers.length };
    } catch (error) {
      console.error('Error cleaning up expired memberships:', error);
      throw error;
    }
  }
}

export const friendMembershipService = new FriendMembershipService();