---
title: "Friend Bets"
description: "Challenge your friends to head-to-head wagers on Supercross and Motocross races"
layout: "single"
---

# Friend Bets

Challenge your friends directly with custom head-to-head wagers. Create personalized bets on race outcomes, rider performance, or any other aspect of Supercross and Motocross racing.

## Place a Bet

<div class="bet-form">
### Select Event
<select class="form-select" id="event-select" name="eventId">
  <option value="seattle-2025">Seattle Supercross - March 8, 2025</option>
  <option value="indianapolis-2025">Indianapolis Supercross - March 1, 2025</option>
  <option value="daytona-2025">Daytona Supercross - February 22, 2025</option>
</select>

### Bet Type
<select class="form-select" id="bet-type" name="betType">
  <option value="race-winner">Race Winner</option>
  <option value="head-to-head">Head-to-Head Rider Matchup</option>
  <option value="custom">Custom Proposition</option>
</select>

### Your Prediction
<select class="form-select" id="rider-prediction" name="selectedRiderId">
  <option value="jett-lawrence">Jett Lawrence</option>
  <option value="chase-sexton">Chase Sexton</option>
  <option value="eli-tomac">Eli Tomac</option>
  <option value="cooper-webb">Cooper Webb</option>
</select>

### Wager Amount
<input type="number" class="form-input" id="wager-amount" name="wagerAmount" min="5" step="5" value="50">

### Challenge Friend
<select class="form-select" id="friend-select" name="friendId">
  <option value="">Select a friend</option>
  <option value="john-doe">John Doe</option>
  <option value="jane-smith">Jane Smith</option>
</select>

<button class="btn btn-primary" id="place-bet">Place Bet</button>
</div>

## Active Bets

<div class="bet-history">
### Detroit Supercross
- **Prediction:** Jett Lawrence to win
- **Wager:** $100
- **Status:** <span class="status status-pending">Pending</span>

### Glendale Supercross  
- **Prediction:** Cooper Webb podium finish
- **Wager:** $50
- **Status:** <span class="status status-completed">Completed</span>
</div>

<script>
document.getElementById('place-bet').addEventListener('click', function() {
  // Implement bet placement logic
  alert('Bet placed successfully!');
});
</script>