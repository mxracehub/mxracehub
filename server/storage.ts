import { users, type User, type InsertUser, riders, type Rider, type InsertRider, 
  teams, type Team, type InsertTeam, tracks, type Track, type InsertTrack, races, type Race, type InsertRace,
  friendBets, type FriendBet, type InsertFriendBet, groups, type Group, type InsertGroup,
  groupMembers, type GroupMember, type InsertGroupMember, groupBets, type GroupBet, type InsertGroupBet,
  groupBetOptions, type GroupBetOption, type InsertGroupBetOption, 
  groupBetParticipations, type GroupBetParticipation, type InsertGroupBetParticipation,
  transactions, type Transaction, type InsertTransaction, 
  memberships, type Membership, type InsertMembership,
  achievements, type Achievement, type InsertAchievement,
  userAchievements, type UserAchievement, type InsertUserAchievement,
  userStats, type UserStats, type InsertUserStats,
  activityLog, type ActivityLog, type InsertActivityLog } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

// Storage interface definition
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User>;
  updateUserStripeInfo(userId: number, info: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User>;
  
  // Team operations
  getTeam(id: number): Promise<Team | undefined>;
  getTeams(): Promise<Team[]>;
  getTeamByName(name: string): Promise<Team | undefined>;
  createTeam(insertTeam: InsertTeam): Promise<Team>;
  updateTeam(id: number, updates: Partial<InsertTeam>): Promise<Team>;
  
  // Rider operations
  getRider(id: number): Promise<Rider | undefined>;
  getRiderByNumber(number: number, division: string): Promise<Rider | undefined>;
  getRidersByDivision(division: string): Promise<Rider[]>;
  getRidersByTeam(teamId: number): Promise<Rider[]>;
  getActiveRiders(): Promise<Rider[]>;
  createRider(insertRider: InsertRider): Promise<Rider>;
  updateRider(id: number, updates: Partial<InsertRider>): Promise<Rider>;
  
  // Track operations
  getTrack(id: number): Promise<Track | undefined>;
  getTracks(): Promise<Track[]>;
  createTrack(insertTrack: InsertTrack): Promise<Track>;
  
  // Race operations
  getRace(id: number): Promise<Race | undefined>;
  getRacesByStatus(status: string): Promise<Race[]>;
  getUpcomingRaces(): Promise<Race[]>;
  createRace(insertRace: InsertRace): Promise<Race>;
  updateRaceStatus(raceId: number, status: string): Promise<Race>;
  setRaceResults(raceId: number, results: any): Promise<Race>;
  
  // Friend bet operations
  getFriendBet(id: number): Promise<FriendBet | undefined>;
  getFriendBetsByCreator(creatorId: number): Promise<FriendBet[]>;
  getFriendBetsByTarget(targetId: number): Promise<FriendBet[]>;
  getFriendBetsByStatus(userId: number, status: string): Promise<FriendBet[]>;
  createFriendBet(insertFriendBet: InsertFriendBet): Promise<FriendBet>;
  updateFriendBetStatus(betId: number, status: string): Promise<FriendBet>;
  settleFriendBet(betId: number, winningUserId: number): Promise<FriendBet>;
  
  // Group operations
  getGroup(id: number): Promise<Group | undefined>;
  getGroupsByMember(userId: number): Promise<Group[]>;
  createGroup(insertGroup: InsertGroup): Promise<Group>;
  
  // Group member operations
  getGroupMember(id: number): Promise<GroupMember | undefined>;
  getGroupMembers(groupId: number): Promise<GroupMember[]>;
  addGroupMember(insertGroupMember: InsertGroupMember): Promise<GroupMember>;
  removeGroupMember(groupId: number, userId: number): Promise<void>;
  
  // Group bet operations
  getGroupBet(id: number): Promise<GroupBet | undefined>;
  getGroupBetsByGroup(groupId: number): Promise<GroupBet[]>;
  createGroupBet(insertGroupBet: InsertGroupBet): Promise<GroupBet>;
  updateGroupBetStatus(betId: number, status: string): Promise<GroupBet>;
  settleGroupBet(betId: number, winningOptionId: number): Promise<GroupBet>;
  
  // Group bet option operations
  createGroupBetOption(insertGroupBetOption: InsertGroupBetOption): Promise<GroupBetOption>;
  getGroupBetOptions(betId: number): Promise<GroupBetOption[]>;
  
  // Group bet participation operations
  addGroupBetParticipation(insertParticipation: InsertGroupBetParticipation): Promise<GroupBetParticipation>;
  getGroupBetParticipations(betId: number): Promise<GroupBetParticipation[]>;
  getUserGroupBetParticipations(userId: number): Promise<GroupBetParticipation[]>;
  
  // Transaction operations
  createTransaction(insertTransaction: InsertTransaction): Promise<Transaction>;
  getUserTransactions(userId: number): Promise<Transaction[]>;
  
  // Membership operations
  createMembership(insertMembership: InsertMembership): Promise<Membership>;
  getUserMembership(userId: number): Promise<Membership | undefined>;
  cancelMembership(membershipId: number): Promise<Membership>;
  
  // Session store
  sessionStore: session.Store;
  
  // Achievement operations
  getAchievements(): Promise<Achievement[]>;
  getAchievement(id: number): Promise<Achievement | undefined>;
  createAchievement(insertAchievement: InsertAchievement): Promise<Achievement>;
  
  // User achievement operations
  getUserAchievements(userId: number): Promise<UserAchievement[]>;
  getUserAchievementsByCategory(userId: number, category: string): Promise<UserAchievement[]>;
  getUserAchievement(userId: number, achievementId: number): Promise<UserAchievement | undefined>;
  createUserAchievement(insertUserAchievement: InsertUserAchievement): Promise<UserAchievement>;
  updateUserAchievementProgress(id: number, progress: any): Promise<UserAchievement>;
  markAchievementCompleted(id: number): Promise<UserAchievement>;
  
  // User stats operations
  getUserStats(userId: number): Promise<UserStats | undefined>;
  createUserStats(insertUserStats: InsertUserStats): Promise<UserStats>;
  updateUserStats(userId: number, updates: Partial<InsertUserStats>): Promise<UserStats>;
  
  // Activity log operations
  createActivityLog(insertActivityLog: InsertActivityLog): Promise<ActivityLog>;
  getUserActivityLog(userId: number, limit?: number): Promise<ActivityLog[]>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool,
      createTableIfMissing: true 
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ stripeCustomerId })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: number, info: { stripeCustomerId: string; stripeSubscriptionId: string }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId: info.stripeCustomerId,
        stripeSubscriptionId: info.stripeSubscriptionId
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Team operations
  async getTeam(id: number): Promise<Team | undefined> {
    const [team] = await db.select().from(teams).where(eq(teams.id, id));
    return team;
  }

  async getTeams(): Promise<Team[]> {
    return await db.select().from(teams).orderBy(teams.name);
  }

  async getTeamByName(name: string): Promise<Team | undefined> {
    const [team] = await db.select().from(teams).where(eq(teams.name, name));
    return team;
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const [team] = await db.insert(teams).values(insertTeam).returning();
    return team;
  }

  async updateTeam(id: number, updates: Partial<InsertTeam>): Promise<Team> {
    const [team] = await db.update(teams).set(updates).where(eq(teams.id, id)).returning();
    return team;
  }

  // Rider operations
  async getRider(id: number): Promise<Rider | undefined> {
    const [rider] = await db.select().from(riders).where(eq(riders.id, id));
    return rider;
  }

  async getRiderByNumber(number: number, division: string): Promise<Rider | undefined> {
    const [rider] = await db
      .select()
      .from(riders)
      .where(and(eq(riders.number, number), eq(riders.division, division)));
    return rider;
  }

  async getRidersByDivision(division: string): Promise<Rider[]> {
    return await db.select().from(riders).where(eq(riders.division, division));
  }

  async getRidersByTeam(teamId: number): Promise<Rider[]> {
    return await db.select().from(riders).where(eq(riders.teamId, teamId));
  }

  async getActiveRiders(): Promise<Rider[]> {
    return await db.select().from(riders).where(eq(riders.isActive, true));
  }

  async createRider(insertRider: InsertRider): Promise<Rider> {
    const [rider] = await db.insert(riders).values(insertRider).returning();
    return rider;
  }

  async updateRider(id: number, updates: Partial<InsertRider>): Promise<Rider> {
    const [rider] = await db.update(riders).set(updates).where(eq(riders.id, id)).returning();
    return rider;
  }

  // Track operations
  async getTrack(id: number): Promise<Track | undefined> {
    const [track] = await db.select().from(tracks).where(eq(tracks.id, id));
    return track;
  }

  async getTracks(): Promise<Track[]> {
    return await db.select().from(tracks);
  }

  async createTrack(insertTrack: InsertTrack): Promise<Track> {
    const [track] = await db.insert(tracks).values(insertTrack).returning();
    return track;
  }

  // Race operations
  async getRace(id: number): Promise<Race | undefined> {
    const [race] = await db.select().from(races).where(eq(races.id, id));
    return race;
  }

  async getRacesByStatus(status: string): Promise<Race[]> {
    return await db.select().from(races).where(eq(races.status, status));
  }

  async getUpcomingRaces(): Promise<Race[]> {
    return await db.select().from(races).where(eq(races.status, "upcoming"));
  }

  async createRace(insertRace: InsertRace): Promise<Race> {
    const [race] = await db.insert(races).values(insertRace).returning();
    return race;
  }

  async updateRaceStatus(raceId: number, status: string): Promise<Race> {
    const [race] = await db
      .update(races)
      .set({ status })
      .where(eq(races.id, raceId))
      .returning();
    return race;
  }

  async setRaceResults(raceId: number, results: any): Promise<Race> {
    const [race] = await db
      .update(races)
      .set({ results, status: "completed" })
      .where(eq(races.id, raceId))
      .returning();
    return race;
  }

  // Friend bet operations
  async getFriendBet(id: number): Promise<FriendBet | undefined> {
    const [bet] = await db.select().from(friendBets).where(eq(friendBets.id, id));
    return bet;
  }

  async getFriendBetsByCreator(creatorId: number): Promise<FriendBet[]> {
    return await db.select().from(friendBets).where(eq(friendBets.creatorId, creatorId));
  }

  async getFriendBetsByTarget(targetId: number): Promise<FriendBet[]> {
    return await db.select().from(friendBets).where(eq(friendBets.targetId, targetId));
  }

  async getFriendBetsByStatus(userId: number, status: string): Promise<FriendBet[]> {
    return await db
      .select()
      .from(friendBets)
      .where(
        and(
          eq(friendBets.status, status),
          (eq(friendBets.creatorId, userId) || eq(friendBets.targetId, userId))
        )
      );
  }

  async createFriendBet(insertFriendBet: InsertFriendBet): Promise<FriendBet> {
    const [bet] = await db.insert(friendBets).values(insertFriendBet).returning();
    return bet;
  }

  async updateFriendBetStatus(betId: number, status: string): Promise<FriendBet> {
    const [bet] = await db
      .update(friendBets)
      .set({ status })
      .where(eq(friendBets.id, betId))
      .returning();
    return bet;
  }

  async settleFriendBet(betId: number, winningUserId: number): Promise<FriendBet> {
    const [bet] = await db
      .update(friendBets)
      .set({
        status: "completed",
        winningUserId,
        completedAt: new Date()
      })
      .where(eq(friendBets.id, betId))
      .returning();
    return bet;
  }

  // Group operations
  async getGroup(id: number): Promise<Group | undefined> {
    const [group] = await db.select().from(groups).where(eq(groups.id, id));
    return group;
  }

  async getGroupsByMember(userId: number): Promise<Group[]> {
    const memberGroups = await db
      .select()
      .from(groupMembers)
      .where(eq(groupMembers.userId, userId));
    
    const groupIds = memberGroups.map(member => member.groupId);
    
    if (groupIds.length === 0) return [];
    
    return await db
      .select()
      .from(groups)
      .where(eq(groups.id, groupIds[0]));
  }

  async createGroup(insertGroup: InsertGroup): Promise<Group> {
    const [group] = await db.insert(groups).values(insertGroup).returning();
    return group;
  }

  // Group member operations
  async getGroupMember(id: number): Promise<GroupMember | undefined> {
    const [member] = await db.select().from(groupMembers).where(eq(groupMembers.id, id));
    return member;
  }

  async getGroupMembers(groupId: number): Promise<GroupMember[]> {
    return await db.select().from(groupMembers).where(eq(groupMembers.groupId, groupId));
  }

  async addGroupMember(insertGroupMember: InsertGroupMember): Promise<GroupMember> {
    const [member] = await db.insert(groupMembers).values(insertGroupMember).returning();
    return member;
  }

  async removeGroupMember(groupId: number, userId: number): Promise<void> {
    await db
      .delete(groupMembers)
      .where(
        and(
          eq(groupMembers.groupId, groupId),
          eq(groupMembers.userId, userId)
        )
      );
  }

  // Group bet operations
  async getGroupBet(id: number): Promise<GroupBet | undefined> {
    const [bet] = await db.select().from(groupBets).where(eq(groupBets.id, id));
    return bet;
  }

  async getGroupBetsByGroup(groupId: number): Promise<GroupBet[]> {
    return await db.select().from(groupBets).where(eq(groupBets.groupId, groupId));
  }

  async createGroupBet(insertGroupBet: InsertGroupBet): Promise<GroupBet> {
    const [bet] = await db.insert(groupBets).values(insertGroupBet).returning();
    return bet;
  }

  async updateGroupBetStatus(betId: number, status: string): Promise<GroupBet> {
    const [bet] = await db
      .update(groupBets)
      .set({ status })
      .where(eq(groupBets.id, betId))
      .returning();
    return bet;
  }

  async settleGroupBet(betId: number, winningOptionId: number): Promise<GroupBet> {
    const [bet] = await db
      .update(groupBets)
      .set({
        status: "completed",
        winningOptionId,
        completedAt: new Date()
      })
      .where(eq(groupBets.id, betId))
      .returning();
    return bet;
  }

  // Group bet option operations
  async createGroupBetOption(insertGroupBetOption: InsertGroupBetOption): Promise<GroupBetOption> {
    const [option] = await db.insert(groupBetOptions).values(insertGroupBetOption).returning();
    return option;
  }

  async getGroupBetOptions(betId: number): Promise<GroupBetOption[]> {
    return await db.select().from(groupBetOptions).where(eq(groupBetOptions.betId, betId));
  }

  // Group bet participation operations
  async addGroupBetParticipation(insertParticipation: InsertGroupBetParticipation): Promise<GroupBetParticipation> {
    const [participation] = await db.insert(groupBetParticipations).values(insertParticipation).returning();
    return participation;
  }

  async getGroupBetParticipations(betId: number): Promise<GroupBetParticipation[]> {
    return await db.select().from(groupBetParticipations).where(eq(groupBetParticipations.betId, betId));
  }

  async getUserGroupBetParticipations(userId: number): Promise<GroupBetParticipation[]> {
    return await db.select().from(groupBetParticipations).where(eq(groupBetParticipations.userId, userId));
  }

  // Transaction operations
  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db.insert(transactions).values(insertTransaction).returning();
    return transaction;
  }

  async getUserTransactions(userId: number): Promise<Transaction[]> {
    return await db.select().from(transactions).where(eq(transactions.userId, userId));
  }

  // Membership operations
  async createMembership(insertMembership: InsertMembership): Promise<Membership> {
    const [membership] = await db.insert(memberships).values(insertMembership).returning();
    return membership;
  }

  async getUserMembership(userId: number): Promise<Membership | undefined> {
    const [membership] = await db
      .select()
      .from(memberships)
      .where(
        and(
          eq(memberships.userId, userId),
          eq(memberships.status, "active")
        )
      );
    return membership;
  }

  async cancelMembership(membershipId: number): Promise<Membership> {
    const [membership] = await db
      .update(memberships)
      .set({ status: "cancelled", autoRenew: false })
      .where(eq(memberships.id, membershipId))
      .returning();
    return membership;
  }

  // Achievement operations
  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements).where(eq(achievements.isActive, true));
  }

  async getAchievement(id: number): Promise<Achievement | undefined> {
    const [achievement] = await db.select().from(achievements).where(eq(achievements.id, id));
    return achievement;
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const [achievement] = await db.insert(achievements).values(insertAchievement).returning();
    return achievement;
  }

  // User achievement operations
  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    return await db.select().from(userAchievements).where(eq(userAchievements.userId, userId));
  }

  async getUserAchievementsByCategory(userId: number, category: string): Promise<UserAchievement[]> {
    return await db
      .select()
      .from(userAchievements)
      .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
      .where(and(eq(userAchievements.userId, userId), eq(achievements.category, category)));
  }

  async getUserAchievement(userId: number, achievementId: number): Promise<UserAchievement | undefined> {
    const [userAchievement] = await db
      .select()
      .from(userAchievements)
      .where(and(eq(userAchievements.userId, userId), eq(userAchievements.achievementId, achievementId)));
    return userAchievement;
  }

  async createUserAchievement(insertUserAchievement: InsertUserAchievement): Promise<UserAchievement> {
    const [userAchievement] = await db.insert(userAchievements).values(insertUserAchievement).returning();
    return userAchievement;
  }

  async updateUserAchievementProgress(id: number, progress: any): Promise<UserAchievement> {
    const [userAchievement] = await db
      .update(userAchievements)
      .set({ progress })
      .where(eq(userAchievements.id, id))
      .returning();
    return userAchievement;
  }

  async markAchievementCompleted(id: number): Promise<UserAchievement> {
    const [userAchievement] = await db
      .update(userAchievements)
      .set({ isCompleted: true })
      .where(eq(userAchievements.id, id))
      .returning();
    return userAchievement;
  }

  // User stats operations
  async getUserStats(userId: number): Promise<UserStats | undefined> {
    const [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return stats;
  }

  async createUserStats(insertUserStats: InsertUserStats): Promise<UserStats> {
    const [stats] = await db.insert(userStats).values(insertUserStats).returning();
    return stats;
  }

  async updateUserStats(userId: number, updates: Partial<InsertUserStats>): Promise<UserStats> {
    const [stats] = await db
      .update(userStats)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userStats.userId, userId))
      .returning();
    return stats;
  }

  // Activity log operations
  async createActivityLog(insertActivityLog: InsertActivityLog): Promise<ActivityLog> {
    const [activity] = await db.insert(activityLog).values(insertActivityLog).returning();
    return activity;
  }

  async getUserActivityLog(userId: number, limit: number = 50): Promise<ActivityLog[]> {
    return await db
      .select()
      .from(activityLog)
      .where(eq(activityLog.userId, userId))
      .orderBy(activityLog.createdAt)
      .limit(limit);
  }
}

// Export storage instance
export const storage = new DatabaseStorage();