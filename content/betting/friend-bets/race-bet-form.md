---
title: "Place a Race Bet"
description: "Bet on your favorite riders for upcoming races"
layout: "single"
---

{{< rawhtml >}}
<link rel="stylesheet" href="/css/betting-form.css">
<script src="/js/race-bet-form.js" defer></script>

<div class="betting-container">
  <h1 class="betting-title">PLACE YOUR RACE BET</h1>
  
  <div class="race-info-section">
    <h2 id="race-title">Loading race details...</h2>
    <div class="race-details">
      <div id="race-venue" class="race-detail-item">Venue: <span class="detail-value">--</span></div>
      <div id="race-date" class="race-detail-item">Date: <span class="detail-value">--</span></div>
      <div id="race-series" class="race-detail-item">Series: <span class="detail-value">--</span></div>
    </div>
  </div>
  
  <form id="bet-form" class="bet-form">
    <div class="form-section">
      <h3 class="section-title">RIDER SELECTION</h3>
      <div class="rider-selection">
        <div class="rider-odds-table">
          <div class="table-header">
            <div class="rider-col">Rider</div>
            <div class="odds-col">Odds</div>
            <div class="select-col">Select</div>
          </div>
          <div id="riders-list" class="table-body">
            <!-- Riders will be populated dynamically -->
            <div class="loading-riders">Loading riders...</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="form-section">
      <h3 class="section-title">BET DETAILS</h3>
      <div class="form-group">
        <label for="bet-amount">Bet Amount ($)</label>
        <input type="number" id="bet-amount" name="bet-amount" min="1" step="1" value="10" required>
      </div>
      
      <div class="form-group">
        <label for="bet-type">Bet Type</label>
        <select id="bet-type" name="bet-type" required>
          <option value="win">Win (Rider places 1st)</option>
          <option value="podium">Podium (Rider places top 3)</option>
          <option value="top5">Top 5 Finish</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="potential-winnings">Potential Winnings</label>
        <div id="potential-winnings" class="winnings-display">$0.00</div>
      </div>
    </div>
    
    <div class="form-section" id="friend-bet-section">
      <h3 class="section-title">FRIEND BET DETAILS</h3>
      <p class="section-description">Challenge a friend to bet against your selection</p>
      
      <div class="form-group">
        <label for="bet-type">Bet With</label>
        <select id="friend-select" name="friend-select">
          <option value="">Select a friend (optional)</option>
          <option value="friend1">John Smith</option>
          <option value="friend2">Mike Johnson</option>
          <option value="friend3">Sarah Williams</option>
          <option value="friend4">Jessica Brown</option>
        </select>
      </div>
      
      <div class="form-group friend-bet-details" style="display: none;">
        <label for="friend-message">Message to Friend</label>
        <textarea id="friend-message" name="friend-message" placeholder="Add a message to your friend with this bet challenge..."></textarea>
      </div>
    </div>
    
    <div class="form-action">
      <div class="fee-notice" id="fee-notice">
        <div class="fee-amount">Betting Fee: <span id="fee-amount">$0.10</span></div>
        <div class="fee-waiver">Premium members don't pay betting fees. <a href="/membership/premium/">Upgrade now</a></div>
      </div>
      
      <button type="submit" class="place-bet-btn">PLACE BET</button>
    </div>
  </form>
  
  <div class="betting-info">
    <h3>Betting Information</h3>
    <p>- All bets are final once placed</p>
    <p>- Non-premium members pay a 1% house fee on all bets</p>
    <p>- Friend bets allow you to challenge specific friends to bet against you</p>
    <p>- Results are processed within 1 hour after race completion</p>
    <p>- Please gamble responsibly. <a href="/responsible-gambling/">Learn more</a></p>
  </div>
</div>

<!-- Confirmation Modal -->
<div id="confirmation-modal" class="modal">
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <h2>Confirm Your Bet</h2>
    <div class="confirm-details">
      <p><strong>Race:</strong> <span id="confirm-race">--</span></p>
      <p><strong>Selection:</strong> <span id="confirm-rider">--</span></p>
      <p><strong>Bet Type:</strong> <span id="confirm-bet-type">--</span></p>
      <p><strong>Amount:</strong> $<span id="confirm-amount">--</span></p>
      <p><strong>Potential Winnings:</strong> $<span id="confirm-winnings">--</span></p>
      <p><strong>Fee:</strong> $<span id="confirm-fee">--</span></p>
      <div id="confirm-friend-section" style="display: none;">
        <p><strong>Friend Bet With:</strong> <span id="confirm-friend">--</span></p>
        <p><strong>Message:</strong> <span id="confirm-message">--</span></p>
      </div>
    </div>
    <div class="confirm-actions">
      <button id="cancel-bet" class="cancel-btn">Cancel</button>
      <button id="confirm-bet" class="confirm-btn">Confirm Bet</button>
    </div>
  </div>
</div>

<!-- Success Message -->
<div id="success-message" class="success-message">
  <div class="success-content">
    <div class="success-icon">✓</div>
    <h2>Bet Placed Successfully!</h2>
    <p>Your bet has been registered and saved to your account.</p>
    <div class="success-actions">
      <a href="/betting/my-bets/" class="view-bets-btn">View My Bets</a>
      <button id="place-another" class="another-bet-btn">Place Another Bet</button>
    </div>
  </div>
</div>
{{< /rawhtml >}}