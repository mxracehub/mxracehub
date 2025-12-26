---
title: Leaderboards & Championships
description: Weekly betting leaderboards and seasonal championship predictions for top MXRaceHub competitors
layout: list
profile_image: /img/leaderboards/leaderboard-hero.svg
---

# 🏆 Betting Champions & Season Predictions

Compete with the best! Track weekly leaderboards, place championship bets, and climb the ranks in our competitive betting community.

<div class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 my-8 shadow-lg">
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div class="flex-1">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">🎯 Current Week Challenge</h2>
      <p class="text-gray-600 dark:text-gray-300">Compete for the weekly champion title! Top bettor wins exclusive badges and bragging rights.</p>
    </div>
    <div class="flex flex-col sm:flex-row gap-3">
      <a href="#weekly-leaderboard" class="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:from-yellow-700 hover:to-orange-700 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
        View Leaderboard
      </a>
    </div>
  </div>
</div>

## 📊 Weekly Leaderboard

<div id="weekly-leaderboard" class="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden my-8">
  <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="text-2xl font-bold mb-2">This Week's Champions</h3>
        <p class="text-blue-100">May 26 - June 1, 2025</p>
      </div>
      <div class="mt-4 sm:mt-0 text-right">
        <div class="text-2xl font-bold">127</div>
        <div class="text-sm text-blue-200">Active Competitors</div>
      </div>
    </div>
  </div>
  
  <!-- Leaderboard Table -->
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Rank</th>
          <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Bettor</th>
          <th class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Bets</th>
          <th class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Win Rate</th>
          <th class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Profit</th>
          <th class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Streak</th>
          <th class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300">Points</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700" id="leaderboard-body">
        <!-- Leaderboard data will be populated here -->
      </tbody>
    </table>
  </div>
  
  <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Your current rank: <span class="font-bold text-gray-900 dark:text-white" id="user-rank">#--</span> with <span class="font-bold text-blue-600 dark:text-blue-400" id="user-points">-- points</span>
      </div>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all duration-200">
        View Full Leaderboard
      </button>
    </div>
  </div>
</div>

## 🏁 Seasonal Championship Predictions

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
  <!-- 450 Class Championship -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
      <h3 class="text-xl font-bold mb-2">450 Supercross Championship</h3>
      <p class="text-red-100">2025 Season Predictions</p>
    </div>
    
    <div class="p-6">
      <div class="mb-6">
        <h4 class="font-bold text-gray-900 dark:text-white mb-3">Championship Odds</h4>
        <div class="space-y-3" id="championship-450-odds">
          <!-- Championship odds will be populated here -->
        </div>
      </div>
      
      <button class="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg" id="bet-450-championship">
        Place Championship Bet
      </button>
    </div>
  </div>
  
  <!-- 250 Class Championship -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
      <h3 class="text-xl font-bold mb-2">250 Supercross Championship</h3>
      <p class="text-blue-100">2025 Season Predictions</p>
    </div>
    
    <div class="p-6">
      <div class="mb-6">
        <h4 class="font-bold text-gray-900 dark:text-white mb-3">Championship Odds</h4>
        <div class="space-y-3" id="championship-250-odds">
          <!-- Championship odds will be populated here -->
        </div>
      </div>
      
      <button class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg" id="bet-250-championship">
        Place Championship Bet
      </button>
    </div>
  </div>
</div>

## 🎖️ Achievement Gallery

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
  <!-- Weekly Champion Badge -->
  <div class="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-6 text-center border border-yellow-200 dark:border-yellow-800">
    <div class="text-4xl mb-3">👑</div>
    <h4 class="font-bold text-gray-900 dark:text-white mb-2">Weekly Champion</h4>
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Finish #1 in weekly leaderboard</p>
    <div class="text-xs text-yellow-600 dark:text-yellow-400 font-semibold" id="weekly-champion-count">Loading...</div>
  </div>
  
  <!-- Season Prophet Badge -->
  <div class="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6 text-center border border-purple-200 dark:border-purple-800">
    <div class="text-4xl mb-3">🔮</div>
    <h4 class="font-bold text-gray-900 dark:text-white mb-2">Season Prophet</h4>
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Correctly predict championship winner</p>
    <div class="text-xs text-purple-600 dark:text-purple-400 font-semibold" id="season-prophet-count">Loading...</div>
  </div>
  
  <!-- Streak Master Badge -->
  <div class="bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-xl p-6 text-center border border-red-200 dark:border-red-800">
    <div class="text-4xl mb-3">🔥</div>
    <h4 class="font-bold text-gray-900 dark:text-white mb-2">Streak Master</h4>
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Win 10 consecutive bets</p>
    <div class="text-xs text-red-600 dark:text-red-400 font-semibold" id="streak-master-count">Loading...</div>
  </div>
</div>

<div class="text-center my-8">
  <a href="/achievements/" class="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
    View All Achievements
  </a>
</div>

<!-- Live Updates & Mobile Enhancements -->
<div class="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-center">
  <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">🚀 Compete in Real-Time</h3>
  <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
    Leaderboards update live during race weekends. Place championship bets now for the best odds and join the elite community of MXRaceHub predictors!
  </p>
  
  <div class="flex flex-col sm:flex-row gap-4 justify-center">
    <a href="/betting/" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all duration-200">
      Start Betting Now
    </a>
    <a href="/races/upcoming/" class="px-6 py-3 bg-gray-600 dark:bg-gray-500 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-400 font-medium transition-all duration-200">
      View Upcoming Races
    </a>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Initialize leaderboard features
  loadWeeklyLeaderboard();
  loadChampionshipOdds();
  loadAchievementCounts();
  
  // Auto-refresh leaderboard every 30 seconds during race weekends
  setInterval(loadWeeklyLeaderboard, 30000);
  
  async function loadWeeklyLeaderboard() {
    try {
      const response = await fetch('/api/leaderboards/weekly');
      const data = await response.json();
      
      if (data.leaderboard) {
        populateLeaderboard(data.leaderboard);
        updateUserRank(data.userRank, data.userPoints);
      }
    } catch (error) {
      console.log('Loading leaderboard data...');
      // Populate with loading state
      populateLeaderboard([]);
    }
  }
  
  async function loadChampionshipOdds() {
    try {
      const response = await fetch('/api/championships/odds');
      const data = await response.json();
      
      if (data.odds) {
        populateChampionshipOdds(data.odds);
      }
    } catch (error) {
      console.log('Loading championship odds...');
      populateChampionshipOdds([]);
    }
  }
  
  async function loadAchievementCounts() {
    try {
      const response = await fetch('/api/achievements/counts');
      const data = await response.json();
      
      if (data.counts) {
        updateAchievementCounts(data.counts);
      }
    } catch (error) {
      console.log('Loading achievement data...');
      updateAchievementCounts({});
    }
  }
  
  function populateLeaderboard(leaderboard) {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;
    
    if (leaderboard.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
            Loading leaderboard data...
          </td>
        </tr>
      `;
      return;
    }
    
    tbody.innerHTML = leaderboard.map((entry, index) => {
      const rankIcon = index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
      const rankClass = index === 0 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20' : 
                       index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-800' : '';
      
      return `
        <tr class="${rankClass} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <td class="px-6 py-4">
            <div class="flex items-center">
              ${rankIcon ? `<div class="text-xl mr-2">${rankIcon}</div>` : ''}
              <span class="text-xl font-bold ${index === 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-600 dark:text-gray-300'}">${index + 1}</span>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                ${entry.username.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div class="font-bold text-gray-900 dark:text-white">${entry.username}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">${entry.title || 'Competitor'}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">${entry.totalBets}</td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              ${entry.winRate}%
            </span>
          </td>
          <td class="px-6 py-4 text-center font-bold ${entry.profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
            ${entry.profitLoss >= 0 ? '+' : ''}$${Math.abs(entry.profitLoss)}
          </td>
          <td class="px-6 py-4 text-center">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              🔥 ${entry.longestWinStreak}
            </span>
          </td>
          <td class="px-6 py-4 text-center font-bold text-gray-600 dark:text-gray-400">${entry.points}</td>
        </tr>
      `;
    }).join('');
  }
  
  function populateChampionshipOdds(odds) {
    // Populate 450 class odds
    const odds450 = document.getElementById('championship-450-odds');
    const odds250 = document.getElementById('championship-250-odds');
    
    if (odds450) {
      odds450.innerHTML = (odds['450'] || []).map(rider => `
        <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer championship-odds" data-rider="${rider.id}" data-odds="${rider.odds}">
          <div class="flex items-center">
            <img src="/img/riders/${rider.slug}.svg" alt="${rider.name}" class="w-8 h-8 rounded-full mr-3">
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">${rider.name}</div>
              <div class="text-sm text-gray-500">${rider.team}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-bold text-red-600">${rider.odds}</div>
            <div class="text-xs text-gray-500">${rider.backing}% backing</div>
          </div>
        </div>
      `).join('') || '<div class="text-center text-gray-500 py-4">Loading championship odds...</div>';
    }
    
    // Similar for 250 class
    if (odds250) {
      odds250.innerHTML = (odds['250'] || []).map(rider => `
        <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer championship-odds" data-rider="${rider.id}" data-odds="${rider.odds}">
          <div class="flex items-center">
            <img src="/img/riders/${rider.slug}.svg" alt="${rider.name}" class="w-8 h-8 rounded-full mr-3">
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">${rider.name}</div>
              <div class="text-sm text-gray-500">${rider.team}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-bold text-blue-600">${rider.odds}</div>
            <div class="text-xs text-gray-500">${rider.backing}% backing</div>
          </div>
        </div>
      `).join('') || '<div class="text-center text-gray-500 py-4">Loading championship odds...</div>';
    }
  }
  
  function updateUserRank(rank, points) {
    const userRank = document.getElementById('user-rank');
    const userPoints = document.getElementById('user-points');
    
    if (userRank) userRank.textContent = rank ? `#${rank}` : '#--';
    if (userPoints) userPoints.textContent = points ? `${points} points` : '-- points';
  }
  
  function updateAchievementCounts(counts) {
    const weeklyChampion = document.getElementById('weekly-champion-count');
    const seasonProphet = document.getElementById('season-prophet-count');
    const streakMaster = document.getElementById('streak-master-count');
    
    if (weeklyChampion) weeklyChampion.textContent = counts.weeklyChampion ? `Unlocked by ${counts.weeklyChampion} users` : 'Loading...';
    if (seasonProphet) seasonProphet.textContent = counts.seasonProphet ? `Unlocked by ${counts.seasonProphet} users` : 'Loading...';
    if (streakMaster) streakMaster.textContent = counts.streakMaster ? `Unlocked by ${counts.streakMaster} users` : 'Loading...';
  }
  
  // Championship betting handlers
  document.getElementById('bet-450-championship')?.addEventListener('click', () => {
    window.location.href = '/betting/championship/450/';
  });
  
  document.getElementById('bet-250-championship')?.addEventListener('click', () => {
    window.location.href = '/betting/championship/250/';
  });
});
</script>