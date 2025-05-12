---
title: "Friend Bets"
description: "Challenge your friends to head-to-head wagers on Supercross and Motocross races"
layout: "single"
---

# Friend Bets

Challenge your friends directly with custom head-to-head wagers and race predictions. Create personalized bets on race outcomes, rider performance, or any other aspect of Supercross and Motocross racing.

{{< rawhtml >}}
<div id="race-bet-form">
  <!-- Race bet form will be loaded here -->
</div>
<script>
document.addEventListener('DOMContentLoaded', function() {
  fetch('/betting/friend-bets/race-bet-form')
    .then(response => response.text())
    .then(html => {
      document.getElementById('race-bet-form').innerHTML = html;
    });
});
</script>
{{< /rawhtml >}}

## Bet Types Available

- **Race Winner** - Pick the rider you think will win the race
- **Head-to-Head** - Pick which rider will finish ahead of another
- **Podium Finish** - Bet on whether a rider will make the podium
- **Custom Props** - Create your own custom proposition bets
- **Holeshot** - Predict who will get the holeshot

## How Friend Bets Work

1. Select your bet type and fill out the bet details
2. Choose a friend to challenge
3. Set your wager amount 
4. Wait for your friend to accept
5. Track the results after the race

## Betting Rules

- All bets must be accepted before race start
- Minimum bet amount is $5
- Maximum bet amount is determined by your membership level
- Results are processed within 1 hour of race completion
- Disputes are handled by our moderation team