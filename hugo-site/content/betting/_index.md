---
title: Betting Hub
description: Place bets on races, view betting history, and track your wins with offline support
layout: list
profile_image: /img/betting/betting-hero.svg
---

# 🎯 MXRaceHub Betting Center

Your complete betting experience with offline access to betting history and account information.

<!-- Account Status Banner -->
<div id="account-status-banner" class="hidden bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 my-8 shadow-lg">
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div class="flex items-center">
      <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4" id="user-avatar">
        U
      </div>
      <div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white" id="welcome-message">Welcome back!</h3>
        <p class="text-gray-600 dark:text-gray-300" id="account-summary">Loading account details...</p>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="text-center">
        <div class="text-2xl font-bold text-green-600 dark:text-green-400" id="account-balance">$--</div>
        <div class="text-sm text-gray-500">Balance</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400" id="total-bets">--</div>
        <div class="text-sm text-gray-500">Total Bets</div>
      </div>
    </div>
  </div>
</div>

<!-- Login Prompt for Non-Authenticated Users -->
<div id="login-prompt" class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 my-8 shadow-lg text-center">
  <div class="text-4xl mb-4">🔐</div>
  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Sign In to Start Betting</h3>
  <p class="text-gray-600 dark:text-gray-300 mb-6">Create an account or sign in to place bets, track your wins, and compete on the leaderboards!</p>
  <a href="/api/login" class="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
    Sign In to Bet
  </a>
</div>

## 🏁 Active Race Betting

<div id="active-races" class="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
  <!-- Active races will be populated here -->
</div>

## 📊 Your Betting History

<div id="betting-history-section" class="hidden">
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden my-8">
    <div class="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="text-xl font-bold mb-2">Recent Bets</h3>
          <p class="text-purple-100">Your latest betting activity</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <button id="export-bets" class="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white rounded-lg transition-colors">
            Export History
          </button>
        </div>
      </div>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Date</th>
            <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Race</th>
            <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Bet</th>
            <th class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Amount</th>
            <th class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Status</th>
            <th class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Payout</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700" id="betting-history-body">
          <!-- Betting history will be populated here -->
        </tbody>
      </table>
    </div>
    
    <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4">
      <div class="flex justify-center">
        <button id="load-more-bets" class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-all duration-200">
          Load More History
        </button>
      </div>
    </div>
  </div>
</div>

## 🏆 Championship Betting

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
  <!-- 450 Championship Betting -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-gradient-to-r from-red-600 to-red-700 p-4 text-white">
      <h3 class="font-bold">450 Class Championship</h3>
      <p class="text-red-100 text-sm">Season-long betting</p>
    </div>
    <div class="p-4">
      <div id="championship-450-odds" class="space-y-2">
        <!-- Championship odds will be populated here -->
      </div>
      <button class="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors" id="bet-450-championship">
        Place Championship Bet
      </button>
    </div>
  </div>
  
  <!-- 250 Championship Betting -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
      <h3 class="font-bold">250 Class Championship</h3>
      <p class="text-blue-100 text-sm">Season-long betting</p>
    </div>
    <div class="p-4">
      <div id="championship-250-odds" class="space-y-2">
        <!-- Championship odds will be populated here -->
      </div>
      <button class="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors" id="bet-250-championship">
        Place Championship Bet
      </button>
    </div>
  </div>
</div>

<!-- Offline Mode Indicator -->
<div id="offline-betting-notice" class="hidden bg-orange-100 dark:bg-orange-900 border border-orange-200 dark:border-orange-800 rounded-lg p-4 my-6 text-center">
  <div class="flex items-center justify-center text-orange-800 dark:text-orange-200">
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
    </svg>
    <span class="font-medium">Offline Mode - Viewing cached betting information. New bets will be placed when connection returns.</span>
  </div>
</div>

<!-- Load Offline Manager and Social Sharing -->
<script src="/js/offline-manager.js"></script>
<script src="/js/social-sharing.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
  initializeBettingPage();
  
  async function initializeBettingPage() {
    try {
      // Check authentication status with offline support
      const accountInfo = await getOfflineData('accountInfo');
      
      if (accountInfo && accountInfo.offline && !isOfflineMode()) {
        showOfflineIndicator();
      }
      
      // Handle authentication state
      if (accountInfo && accountInfo.authenticated && accountInfo.user) {
        showAuthenticatedInterface(accountInfo.user);
        await loadUserBettingData();
      } else {
        showLoginPrompt();
      }
      
      // Load race and championship data
      await loadActiveRaces();
      await loadChampionshipOdds();
      
    } catch (error) {
      console.log('Initializing betting page with offline support...');
      showLoginPrompt();
    }
  }
  
  function showAuthenticatedInterface(user) {
    // Hide login prompt and show account banner
    document.getElementById('login-prompt').classList.add('hidden');
    document.getElementById('account-status-banner').classList.remove('hidden');
    document.getElementById('betting-history-section').classList.remove('hidden');
    
    // Update user info
    const userAvatar = document.getElementById('user-avatar');
    const welcomeMessage = document.getElementById('welcome-message');
    const accountSummary = document.getElementById('account-summary');
    
    if (userAvatar && user.firstName) {
      userAvatar.textContent = user.firstName.charAt(0).toUpperCase();
    }
    
    if (welcomeMessage) {
      welcomeMessage.textContent = `Welcome back, ${user.firstName || 'Rider'}!`;
    }
    
    if (accountSummary) {
      accountSummary.textContent = `Ready to place your bets for the upcoming races`;
    }
  }
  
  function showLoginPrompt() {
    document.getElementById('login-prompt').classList.remove('hidden');
    document.getElementById('account-status-banner').classList.add('hidden');
    document.getElementById('betting-history-section').classList.add('hidden');
  }
  
  async function loadUserBettingData() {
    try {
      const bettingData = await getOfflineData('userBets');
      
      if (bettingData && bettingData.bets) {
        populateBettingHistory(bettingData.bets);
        updateAccountStats(bettingData);
      }
      
    } catch (error) {
      console.log('Loading betting data with offline support...');
    }
  }
  
  async function loadActiveRaces() {
    try {
      const scheduleData = await getOfflineData('schedules');
      
      if (scheduleData && scheduleData.upcomingRaces) {
        populateActiveRaces(scheduleData.upcomingRaces);
      }
      
    } catch (error) {
      console.log('Loading race data...');
    }
  }
  
  async function loadChampionshipOdds() {
    try {
      // This would typically come from a championship odds API
      // For now, we'll use fallback data
      const championshipOdds = {
        "450": [
          { name: "Jett Lawrence", team: "Team Honda HRC", odds: "+180", backing: "67%" },
          { name: "Chase Sexton", team: "Red Bull KTM", odds: "+220", backing: "23%" },
          { name: "Eli Tomac", team: "Yamaha Star Racing", odds: "+350", backing: "8%" }
        ],
        "250": [
          { name: "Haiden Deegan", team: "Yamaha Star Racing", odds: "+140", backing: "74%" },
          { name: "Levi Kitchen", team: "Pro Circuit Kawasaki", odds: "+280", backing: "18%" },
          { name: "Tom Vialle", team: "Red Bull KTM", odds: "+320", backing: "6%" }
        ]
      };
      
      populateChampionshipOdds(championshipOdds);
      
    } catch (error) {
      console.log('Loading championship odds...');
    }
  }
  
  function populateActiveRaces(races) {
    const container = document.getElementById('active-races');
    if (!container) return;
    
    const upcomingRaces = races.filter(race => race.status === 'upcoming').slice(0, 4);
    
    if (upcomingRaces.length === 0) {
      container.innerHTML = `
        <div class="col-span-2 text-center py-8 text-gray-500 dark:text-gray-400">
          No upcoming races available for betting at this time
        </div>
      `;
      return;
    }
    
    container.innerHTML = upcomingRaces.map(race => `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div class="bg-gradient-to-r from-green-600 to-blue-600 p-4 text-white">
          <h3 class="font-bold">${race.name}</h3>
          <p class="text-sm opacity-90">${race.date} • ${race.location}</p>
        </div>
        <div class="p-4">
          <div class="space-y-2 mb-4">
            <div class="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <span class="text-sm">Race Winner</span>
              <span class="font-semibold text-green-600">Best Odds</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <span class="text-sm">Podium Finish</span>
              <span class="font-semibold text-blue-600">Live Odds</span>
            </div>
          </div>
          <button class="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 font-medium transition-all duration-200 bet-button" data-race-id="${race.id}">
            Place Bet
          </button>
        </div>
      </div>
    `).join('');
    
    // Add event listeners to bet buttons
    document.querySelectorAll('.bet-button').forEach(button => {
      button.addEventListener('click', function() {
        const raceId = this.dataset.raceId;
        if (isOfflineMode()) {
          showOfflineMessage('Betting requires internet connection');
        } else {
          openBettingModal(raceId);
        }
      });
    });
  }
  
  function populateBettingHistory(bets) {
    const tbody = document.getElementById('betting-history-body');
    if (!tbody) return;
    
    if (bets.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
            No betting history available. Place your first bet to get started!
          </td>
        </tr>
      `;
      return;
    }
    
    tbody.innerHTML = bets.slice(0, 10).map(bet => {
      const statusColor = bet.status === 'won' ? 'text-green-600' : 
                         bet.status === 'lost' ? 'text-red-600' : 'text-yellow-600';
      const statusBg = bet.status === 'won' ? 'bg-green-100 dark:bg-green-900' : 
                      bet.status === 'lost' ? 'bg-red-100 dark:bg-red-900' : 'bg-yellow-100 dark:bg-yellow-900';
      
      return `
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200">
          <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">${new Date(bet.createdAt).toLocaleDateString()}</td>
          <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">${bet.raceName}</td>
          <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">${bet.betType}</td>
          <td class="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">$${bet.amount}</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${statusBg} ${statusColor}">
              ${bet.status.toUpperCase()}
            </span>
          </td>
          <td class="px-6 py-4 text-center text-sm font-bold ${bet.payout > 0 ? 'text-green-600' : 'text-gray-500'}">
            ${bet.payout > 0 ? `+$${bet.payout}` : '--'}
          </td>
        </tr>
      `;
    }).join('');
  }
  
  function populateChampionshipOdds(odds) {
    // Populate 450 class odds
    const odds450 = document.getElementById('championship-450-odds');
    if (odds450) {
      odds450.innerHTML = odds['450'].map(rider => `
        <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors championship-bet" data-rider="${rider.name}" data-class="450">
          <div>
            <div class="font-semibold text-sm text-gray-900 dark:text-white">${rider.name}</div>
            <div class="text-xs text-gray-500">${rider.team}</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-red-600">${rider.odds}</div>
            <div class="text-xs text-gray-500">${rider.backing}</div>
          </div>
        </div>
      `).join('');
    }
    
    // Populate 250 class odds
    const odds250 = document.getElementById('championship-250-odds');
    if (odds250) {
      odds250.innerHTML = odds['250'].map(rider => `
        <div class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors championship-bet" data-rider="${rider.name}" data-class="250">
          <div>
            <div class="font-semibold text-sm text-gray-900 dark:text-white">${rider.name}</div>
            <div class="text-xs text-gray-500">${rider.team}</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-blue-600">${rider.odds}</div>
            <div class="text-xs text-gray-500">${rider.backing}</div>
          </div>
        </div>
      `).join('');
    }
  }
  
  function updateAccountStats(bettingData) {
    // Update account balance and total bets
    const balanceEl = document.getElementById('account-balance');
    const totalBetsEl = document.getElementById('total-bets');
    
    if (balanceEl && bettingData.balance !== undefined) {
      balanceEl.textContent = `$${bettingData.balance}`;
    }
    
    if (totalBetsEl && bettingData.bets) {
      totalBetsEl.textContent = bettingData.bets.length;
    }
  }
  
  function showOfflineIndicator() {
    document.getElementById('offline-betting-notice').classList.remove('hidden');
  }
  
  function showOfflineMessage(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-50 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  function openBettingModal(raceId) {
    // This would open your betting modal
    console.log(`Opening betting modal for race ${raceId}`);
  }
  
  // Championship betting handlers
  document.getElementById('bet-450-championship')?.addEventListener('click', () => {
    if (isOfflineMode()) {
      showOfflineMessage('Championship betting requires internet connection');
    } else {
      window.location.href = '/betting/championship/450/';
    }
  });
  
  document.getElementById('bet-250-championship')?.addEventListener('click', () => {
    if (isOfflineMode()) {
      showOfflineMessage('Championship betting requires internet connection');
    } else {
      window.location.href = '/betting/championship/250/';
    }
  });
  
  // Export betting history
  document.getElementById('export-bets')?.addEventListener('click', () => {
    if (isOfflineMode()) {
      showOfflineMessage('Export requires internet connection');
    } else {
      exportBettingHistory();
    }
  });
  
  function exportBettingHistory() {
    // This would export the user's betting history
    console.log('Exporting betting history...');
  }
});
</script>