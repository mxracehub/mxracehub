
---
title: "Friend Bets"
description: "Challenge your friends to head-to-head wagers on Supercross and Motocross races"
layout: "single"
---

# Friend Bets

Challenge your friends directly with custom head-to-head wagers and race predictions.

{{< rawhtml >}}
<div id="race-bet-form" class="betting-form-container">
  <form id="bet-form" class="bet-form">
    <div class="form-group">
      <label for="bet-type">Bet Type</label>
      <select id="bet-type" name="betType" required>
        <option value="">Select bet type</option>
        <option value="race_winner">Race Winner</option>
        <option value="head_to_head">Head to Head</option>
        <option value="podium">Podium Finish</option>
        <option value="holeshot">Holeshot</option>
        <option value="custom">Custom Prop</option>
      </select>
    </div>

    <div class="form-group rider-selection">
      <label>Select Rider</label>
      <select class="rider-select" name="rider1" required>
        <!-- Populated dynamically -->
      </select>
    </div>

    <div id="head-to-head-section" class="form-group" style="display: none;">
      <label>Second Rider</label>
      <select class="rider-select" name="rider2">
        <!-- Populated dynamically -->
      </select>
    </div>

    <div class="form-group">
      <label for="bet-amount">Bet Amount ($)</label>
      <input type="number" id="bet-amount" name="amount" min="5" step="5" value="10" required>
    </div>

    <div class="form-group">
      <label for="friend-select">Challenge Friend</label>
      <select id="friend-select" name="friend" required>
        <!-- Populated from friends list -->
      </select>
    </div>

    <div class="form-group">
      <label>Potential Winnings: <span id="potential-winnings">$0.00</span></label>
    </div>

    <button type="submit" class="submit-bet">Place Bet</button>
  </form>

  <div id="success-message" class="success-message" style="display: none;">
    Bet placed successfully!
  </div>
</div>

<script src="/js/race-bet-form.js"></script>
{{< /rawhtml >}}

## Betting Rules

- All bets must be accepted before race start
- Minimum bet amount is $5
- Maximum bet amount is determined by your membership level
- Results are processed within 1 hour of race completion
- Disputes are handled by our moderation team
