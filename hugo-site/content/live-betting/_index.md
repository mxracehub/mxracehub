---
title: Live Race Betting
description: Real-time betting with live odds, in-race wagering, and multi-race parlays
layout: list
profile_image: /img/betting/live-betting-hero.svg
---

# 🔴 Live Race Betting

Experience the thrill of real-time betting with live odds, in-race wagering, and exciting parlay opportunities!

<!-- Live Race Status -->
<div id="live-race-banner" class="hidden bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 my-8 shadow-lg">
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div class="flex items-center">
      <div class="w-4 h-4 bg-red-500 rounded-full animate-pulse mr-3"></div>
      <div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white" id="live-race-title">Checking for live races...</h3>
        <p class="text-gray-600 dark:text-gray-300" id="live-race-status">Loading race status...</p>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="text-center">
        <div class="text-2xl font-bold text-red-600 dark:text-red-400" id="live-lap">--/--</div>
        <div class="text-sm text-gray-500">Current Lap</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400" id="live-leader">--</div>
        <div class="text-sm text-gray-500">Leader</div>
      </div>
    </div>
  </div>
</div>

## 🎯 Live Odds & Position Betting

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
  <!-- Live Race Winner Odds -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
      <div class="flex items-center justify-between">
        <h3 class="font-bold">Race Winner Odds</h3>
        <div class="flex items-center text-green-100">
          <div class="w-2 h-2 bg-green-300 rounded-full animate-pulse mr-2"></div>
          <span class="text-sm">Live Updates</span>
        </div>
      </div>
      <p class="text-green-100 text-sm">Odds refresh every 5 seconds during races</p>
    </div>
    
    <div class="p-4">
      <div id="live-winner-odds" class="space-y-2">
        <div class="text-center text-gray-500 dark:text-gray-400 py-8">
          No live race currently active
        </div>
      </div>
    </div>
  </div>
  
  <!-- In-Race Position Changes -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
      <h3 class="font-bold">In-Race Betting</h3>
      <p class="text-blue-100 text-sm">Lap times, position changes & race events</p>
    </div>
    
    <div class="p-4 space-y-3">
      <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer live-bet" data-bet-type="position-change">
        <div>
          <div class="font-semibold text-gray-900 dark:text-white">Next Position Change</div>
          <div class="text-sm text-gray-500">Any rider gains/loses position</div>
        </div>
        <div class="font-bold text-blue-600" id="position-change-odds">--</div>
      </div>
      
      <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer live-bet" data-bet-type="fastest-lap">
        <div>
          <div class="font-semibold text-gray-900 dark:text-white">Fastest Lap Next</div>
          <div class="text-sm text-gray-500">Who sets fastest lap time</div>
        </div>
        <div class="font-bold text-green-600" id="fastest-lap-odds">--</div>
      </div>
      
      <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer live-bet" data-bet-type="crash-caution">
        <div>
          <div class="font-semibold text-gray-900 dark:text-white">Crash/Caution Flag</div>
          <div class="text-sm text-gray-500">Red flag in next 3 laps</div>
        </div>
        <div class="font-bold text-red-600" id="caution-odds">--</div>
      </div>
    </div>
  </div>
</div>

## 🎲 Multi-Race Parlay Builder

<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden my-8">
  <div class="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="text-xl font-bold mb-2">Parlay Builder</h3>
        <p class="text-purple-100">Combine multiple race bets for bigger payouts</p>
      </div>
      <div class="mt-4 sm:mt-0">
        <div class="text-right">
          <div class="text-2xl font-bold" id="parlay-multiplier">1.0x</div>
          <div class="text-sm text-purple-200">Potential Multiplier</div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Parlay Race Selection -->
  <div class="p-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Available Races -->
      <div>
        <h4 class="font-bold text-gray-900 dark:text-white mb-4">Available Races Today</h4>
        <div class="space-y-3" id="parlay-races">
          <!-- Race selection will be populated here -->
        </div>
      </div>
      
      <!-- Current Parlay -->
      <div>
        <h4 class="font-bold text-gray-900 dark:text-white mb-4">Your Parlay <span id="parlay-count" class="text-purple-600">(0 selections)</span></h4>
        <div id="parlay-selections" class="space-y-2 mb-4">
          <div class="text-center text-gray-500 dark:text-gray-400 py-8" id="empty-parlay">
            Add race bets to build your parlay
          </div>
        </div>
        
        <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div class="flex justify-between items-center mb-3">
            <span class="font-semibold text-gray-900 dark:text-white">Bet Amount:</span>
            <input type="number" id="parlay-amount" class="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="$10" min="1" max="1000">
          </div>
          
          <div class="flex justify-between items-center mb-4">
            <span class="font-semibold text-gray-900 dark:text-white">Potential Payout:</span>
            <span class="font-bold text-green-600 dark:text-green-400" id="parlay-payout">$0.00</span>
          </div>
          
          <button id="place-parlay" class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Place Parlay Bet
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

## ⚡ Real-Time Race Data

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
  <!-- Live Leaderboard -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-gradient-to-r from-yellow-600 to-orange-600 p-4 text-white">
      <h3 class="font-bold">Live Positions</h3>
      <p class="text-yellow-100 text-sm">Current race standings</p>
    </div>
    
    <div class="p-4">
      <div id="live-positions" class="space-y-2">
        <div class="text-center text-gray-500 dark:text-gray-400 py-4">
          No live race data available
        </div>
      </div>
    </div>
  </div>
  
  <!-- Lap Times -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 text-white">
      <h3 class="font-bold">Lap Times</h3>
      <p class="text-cyan-100 text-sm">Latest sector times</p>
    </div>
    
    <div class="p-4">
      <div id="lap-times" class="space-y-2">
        <div class="text-center text-gray-500 dark:text-gray-400 py-4">
          No timing data available
        </div>
      </div>
    </div>
  </div>
  
  <!-- Race Stats -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-gradient-to-r from-emerald-600 to-green-600 p-4 text-white">
      <h3 class="font-bold">Race Stats</h3>
      <p class="text-emerald-100 text-sm">Key race metrics</p>
    </div>
    
    <div class="p-4 space-y-3">
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-400">Fastest Lap:</span>
        <span class="font-bold text-gray-900 dark:text-white" id="fastest-lap-time">--:--</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-400">By:</span>
        <span class="font-bold text-gray-900 dark:text-white" id="fastest-lap-rider">--</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-400">Lead Changes:</span>
        <span class="font-bold text-gray-900 dark:text-white" id="lead-changes">--</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-400">Gap to 2nd:</span>
        <span class="font-bold text-gray-900 dark:text-white" id="leader-gap">--</span>
      </div>
    </div>
  </div>
</div>

<!-- Live Betting Modal -->
<div id="live-bet-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center p-4">
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
    <div class="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white rounded-t-xl">
      <h3 class="text-xl font-bold" id="modal-title">Place Live Bet</h3>
      <p class="text-red-100" id="modal-subtitle">Current race betting</p>
    </div>
    
    <div class="p-6">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bet Amount</label>
        <input type="number" id="live-bet-amount" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="$10" min="1" max="500">
      </div>
      
      <div class="mb-6">
        <div class="flex justify-between items-center">
          <span class="text-gray-600 dark:text-gray-400">Potential Payout:</span>
          <span class="font-bold text-green-600 dark:text-green-400" id="live-bet-payout">$0.00</span>
        </div>
      </div>
      
      <div class="flex gap-3">
        <button id="cancel-live-bet" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button id="confirm-live-bet" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Place Bet
        </button>
      </div>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  initializeLiveBetting();
  
  let liveBettingActive = false;
  let raceDataInterval;
  let oddsUpdateInterval;
  let currentParlaySelections = [];
  
  async function initializeLiveBetting() {
    // Check if there's an active race
    await checkForActiveRace();
    
    // Initialize parlay builder
    await initializeParlayBuilder();
    
    // Set up event listeners
    setupEventListeners();
    
    // Start live updates if race is active
    if (liveBettingActive) {
      startLiveUpdates();
    }
  }
  
  async function checkForActiveRace() {
    try {
      const response = await fetch('/api/races/live-status');
      if (response.ok) {
        const data = await response.json();
        
        if (data.activeRace) {
          liveBettingActive = true;
          showLiveRaceBanner(data.activeRace);
          if (data.liveOdds) {
            populateLiveOdds(data.liveOdds);
          }
          if (data.raceData) {
            populateRaceData(data.raceData);
          }
        } else {
          showNoActiveRace();
        }
      } else {
        console.log('No live race API response');
        showNoActiveRace();
      }
    } catch (error) {
      console.log('Live race API not available');
      showNoActiveRace();
    }
  }
  
  function showLiveRaceBanner(raceData) {
    document.getElementById('live-race-banner').classList.remove('hidden');
    document.getElementById('live-race-title').textContent = raceData.name || 'Live Race';
    document.getElementById('live-race-status').textContent = 
      `Lap ${raceData.currentLap || 0} of ${raceData.totalLaps || 0} • Live betting active`;
    document.getElementById('live-lap').textContent = 
      `${raceData.currentLap || 0}/${raceData.totalLaps || 0}`;
    document.getElementById('live-leader').textContent = raceData.leader || 'Loading...';
  }
  
  function populateLiveOdds(odds) {
    const container = document.getElementById('live-winner-odds');
    if (!odds || odds.length === 0) {
      container.innerHTML = '<div class="text-center text-gray-500 dark:text-gray-400 py-8">Loading live odds...</div>';
      return;
    }
    
    container.innerHTML = odds.map((rider, index) => {
      const changeIcon = rider.change === 'up' ? '🔼' : rider.change === 'down' ? '🔽' : '▶️';
      const changeColor = rider.change === 'up' ? 'text-green-600' : 
                         rider.change === 'down' ? 'text-red-600' : 'text-gray-600';
      
      return `
        <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer live-winner-bet" data-rider="${rider.name}" data-odds="${rider.odds}">
          <div class="flex items-center">
            <span class="text-sm font-bold w-8 text-gray-500">#${rider.position || index + 1}</span>
            <span class="font-semibold text-gray-900 dark:text-white">${rider.name}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="${changeColor}">${changeIcon}</span>
            <span class="font-bold text-green-600">${rider.odds}</span>
          </div>
        </div>
      `;
    }).join('');
  }
  
  function populateRaceData(raceData) {
    // Populate live positions
    if (raceData.positions) {
      const container = document.getElementById('live-positions');
      container.innerHTML = raceData.positions.slice(0, 6).map(rider => `
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center">
            <span class="font-bold w-8 text-gray-500">${rider.position}</span>
            <span class="text-gray-900 dark:text-white">${rider.name}</span>
          </div>
          <span class="text-gray-500">+${rider.gap || '0.0'}s</span>
        </div>
      `).join('');
    }
    
    // Populate lap times
    if (raceData.lapTimes) {
      const container = document.getElementById('lap-times');
      container.innerHTML = raceData.lapTimes.slice(0, 4).map(lap => `
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-900 dark:text-white">${lap.rider}</span>
          <span class="font-mono ${lap.fastest ? 'text-green-600 font-bold' : 'text-gray-500'}">${lap.time}</span>
        </div>
      `).join('');
    }
    
    // Update race stats
    if (raceData.stats) {
      document.getElementById('fastest-lap-time').textContent = raceData.stats.fastestLap || '--:--';
      document.getElementById('fastest-lap-rider').textContent = raceData.stats.fastestLapRider || '--';
      document.getElementById('lead-changes').textContent = raceData.stats.leadChanges || '--';
      document.getElementById('leader-gap').textContent = raceData.stats.leaderGap || '--';
    }
    
    // Update in-race betting odds
    if (raceData.inRaceOdds) {
      document.getElementById('position-change-odds').textContent = raceData.inRaceOdds.positionChange || '--';
      document.getElementById('fastest-lap-odds').textContent = raceData.inRaceOdds.fastestLap || '--';
      document.getElementById('caution-odds').textContent = raceData.inRaceOdds.caution || '--';
    }
  }
  
  async function initializeParlayBuilder() {
    try {
      const response = await fetch('/api/races/upcoming');
      if (response.ok) {
        const data = await response.json();
        populateParlayRaces(data.races || []);
      } else {
        populateParlayRaces([]);
      }
    } catch (error) {
      console.log('Upcoming races API not available');
      populateParlayRaces([]);
    }
  }
  
  function populateParlayRaces(races) {
    const container = document.getElementById('parlay-races');
    
    if (races.length === 0) {
      container.innerHTML = `
        <div class="text-center text-gray-500 dark:text-gray-400 py-8">
          No upcoming races available for parlay betting
        </div>
      `;
      return;
    }
    
    container.innerHTML = races.slice(0, 4).map(race => `
      <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <div class="flex items-center justify-between mb-2">
          <h5 class="font-semibold text-gray-900 dark:text-white">${race.name}</h5>
          <span class="text-xs px-2 py-1 rounded-full ${race.status === 'live' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}">${race.status}</span>
        </div>
        <p class="text-sm text-gray-500 mb-3">${race.date} ${race.time}</p>
        <div class="grid grid-cols-2 gap-2">
          <button class="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors parlay-option" data-race-id="${race.id}" data-bet="winner" data-odds="2.5">
            Race Winner (+150)
          </button>
          <button class="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors parlay-option" data-race-id="${race.id}" data-bet="podium" data-odds="1.8">
            Top 3 Finish (+80)
          </button>
        </div>
      </div>
    `).join('');
  }
  
  function setupEventListeners() {
    // Live winner betting
    document.addEventListener('click', function(e) {
      if (e.target.closest('.live-winner-bet')) {
        const bet = e.target.closest('.live-winner-bet');
        openLiveBetModal('Race Winner', bet.dataset.rider, bet.dataset.odds);
      }
      
      if (e.target.closest('.live-bet')) {
        const bet = e.target.closest('.live-bet');
        const betType = bet.dataset.betType;
        const odds = bet.querySelector('[id$="-odds"]')?.textContent || '+120';
        openLiveBetModal('In-Race Bet', betType, odds);
      }
      
      if (e.target.closest('.parlay-option')) {
        const option = e.target.closest('.parlay-option');
        addToParlayBet(option);
      }
    });
    
    // Modal handlers
    document.getElementById('cancel-live-bet')?.addEventListener('click', closeLiveBetModal);
    document.getElementById('confirm-live-bet')?.addEventListener('click', confirmLiveBet);
    
    // Amount calculation
    document.getElementById('parlay-amount')?.addEventListener('input', updateParlayPayout);
    document.getElementById('live-bet-amount')?.addEventListener('input', updateLiveBetPayout);
    
    // Place parlay bet
    document.getElementById('place-parlay')?.addEventListener('click', placeParlayBet);
  }
  
  function openLiveBetModal(type, selection, odds) {
    document.getElementById('modal-title').textContent = type;
    document.getElementById('modal-subtitle').textContent = selection;
    document.getElementById('live-bet-modal').classList.remove('hidden');
    
    // Store current bet data
    document.getElementById('live-bet-modal').dataset.selection = selection;
    document.getElementById('live-bet-modal').dataset.odds = odds;
    
    updateLiveBetPayout();
  }
  
  function closeLiveBetModal() {
    document.getElementById('live-bet-modal').classList.add('hidden');
    document.getElementById('live-bet-amount').value = '';
  }
  
  function updateLiveBetPayout() {
    const amount = parseFloat(document.getElementById('live-bet-amount').value) || 0;
    const odds = document.getElementById('live-bet-modal').dataset.odds || '+120';
    const multiplier = parseFloat(odds.replace('+', '')) / 100 + 1;
    const payout = amount * multiplier;
    
    document.getElementById('live-bet-payout').textContent = `$${payout.toFixed(2)}`;
  }
  
  function confirmLiveBet() {
    const amount = document.getElementById('live-bet-amount').value;
    const selection = document.getElementById('live-bet-modal').dataset.selection;
    
    if (!amount || parseFloat(amount) < 1) {
      alert('Please enter a valid bet amount');
      return;
    }
    
    // Place the bet via API
    placeLiveBet(selection, amount);
    closeLiveBetModal();
  }
  
  async function placeLiveBet(selection, amount) {
    try {
      const response = await fetch('/api/bets/live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selection, amount })
      });
      
      if (response.ok) {
        showBetConfirmation(`Live bet placed: $${amount} on ${selection}`);
      } else {
        alert('Failed to place bet. Please try again.');
      }
    } catch (error) {
      alert('Unable to place bet. Please check your connection.');
    }
  }
  
  function addToParlayBet(option) {
    const raceId = option.dataset.raceId;
    const betType = option.dataset.bet;
    const odds = parseFloat(option.dataset.odds);
    
    // Check if this race is already in parlay
    const existingIndex = currentParlaySelections.findIndex(s => s.raceId === raceId);
    if (existingIndex >= 0) {
      currentParlaySelections[existingIndex] = { raceId, betType, odds, text: option.textContent };
    } else {
      currentParlaySelections.push({ raceId, betType, odds, text: option.textContent });
    }
    
    updateParlayDisplay();
  }
  
  function updateParlayDisplay() {
    const container = document.getElementById('parlay-selections');
    const countElement = document.getElementById('parlay-count');
    const emptyMessage = document.getElementById('empty-parlay');
    
    if (currentParlaySelections.length === 0) {
      container.innerHTML = emptyMessage.outerHTML;
    } else {
      container.innerHTML = currentParlaySelections.map((selection, index) => `
        <div class="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <span class="text-sm text-gray-900 dark:text-white">${selection.text}</span>
          <button class="text-red-600 hover:text-red-800 remove-parlay" data-index="${index}">×</button>
        </div>
      `).join('');
    }
    
    countElement.textContent = `(${currentParlaySelections.length} selections)`;
    
    // Calculate multiplier
    const multiplier = currentParlaySelections.reduce((acc, sel) => acc * sel.odds, 1);
    document.getElementById('parlay-multiplier').textContent = `${multiplier.toFixed(1)}x`;
    
    // Enable/disable place bet button
    const placeButton = document.getElementById('place-parlay');
    placeButton.disabled = currentParlaySelections.length < 2;
    
    updateParlayPayout();
    
    // Add remove handlers
    document.querySelectorAll('.remove-parlay').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        currentParlaySelections.splice(index, 1);
        updateParlayDisplay();
      });
    });
  }
  
  function updateParlayPayout() {
    const amount = parseFloat(document.getElementById('parlay-amount').value) || 0;
    const multiplier = currentParlaySelections.reduce((acc, sel) => acc * sel.odds, 1);
    const payout = amount * multiplier;
    
    document.getElementById('parlay-payout').textContent = `$${payout.toFixed(2)}`;
  }
  
  async function placeParlayBet() {
    const amount = document.getElementById('parlay-amount').value;
    
    if (!amount || parseFloat(amount) < 1) {
      alert('Please enter a valid bet amount');
      return;
    }
    
    if (currentParlaySelections.length < 2) {
      alert('Please select at least 2 races for a parlay');
      return;
    }
    
    try {
      const response = await fetch('/api/bets/parlay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          selections: currentParlaySelections,
          amount: parseFloat(amount)
        })
      });
      
      if (response.ok) {
        showBetConfirmation(`Parlay bet placed: $${amount} on ${currentParlaySelections.length} races`);
        
        // Reset parlay
        currentParlaySelections = [];
        updateParlayDisplay();
        document.getElementById('parlay-amount').value = '';
      } else {
        alert('Failed to place parlay bet. Please try again.');
      }
    } catch (error) {
      alert('Unable to place parlay bet. Please check your connection.');
    }
  }
  
  function startLiveUpdates() {
    // Update odds every 5 seconds
    oddsUpdateInterval = setInterval(updateLiveData, 5000);
    
    // Update race data every 10 seconds
    raceDataInterval = setInterval(updateRaceData, 10000);
  }
  
  async function updateLiveData() {
    try {
      const response = await fetch('/api/races/live-odds');
      if (response.ok) {
        const data = await response.json();
        if (data.odds) {
          populateLiveOdds(data.odds);
        }
        if (data.raceData) {
          populateRaceData(data.raceData);
        }
      }
    } catch (error) {
      console.log('Live odds update failed');
    }
  }
  
  async function updateRaceData() {
    try {
      const response = await fetch('/api/races/live-data');
      if (response.ok) {
        const data = await response.json();
        if (data.raceData) {
          populateRaceData(data.raceData);
        }
      }
    } catch (error) {
      console.log('Race data update failed');
    }
  }
  
  function showBetConfirmation(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg font-medium';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 4000);
  }
  
  function showNoActiveRace() {
    // Update UI to show no active race
    const container = document.querySelector('#live-winner-odds');
    if (container) {
      container.innerHTML = `
        <div class="text-center py-8 text-gray-500 dark:text-gray-400">
          <div class="text-4xl mb-4">🏁</div>
          <h3 class="font-bold mb-2">No Live Race Active</h3>
          <p class="text-sm">Live betting will be available during race events</p>
        </div>
      `;
    }
  }
  
  // Cleanup intervals when page unloads
  window.addEventListener('beforeunload', function() {
    if (oddsUpdateInterval) clearInterval(oddsUpdateInterval);
    if (raceDataInterval) clearInterval(raceDataInterval);
  });
});
</script>

<!-- Load Social Sharing for Big Wins -->
<script src="/js/social-sharing.js"></script>

<script>
// Enhanced live betting with win sharing
document.addEventListener('DOMContentLoaded', function() {
  // Add a demo button to test the sharing feature
  const demoSection = document.createElement('div');
  demoSection.className = 'bg-yellow-100 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-6 text-center';
  demoSection.innerHTML = `
    <h4 class="font-bold text-yellow-800 dark:text-yellow-200 mb-2">🎉 Demo Feature</h4>
    <p class="text-yellow-700 dark:text-yellow-300 mb-3">Try out the social sharing feature for big wins!</p>
    <button id="demo-big-win" class="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium transition-colors">
      Simulate Big Win & Share
    </button>
  `;
  
  // Insert after the live race banner
  const banner = document.getElementById('live-race-banner');
  if (banner && banner.nextSibling) {
    banner.parentNode.insertBefore(demoSection, banner.nextSibling);
  }
  
  // Add demo functionality
  document.getElementById('demo-big-win')?.addEventListener('click', function() {
    // Create a realistic big win scenario
    const bigWinData = {
      id: Date.now(),
      payout: 1250.00,
      amount: 75.00,
      raceName: 'Thunder Valley National - 450 Main Event',
      betType: 'Live Race Winner',
      odds: '+1567',
      status: 'won'
    };
    
    // Show celebration notification first
    showBigWinCelebration(bigWinData);
    
    // Then show sharing modal after celebration
    setTimeout(() => {
      if (window.winSharingManager) {
        window.winSharingManager.showWinSharingModal(bigWinData);
      }
    }, 3000);
  });
  
  function showBigWinCelebration(winData) {
    const celebration = document.createElement('div');
    celebration.className = 'fixed inset-0 z-50 flex items-center justify-center pointer-events-none';
    celebration.innerHTML = `
      <div class="text-center animate-bounce">
        <div class="text-8xl mb-4">🎉🏆💰</div>
        <div class="text-4xl font-bold text-yellow-400 mb-2">BIG WIN!</div>
        <div class="text-3xl font-bold text-white">$${winData.payout.toFixed(2)}</div>
        <div class="text-xl text-gray-300 mt-2">${winData.raceName}</div>
      </div>
    `;
    
    document.body.appendChild(celebration);
    
    // Remove after animation
    setTimeout(() => {
      if (celebration.parentNode) {
        celebration.parentNode.removeChild(celebration);
      }
    }, 3000);
  }
  
  // Integrate with existing bet confirmation
  const originalConfirmLiveBet = window.confirmLiveBet;
  if (originalConfirmLiveBet) {
    window.confirmLiveBet = function() {
      originalConfirmLiveBet();
      
      // Simulate a win scenario for demo (in real app, this would come from your API)
      setTimeout(() => {
        const randomWin = Math.random() > 0.7; // 30% chance of big win
        if (randomWin) {
          const winAmount = Math.random() * 500 + 100; // $100-$600 win
          const betAmount = 25;
          
          const winData = {
            id: Date.now(),
            payout: winAmount,
            amount: betAmount,
            raceName: 'Live Race Bet',
            betType: 'Position Change',
            odds: '+' + Math.floor((winAmount / betAmount - 1) * 100),
            status: 'won'
          };
          
          // Trigger the sharing modal for big wins
          if (winAmount >= 50) {
            document.dispatchEvent(new CustomEvent('betSettled', { detail: winData }));
          }
        }
      }, 2000);
    };
  }
});
</script>