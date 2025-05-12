---
title: "Betting Hub"
description: "Place bets on Supercross and Motocross races"
layout: "betting"
---

<div class="betting-container">
  <div class="betting-header">
    <h1>MXRaceHub Betting</h1>
    <p>Place bets on upcoming races and compete with friends</p>
  </div>

  <div class="betting-grid">
    <div class="betting-options">
      <h2>Available Bets</h2>
      <div class="bet-types">
        <a href="/betting/race-winner" class="bet-type">
          <span class="bet-icon">🏆</span>
          <h3>Race Winner</h3>
          <p>Pick who will win the race</p>
        </a>
        <a href="/betting/podium" class="bet-type">
          <span class="bet-icon">🏅</span>
          <h3>Podium Finish</h3>
          <p>Bet on top 3 finishers</p>
        </a>
        <a href="/betting/head-to-head" class="bet-type">
          <span class="bet-icon">⚔️</span>
          <h3>Head to Head</h3>
          <p>Pick between two riders</p>
        </a>
        <a href="/betting/holeshot" class="bet-type">
          <span class="bet-icon">🚦</span>
          <h3>Holeshot</h3>
          <p>Who gets the holeshot?</p>
        </a>
      </div>
    </div>

    <div class="next-race">
      <h2>Next Race</h2>
      <div id="race-details" class="race-card">
        Loading race details...
      </div>
    </div>
  </div>

  <div class="betting-groups">
    <h2>Betting Groups</h2>
    <div class="group-grid" id="betting-groups">
      Loading groups...
    </div>
  </div>
</div>