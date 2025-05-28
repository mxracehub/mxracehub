import { storage } from "../storage";
import { PayoutService } from "./payoutService";

export class RaceCompletionService {
  private payoutService: PayoutService;
  
  constructor() {
    this.payoutService = new PayoutService();
  }
  
  /**
   * Handle race completion and trigger automatic payouts
   */
  async handleRaceCompletion(raceId: number, raceResults: any) {
    console.log(`🏁 Race ${raceId} completed, processing automatic payouts...`);
    
    try {
      // Update race status and results
      await storage.updateRaceStatus(raceId, 'completed');
      await storage.setRaceResults(raceId, raceResults);
      
      // Process all pending bet payouts for this race
      const payoutSuccess = await this.payoutService.processRacePayouts(raceId, raceResults);
      
      if (payoutSuccess) {
        console.log(`✅ All payouts processed successfully for race ${raceId}`);
        
        // Log race completion activity
        await this.logRaceCompletion(raceId, raceResults);
        
        return {
          success: true,
          message: `Race ${raceId} completed and all winnings transferred automatically`
        };
      } else {
        console.log(`⚠️ Some payouts may have failed for race ${raceId}`);
        return {
          success: false,
          message: `Race completed but some payouts encountered issues`
        };
      }
      
    } catch (error) {
      console.error(`❌ Error handling race completion for race ${raceId}:`, error);
      return {
        success: false,
        message: `Error processing race completion: ${error.message}`
      };
    }
  }
  
  /**
   * Manually trigger payout processing for a specific race
   */
  async triggerPayouts(raceId: number) {
    console.log(`🔄 Manually triggering payouts for race ${raceId}...`);
    
    try {
      const race = await storage.getRace(raceId);
      if (!race) {
        throw new Error(`Race ${raceId} not found`);
      }
      
      if (race.status !== 'completed') {
        throw new Error(`Race ${raceId} is not completed yet`);
      }
      
      const raceResults = typeof race.results === 'string' ? JSON.parse(race.results) : race.results;
      
      const success = await this.payoutService.processRacePayouts(raceId, raceResults);
      
      return {
        success,
        message: success ? 'Payouts processed successfully' : 'Some payouts failed'
      };
      
    } catch (error) {
      console.error(`Error manually triggering payouts:`, error);
      return {
        success: false,
        message: error.message
      };
    }
  }
  
  /**
   * Get payout status for a race
   */
  async getPayoutStatus(raceId: number) {
    try {
      const friendBets = await storage.getFriendBetsByStatus(0, 'pending');
      const pendingFriendBets = friendBets.filter(bet => {
        try {
          const betDetails = typeof bet.betDetails === 'string' ? JSON.parse(bet.betDetails) : bet.betDetails;
          return betDetails.raceId === raceId;
        } catch {
          return false;
        }
      });
      
      const groupBets = await storage.getGroupBetsByGroup(0);
      const pendingGroupBets = groupBets.filter(bet => {
        if (bet.status !== 'active') return false;
        try {
          const betDetails = typeof bet.betDetails === 'string' ? JSON.parse(bet.betDetails) : bet.betDetails;
          return betDetails.raceId === raceId;
        } catch {
          return false;
        }
      });
      
      return {
        raceId,
        pendingFriendBets: pendingFriendBets.length,
        pendingGroupBets: pendingGroupBets.length,
        totalPendingBets: pendingFriendBets.length + pendingGroupBets.length
      };
      
    } catch (error) {
      console.error('Error getting payout status:', error);
      return {
        raceId,
        pendingFriendBets: 0,
        pendingGroupBets: 0,
        totalPendingBets: 0,
        error: error.message
      };
    }
  }
  
  /**
   * Log race completion activity
   */
  private async logRaceCompletion(raceId: number, raceResults: any) {
    try {
      const race = await storage.getRace(raceId);
      if (!race) return;
      
      // This would be enhanced to log to all users who had bets on this race
      console.log(`📝 Race completion logged for race ${raceId}: ${race.name}`);
      
      // Future enhancement: Send notifications to users about their bet results
      
    } catch (error) {
      console.error('Error logging race completion:', error);
    }
  }
}