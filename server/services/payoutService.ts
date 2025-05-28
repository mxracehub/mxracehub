import { storage } from "../storage";
import { eq, and, or } from "drizzle-orm";
import { friendBets, groupBets, groupBetParticipations, transactions, users } from "@shared/schema";

export class PayoutService {
  
  /**
   * Process all pending bet payouts when a race is completed
   */
  async processRacePayouts(raceId: number, raceResults: any) {
    console.log(`Processing payouts for race ${raceId}...`);
    
    try {
      // Process friend bets
      await this.processFriendBetPayouts(raceId, raceResults);
      
      // Process group bets
      await this.processGroupBetPayouts(raceId, raceResults);
      
      console.log(`✅ Payouts processed successfully for race ${raceId}`);
      return true;
    } catch (error) {
      console.error(`❌ Error processing payouts for race ${raceId}:`, error);
      return false;
    }
  }
  
  /**
   * Process friend bet payouts
   */
  async processFriendBetPayouts(raceId: number, raceResults: any) {
    console.log('Processing friend bet payouts...');
    
    // Get all pending friend bets for this race
    const pendingBets = await storage.getFriendBetsByStatus(0, 'pending'); // Get all pending bets
    
    for (const bet of pendingBets) {
      if (this.betAppliesToRace(bet, raceId, raceResults)) {
        const winnerId = this.determineFriendBetWinner(bet, raceResults);
        
        if (winnerId) {
          await this.settleFriendBet(bet.id, winnerId, bet.amount);
        } else {
          // Handle tie/push - return money to both parties
          await this.refundFriendBet(bet.id, bet.amount);
        }
      }
    }
  }
  
  /**
   * Process group bet payouts
   */
  async processGroupBetPayouts(raceId: number, raceResults: any) {
    console.log('Processing group bet payouts...');
    
    // Get all pending group bets for this race
    const pendingGroupBets = await storage.getGroupBetsByGroup(0); // Get all group bets
    
    for (const bet of pendingGroupBets) {
      if (bet.status === 'active' && this.betAppliesToRace(bet, raceId, raceResults)) {
        const winningOptionId = this.determineGroupBetWinner(bet, raceResults);
        
        if (winningOptionId) {
          await this.settleGroupBet(bet.id, winningOptionId);
        } else {
          // Handle no clear winner - refund all participants
          await this.refundGroupBet(bet.id);
        }
      }
    }
  }
  
  /**
   * Settle a friend bet and transfer money to winner
   */
  async settleFriendBet(betId: number, winnerId: number, amount: string) {
    try {
      const bet = await storage.getFriendBet(betId);
      if (!bet) return;
      
      const betAmount = parseFloat(amount);
      const loserId = winnerId === bet.creatorId ? bet.targetId : bet.creatorId;
      
      // Transfer money from loser to winner
      await this.transferMoney(loserId, winnerId, betAmount, 'friend_bet_win', betId);
      
      // Update bet status
      await storage.settleFriendBet(betId, winnerId);
      
      // Create activity logs
      await this.logBetSettlement(winnerId, loserId, betAmount, 'friend_bet');
      
      console.log(`✅ Friend bet ${betId} settled - $${betAmount} transferred to user ${winnerId}`);
    } catch (error) {
      console.error(`❌ Error settling friend bet ${betId}:`, error);
    }
  }
  
  /**
   * Settle a group bet and distribute winnings
   */
  async settleGroupBet(betId: number, winningOptionId: number) {
    try {
      const bet = await storage.getGroupBet(betId);
      if (!bet) return;
      
      const participations = await storage.getGroupBetParticipations(betId);
      const winningParticipations = participations.filter(p => p.selectedOptionId === winningOptionId);
      const losingParticipations = participations.filter(p => p.selectedOptionId !== winningOptionId);
      
      if (winningParticipations.length === 0) {
        // No winners - refund everyone
        await this.refundGroupBet(betId);
        return;
      }
      
      // Calculate total losing amount and winnings per winner
      const totalLosingAmount = losingParticipations.reduce((sum, p) => sum + parseFloat(p.amount), 0);
      const totalWinningAmount = winningParticipations.reduce((sum, p) => sum + parseFloat(p.amount), 0);
      
      // Distribute winnings proportionally
      for (const winner of winningParticipations) {
        const winnerBetAmount = parseFloat(winner.amount);
        const winnerShare = winnerBetAmount / totalWinningAmount;
        const payout = winnerBetAmount + (totalLosingAmount * winnerShare);
        
        // Credit the winner's account
        await this.creditAccount(winner.userId, payout, 'group_bet_win', betId);
        
        console.log(`✅ Group bet winner ${winner.userId} receives $${payout.toFixed(2)}`);
      }
      
      // Update bet status
      await storage.settleGroupBet(betId, winningOptionId);
      
      console.log(`✅ Group bet ${betId} settled with option ${winningOptionId} winning`);
    } catch (error) {
      console.error(`❌ Error settling group bet ${betId}:`, error);
    }
  }
  
  /**
   * Refund a friend bet (tie/push scenario)
   */
  async refundFriendBet(betId: number, amount: string) {
    try {
      const bet = await storage.getFriendBet(betId);
      if (!bet) return;
      
      const refundAmount = parseFloat(amount);
      
      // Refund both parties
      await this.creditAccount(bet.creatorId, refundAmount, 'bet_refund', betId);
      await this.creditAccount(bet.targetId, refundAmount, 'bet_refund', betId);
      
      // Update bet status
      await storage.updateFriendBetStatus(betId, 'refunded');
      
      console.log(`✅ Friend bet ${betId} refunded - $${refundAmount} returned to both parties`);
    } catch (error) {
      console.error(`❌ Error refunding friend bet ${betId}:`, error);
    }
  }
  
  /**
   * Refund a group bet
   */
  async refundGroupBet(betId: number) {
    try {
      const participations = await storage.getGroupBetParticipations(betId);
      
      for (const participation of participations) {
        const refundAmount = parseFloat(participation.amount);
        await this.creditAccount(participation.userId, refundAmount, 'bet_refund', betId);
      }
      
      await storage.updateGroupBetStatus(betId, 'refunded');
      
      console.log(`✅ Group bet ${betId} refunded to all participants`);
    } catch (error) {
      console.error(`❌ Error refunding group bet ${betId}:`, error);
    }
  }
  
  /**
   * Transfer money between users
   */
  async transferMoney(fromUserId: number, toUserId: number, amount: number, type: string, betId: number) {
    // Debit from loser
    await storage.createTransaction({
      userId: fromUserId,
      amount: (-amount).toString(),
      type: type + '_loss',
      description: `Lost bet ${betId}`,
      betId: betId,
      createdAt: new Date()
    });
    
    // Credit to winner
    await storage.createTransaction({
      userId: toUserId,
      amount: amount.toString(),
      type: type + '_win',
      description: `Won bet ${betId}`,
      betId: betId,
      createdAt: new Date()
    });
  }
  
  /**
   * Credit money to user account
   */
  async creditAccount(userId: number, amount: number, type: string, betId: number) {
    await storage.createTransaction({
      userId: userId,
      amount: amount.toString(),
      type: type,
      description: `Payout from bet ${betId}`,
      betId: betId,
      createdAt: new Date()
    });
  }
  
  /**
   * Check if a bet applies to the completed race
   */
  private betAppliesToRace(bet: any, raceId: number, raceResults: any): boolean {
    try {
      const betDetails = typeof bet.betDetails === 'string' ? JSON.parse(bet.betDetails) : bet.betDetails;
      return betDetails.raceId === raceId || betDetails.eventId === raceId;
    } catch {
      return false;
    }
  }
  
  /**
   * Determine winner of a friend bet based on race results
   */
  private determineFriendBetWinner(bet: any, raceResults: any): number | null {
    try {
      const betDetails = typeof bet.betDetails === 'string' ? JSON.parse(bet.betDetails) : bet.betDetails;
      
      switch (bet.betType) {
        case 'race_winner':
          const winningRider = raceResults.winner || raceResults.results?.[0];
          if (betDetails.creatorPick === winningRider) return bet.creatorId;
          if (betDetails.targetPick === winningRider) return bet.targetId;
          return null;
          
        case 'podium_finish':
          const podiumRiders = raceResults.podium || raceResults.results?.slice(0, 3) || [];
          const creatorInPodium = podiumRiders.includes(betDetails.creatorPick);
          const targetInPodium = podiumRiders.includes(betDetails.targetPick);
          
          if (creatorInPodium && !targetInPodium) return bet.creatorId;
          if (targetInPodium && !creatorInPodium) return bet.targetId;
          return null;
          
        case 'head_to_head':
          const creatorPosition = this.getRiderPosition(betDetails.creatorPick, raceResults);
          const targetPosition = this.getRiderPosition(betDetails.targetPick, raceResults);
          
          if (creatorPosition && targetPosition) {
            return creatorPosition < targetPosition ? bet.creatorId : bet.targetId;
          }
          return null;
          
        default:
          return null;
      }
    } catch (error) {
      console.error('Error determining friend bet winner:', error);
      return null;
    }
  }
  
  /**
   * Determine winning option for a group bet
   */
  private determineGroupBetWinner(bet: any, raceResults: any): number | null {
    try {
      const betDetails = typeof bet.betDetails === 'string' ? JSON.parse(bet.betDetails) : bet.betDetails;
      const winner = raceResults.winner || raceResults.results?.[0];
      
      // Find the option that matches the race winner
      const winningOption = betDetails.options?.find((option: any) => 
        option.value === winner || option.riderId === winner
      );
      
      return winningOption?.id || null;
    } catch (error) {
      console.error('Error determining group bet winner:', error);
      return null;
    }
  }
  
  /**
   * Get rider's finishing position in race results
   */
  private getRiderPosition(riderId: string | number, raceResults: any): number | null {
    try {
      if (raceResults.results && Array.isArray(raceResults.results)) {
        const position = raceResults.results.findIndex((rider: any) => 
          rider === riderId || rider.id === riderId || rider.riderId === riderId
        );
        return position >= 0 ? position + 1 : null;
      }
      return null;
    } catch {
      return null;
    }
  }
  
  /**
   * Log bet settlement for activity tracking
   */
  private async logBetSettlement(winnerId: number, loserId: number, amount: number, betType: string) {
    try {
      await storage.createActivityLog({
        userId: winnerId,
        action: 'bet_won',
        details: { amount, betType, opponent: loserId },
        createdAt: new Date()
      });
      
      await storage.createActivityLog({
        userId: loserId,
        action: 'bet_lost', 
        details: { amount, betType, opponent: winnerId },
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error logging bet settlement:', error);
    }
  }
  
  /**
   * Get user's current balance
   */
  async getUserBalance(userId: number): Promise<number> {
    try {
      const transactions = await storage.getUserTransactions(userId);
      return transactions.reduce((balance, transaction) => {
        return balance + parseFloat(transaction.amount);
      }, 0);
    } catch (error) {
      console.error('Error getting user balance:', error);
      return 0;
    }
  }
}