---
title: "My Bets"
description: "Track your bets and view results"
---

<div class="bets-page">
  <div class="bets-header">
    <h1>My Bets</h1>
    <p class="subtitle">Track your betting history and view live results</p>
  </div>
  
  <div class="bets-dashboard">
    <div class="dashboard-stats">
      <div class="stat-card">
        <div class="stat-value">$750</div>
        <div class="stat-label">Available Balance</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">$380</div>
        <div class="stat-label">Active Bets</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">$1,250</div>
        <div class="stat-label">Total Winnings</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-value">68%</div>
        <div class="stat-label">Win Rate</div>
      </div>
    </div>
  </div>
  
  <div class="bets-nav">
    <button class="nav-btn active" data-tab="active">Active Bets</button>
    <button class="nav-btn" data-tab="settled">Settled Bets</button>
    <button class="nav-btn" data-tab="groups">Group Bets</button>
  </div>
  
  <div class="bets-content">
    <!-- Active Bets Tab -->
    <div id="active-bets" class="tab-content active">
      <div class="bet-list" id="active-bet-list">
        <div class="bet-card">
          <div class="bet-header">
            <div class="bet-race">Detroit Supercross</div>
            <div class="bet-status pending">Pending</div>
          </div>
          
          <div class="bet-details">
            <div class="bet-type">Race Winner</div>
            <div class="bet-selection">Jett Lawrence</div>
            <div class="bet-odds">+150</div>
          </div>
          
          <div class="bet-footer">
            <div class="bet-amount">$100 bet</div>
            <div class="bet-potential">Potential win: $150</div>
          </div>
          
          <div class="live-indicator">
            <div class="live-label">LIVE NOW</div>
            <button class="watch-btn">Watch Race</button>
          </div>
        </div>
        
        <div class="bet-card">
          <div class="bet-header">
            <div class="bet-race">Glendale Supercross</div>
            <div class="bet-status pending">Pending</div>
          </div>
          
          <div class="bet-details">
            <div class="bet-type">Podium Finish</div>
            <div class="bet-selection">Cooper Webb</div>
            <div class="bet-odds">+200</div>
          </div>
          
          <div class="bet-footer">
            <div class="bet-amount">$50 bet</div>
            <div class="bet-potential">Potential win: $100</div>
          </div>
        </div>
        
        <div class="bet-card">
          <div class="bet-header">
            <div class="bet-race">Glendale Supercross</div>
            <div class="bet-status pending">Pending</div>
          </div>
          
          <div class="bet-details">
            <div class="bet-type">Head-to-Head</div>
            <div class="bet-selection">Chase Sexton vs. Cooper Webb (Sexton to win)</div>
            <div class="bet-odds">-120</div>
          </div>
          
          <div class="bet-footer">
            <div class="bet-amount">$120 bet</div>
            <div class="bet-potential">Potential win: $100</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Settled Bets Tab -->
    <div id="settled-bets" class="tab-content">
      <div class="bet-list" id="settled-bet-list">
        <div class="bet-card">
          <div class="bet-header">
            <div class="bet-race">Anaheim 1 Supercross</div>
            <div class="bet-status won">Won</div>
          </div>
          
          <div class="bet-details">
            <div class="bet-type">Race Winner</div>
            <div class="bet-selection">Jett Lawrence</div>
            <div class="bet-odds">+180</div>
          </div>
          
          <div class="bet-footer">
            <div class="bet-amount">$100 bet</div>
            <div class="bet-winnings">Winnings: $180</div>
          </div>
        </div>
        
        <div class="bet-card">
          <div class="bet-header">
            <div class="bet-race">San Diego Supercross</div>
            <div class="bet-status lost">Lost</div>
          </div>
          
          <div class="bet-details">
            <div class="bet-type">Podium Finish</div>
            <div class="bet-selection">Jason Anderson</div>
            <div class="bet-odds">+150</div>
          </div>
          
          <div class="bet-footer">
            <div class="bet-amount">$75 bet</div>
            <div class="bet-result">Result: 5th place</div>
          </div>
        </div>
        
        <div class="bet-card">
          <div class="bet-header">
            <div class="bet-race">Anaheim 2 Supercross</div>
            <div class="bet-status won">Won</div>
          </div>
          
          <div class="bet-details">
            <div class="bet-type">Head-to-Head</div>
            <div class="bet-selection">Cooper Webb vs. Ken Roczen (Webb to win)</div>
            <div class="bet-odds">-110</div>
          </div>
          
          <div class="bet-footer">
            <div class="bet-amount">$110 bet</div>
            <div class="bet-winnings">Winnings: $100</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Group Bets Tab -->
    <div id="group-bets" class="tab-content">
      <div class="group-selector">
        <label for="group-select">Select Group:</label>
        <select id="group-select">
          <option value="moto-maniacs">Moto Maniacs</option>
          <option value="factory-fans">Factory Fans</option>
        </select>
      </div>
      
      <div class="group-leaderboard">
        <h3>Group Leaderboard</h3>
        <table class="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Member</th>
              <th>Win/Loss</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            <tr class="current-user">
              <td>1</td>
              <td>You</td>
              <td>12-5</td>
              <td>+$430</td>
            </tr>
            <tr>
              <td>2</td>
              <td>JohnD</td>
              <td>10-7</td>
              <td>+$270</td>
            </tr>
            <tr>
              <td>3</td>
              <td>MotoFan23</td>
              <td>8-9</td>
              <td>+$150</td>
            </tr>
            <tr>
              <td>4</td>
              <td>RaceFan99</td>
              <td>7-10</td>
              <td>-$85</td>
            </tr>
            <tr>
              <td>5</td>
              <td>TwoWheelTom</td>
              <td>5-12</td>
              <td>-$210</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="group-bets-list">
        <h3>Recent Group Bets</h3>
        
        <div class="bet-card">
          <div class="bet-header">
            <div class="bet-race">Detroit Supercross</div>
            <div class="bet-user">JohnD</div>
          </div>
          
          <div class="bet-details">
            <div class="bet-type">Race Winner</div>
            <div class="bet-selection">Cooper Webb</div>
            <div class="bet-odds">+220</div>
          </div>
          
          <div class="bet-footer">
            <div class="bet-amount">$100 bet</div>
            <div class="bet-potential">Potential win: $220</div>
          </div>
        </div>
        
        <div class="bet-card">
          <div class="bet-header">
            <div class="bet-race">Detroit Supercross</div>
            <div class="bet-user">MotoFan23</div>
          </div>
          
          <div class="bet-details">
            <div class="bet-type">Race Winner</div>
            <div class="bet-selection">Chase Sexton</div>
            <div class="bet-odds">+180</div>
          </div>
          
          <div class="bet-footer">
            <div class="bet-amount">$50 bet</div>
            <div class="bet-potential">Potential win: $90</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="live-updates">
    <h2>Live Race Updates</h2>
    <div class="live-race-container">
      <div class="live-race-header">
        <div class="race-title">Detroit Supercross - 450 Main Event</div>
        <div class="race-status">Live Now</div>
      </div>
      
      <div class="lap-counter">Lap 4 of 20</div>
      
      <div class="leaderboard">
        <div class="position-row position-1">
          <div class="position-number">1</div>
          <div class="rider-info">
            <div class="rider-name">Jett Lawrence</div>
            <div class="rider-number">#18</div>
          </div>
          <div class="rider-gap">Leader</div>
        </div>
        
        <div class="position-row position-2">
          <div class="position-number">2</div>
          <div class="rider-info">
            <div class="rider-name">Cooper Webb</div>
            <div class="rider-number">#2</div>
          </div>
          <div class="rider-gap">+2.3s</div>
        </div>
        
        <div class="position-row position-3">
          <div class="position-number">3</div>
          <div class="rider-info">
            <div class="rider-name">Chase Sexton</div>
            <div class="rider-number">#1</div>
          </div>
          <div class="rider-gap">+4.7s</div>
        </div>
        
        <div class="position-row position-4">
          <div class="position-number">4</div>
          <div class="rider-info">
            <div class="rider-name">Jason Anderson</div>
            <div class="rider-number">#21</div>
          </div>
          <div class="rider-gap">+7.1s</div>
        </div>
        
        <div class="position-row position-5">
          <div class="position-number">5</div>
          <div class="rider-info">
            <div class="rider-name">Justin Barcia</div>
            <div class="rider-number">#51</div>
          </div>
          <div class="rider-gap">+9.8s</div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        navBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Hide all tab contents
        tabContents.forEach(tab => tab.classList.remove('active'));
        
        // Show the corresponding tab content
        const tabId = this.getAttribute('data-tab');
        if (tabId === 'active') {
          document.getElementById('active-bets').classList.add('active');
        } else if (tabId === 'settled') {
          document.getElementById('settled-bets').classList.add('active');
        } else if (tabId === 'groups') {
          document.getElementById('group-bets').classList.add('active');
        }
      });
    });
    
    // Simulate live race updates
    function updateRaceData() {
      // This would be replaced with real-time data from the backend
      const lapCounter = document.querySelector('.lap-counter');
      const currentLap = parseInt(lapCounter.textContent.split(' ')[1]);
      
      if (currentLap < 20) {
        lapCounter.textContent = `Lap ${currentLap + 1} of 20`;
      }
      
      // Randomly adjust rider gaps to simulate race progression
      const gaps = document.querySelectorAll('.rider-gap');
      gaps.forEach((gap, index) => {
        if (index > 0) { // Skip the leader
          const currentGap = parseFloat(gap.textContent.replace('+', '').replace('s', ''));
          const variation = (Math.random() - 0.5) * 0.8; // Random variation between -0.4 and +0.4 seconds
          const newGap = Math.max(0.1, (currentGap + variation)).toFixed(1);
          gap.textContent = `+${newGap}s`;
        }
      });
    }
    
    // Update race data every 5 seconds
    setInterval(updateRaceData, 5000);
    
    // This function would pull data from the backend API
    function fetchBetData() {
      // In a real implementation, this would make API calls to get the latest bet data
      console.log('Fetching bet data from API...');
    }
    
    // Fetch initial data and set up periodic refreshes
    fetchBetData();
    setInterval(fetchBetData, 30000); // Refresh every 30 seconds
  });
</script>

<style>
  .bets-page {
    max-width: 1200px;
    margin: 0 auto;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .bets-header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .subtitle {
    color: #666;
    font-size: 1.2rem;
  }
  
  .bets-dashboard {
    margin-bottom: 2rem;
  }
  
  .dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .stat-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #0066cc;
  }
  
  .stat-label {
    color: #666;
  }
  
  .bets-nav {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
  }
  
  .nav-btn {
    background: none;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s, color 0.2s;
  }
  
  .nav-btn:hover {
    background-color: #f0f0f0;
  }
  
  .nav-btn.active {
    background-color: #0066cc;
    color: white;
  }
  
  .tab-content {
    display: none;
  }
  
  .tab-content.active {
    display: block;
  }
  
  .bet-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .bet-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    position: relative;
  }
  
  .bet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .bet-race {
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  .bet-status {
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .pending {
    background-color: #f0f0f0;
    color: #666;
  }
  
  .won {
    background-color: #d4edda;
    color: #155724;
  }
  
  .lost {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  .bet-details {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .bet-type {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .bet-selection {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  .bet-odds {
    color: #0066cc;
    font-weight: bold;
  }
  
  .bet-footer {
    display: flex;
    justify-content: space-between;
  }
  
  .bet-amount {
    font-weight: 500;
  }
  
  .bet-potential, .bet-winnings {
    color: #155724;
    font-weight: 500;
  }
  
  .bet-result {
    color: #666;
  }
  
  .live-indicator {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #dc3545;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0 8px 0 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .live-label {
    font-size: 0.8rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .watch-btn {
    background-color: white;
    color: #dc3545;
    border: none;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
  }
  
  .group-selector {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  #group-select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-width: 200px;
  }
  
  .group-leaderboard {
    margin-bottom: 2rem;
  }
  
  .leaderboard-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  
  .leaderboard-table th, .leaderboard-table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  .leaderboard-table th {
    background-color: #f9f9f9;
    font-weight: bold;
  }
  
  .current-user {
    background-color: #e8f4ff;
    font-weight: bold;
  }
  
  .bet-user {
    font-size: 0.9rem;
    background-color: #f0f0f0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }
  
  .live-updates {
    margin-top: 3rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
  }
  
  .live-race-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .race-title {
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .race-status {
    background-color: #dc3545;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .lap-counter {
    margin-bottom: 1rem;
    font-weight: 500;
  }
  
  .leaderboard {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .position-row {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: 4px;
  }
  
  .position-1 {
    background-color: #ffeeba;
  }
  
  .position-2 {
    background-color: #e9ecef;
  }
  
  .position-3 {
    background-color: #d1ecf1;
  }
  
  .position-number {
    font-weight: bold;
    font-size: 1.2rem;
    width: 30px;
  }
  
  .rider-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .rider-name {
    font-weight: 500;
  }
  
  .rider-number {
    font-size: 0.9rem;
    color: #666;
  }
  
  .rider-gap {
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    .dashboard-stats {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .bets-nav {
      flex-wrap: wrap;
    }
    
    .bet-footer {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>