---
title: "Achievement System Testing Guide"
description: "Complete guide to testing and configuring the MXRaceHub achievement system"
layout: "single"
type: "page"
---

# Achievement System Testing Guide

## 🎯 How to Test Achievement Triggers

### 1. **Test First Bet Badge**
```bash
# Simulate placing a first bet for user ID 1
curl -X POST http://localhost:8080/api/test/bet-placed \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "betAmount": 25.00}'

# Expected Result: "First Bet" badge awarded + activity logged
```

### 2. **Test High Roller Badge**
```bash
# Simulate placing a high-value bet
curl -X POST http://localhost:8080/api/test/bet-placed \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "betAmount": 150.00}'

# Expected Result: "High Roller" badge awarded (bet >= $100)
```

### 3. **Test Lucky Winner Badge**
```bash
# Simulate winning a bet
curl -X POST http://localhost:8080/api/test/bet-won \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "winAmount": 50.00}'

# Expected Result: "Lucky Winner" badge awarded for first win
```

### 4. **Test Win Streak Badge**
```bash
# Simulate multiple wins to build streak
curl -X POST http://localhost:8080/api/test/bet-won \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "winAmount": 30.00}'

# Repeat 3 times to trigger "Win Streak Master" badge
```

### 5. **Test Profile Complete Badge**
```bash
# Simulate profile completion
curl -X POST http://localhost:8080/api/test/profile-updated \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "completionPercentage": 100}'

# Expected Result: "Profile Complete" badge awarded
```

### 6. **Check User Achievement Status**
```bash
# Get complete user achievement overview
curl http://localhost:8080/api/test/user/1/status

# Shows all badges, progress, and recent activity
```

## ⚙️ How to Adjust Badge Requirements

### Method 1: Update Configuration File
Edit `server/config/achievementConfig.ts`:

```typescript
// Make High Roller easier to get
HIGH_ROLLER: {
  requirements: { high_value_bet: 50 }, // Changed from 100 to 50
}

// Make Race Prophet harder to achieve  
RACE_PROPHET: {
  requirements: { correct_predictions: 20 }, // Changed from 10 to 20
}

// Reduce friend inviter requirement
FRIEND_INVITER: {
  requirements: { friends_invited: 3 }, // Changed from 5 to 3
}
```

### Method 2: Real-Time Testing Scenarios

**Scenario A: Easy Mode (Lower Requirements)**
- First Bet: 1 bet (unchanged)
- High Roller: $50 (reduced from $100)
- Race Prophet: 5 predictions (reduced from 10)
- Friend Inviter: 3 friends (reduced from 5)
- Win Streak: 2 wins (reduced from 3)

**Scenario B: Challenge Mode (Higher Requirements)**
- High Roller: $250 (increased from $100)
- Race Prophet: 25 predictions (increased from 10)
- Friend Inviter: 10 friends (increased from 5)
- Win Streak: 5 wins (increased from 3)
- Daily Visitor: 14 days (increased from 7)

## 🧪 Complete Testing Sequence

### Test User Journey (User ID: 1)
```bash
# 1. Reset user for clean test
curl -X POST http://localhost:8080/api/test/reset-user \
  -d '{"userId": 1}'

# 2. Place first bet (triggers First Bet badge)
curl -X POST http://localhost:8080/api/test/bet-placed \
  -d '{"userId": 1, "betAmount": 25.00}'

# 3. Win the bet (triggers Lucky Winner badge)
curl -X POST http://localhost:8080/api/test/bet-won \
  -d '{"userId": 1, "winAmount": 40.00}'

# 4. Place high-value bet (triggers High Roller badge)
curl -X POST http://localhost:8080/api/test/bet-placed \
  -d '{"userId": 1, "betAmount": 125.00}'

# 5. Win again (building streak)
curl -X POST http://localhost:8080/api/test/bet-won \
  -d '{"userId": 1, "winAmount": 200.00}'

# 6. Win third time (triggers Win Streak Master)
curl -X POST http://localhost:8080/api/test/bet-won \
  -d '{"userId": 1, "winAmount": 75.00}'

# 7. Complete profile (triggers Profile Complete)
curl -X POST http://localhost:8080/api/test/profile-updated \
  -d '{"userId": 1, "completionPercentage": 100}'

# 8. Invite friends (progress toward Friend Inviter)
curl -X POST http://localhost:8080/api/test/friend-invited \
  -d '{"userId": 1}'

# 9. Check final status
curl http://localhost:8080/api/test/user/1/status
```

## 📊 Expected Results Dashboard

After running the complete test sequence, you should see:

**✅ Completed Badges:**
- 🎯 First Bet
- 💰 High Roller  
- 🍀 Lucky Winner
- ⚡ Win Streak Master
- ✅ Profile Complete

**📈 User Stats:**
- Total Bets: 2
- Winning Bets: 3
- Current Streak: 3
- Total Winnings: $315.00
- Profile Completion: 100%

## 🎮 Interactive Testing Tips

### Quick Badge Testing
1. **Use Postman or curl** for API testing
2. **Check console logs** for achievement awards
3. **Monitor database** for real-time updates
4. **Test edge cases** (exactly meeting requirements)

### Common Test Scenarios
- **New User**: Test first-time achievements
- **Returning User**: Test streak and progress tracking
- **High Activity**: Test multiple rapid achievements
- **Edge Cases**: Test boundary conditions (exactly $100 bet, etc.)

## 🔧 Troubleshooting

### If Badges Don't Trigger:
1. Check user stats exist in database
2. Verify achievement requirements in config
3. Look for console error messages
4. Confirm user ID exists

### To Reset Everything:
```bash
# Reset user stats
curl -X POST http://localhost:8080/api/test/reset-user -d '{"userId": 1}'

# Reinitialize achievement system
# Restart server to reload configurations
```

## 🚀 Going Live

Once testing is complete:
1. Remove test endpoints from production
2. Configure final badge requirements
3. Set up real user onboarding triggers
4. Monitor achievement completion rates
5. Adjust requirements based on user engagement data

The achievement system is now ready to boost user engagement across MXRaceHub!