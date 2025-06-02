---
title: "Group Bets"
description: "Place bets with groups of friends on MXRaceHub"
layout: "single"
---

{{< rawhtml >}}
<div class="group-bets-container">
  <div class="group-bets-header">
    <h1 class="text-3xl font-bold mb-2">Group Betting</h1>
    <p class="subtitle mb-6">Create and join betting pools with friends</p>
  </div>
  
  <div class="flex flex-col md:flex-row gap-8">
    <div class="w-full md:w-2/3">
      <div class="tabs-container mb-8">
        <div class="tab-buttons">
          <button class="tab-btn active" data-tab="joined">Joined Groups</button>
          <button class="tab-btn" data-tab="popular">Popular Groups</button>
          <button class="tab-btn" data-tab="create">Create Group</button>
        </div>
        
        <div class="tab-content">
          <div class="tab-pane active" id="joined-tab">
            <div class="grid grid-cols-1 gap-4 mt-6">
              <div class="group-card">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-semibold mb-1">Moto Enthusiasts</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">25 members · 5 active bets</p>
                    <div class="group-tags">
                      <span class="group-tag">Supercross</span>
                      <span class="group-tag">Motocross</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="group-status active">Active</span>
                    <p class="text-sm mt-1">Joined Apr 5, 2025</p>
                  </div>
                </div>
                <div class="flex justify-between items-center mt-4">
                  <a href="/betting/groups/moto-enthusiasts/" class="group-action-btn">View Group</a>
                  <span class="text-sm">$120 in active bets</span>
                </div>
              </div>
              
              <div class="group-card">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-semibold mb-1">Yamaha Fans United</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">12 members · 2 active bets</p>
                    <div class="group-tags">
                      <span class="group-tag">Yamaha</span>
                      <span class="group-tag">Supercross</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="group-status active">Active</span>
                    <p class="text-sm mt-1">Joined Mar 15, 2025</p>
                  </div>
                </div>
                <div class="flex justify-between items-center mt-4">
                  <a href="/betting/groups/yamaha-fans-united/" class="group-action-btn">View Group</a>
                  <span class="text-sm">$50 in active bets</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="tab-pane" id="popular-tab">
            <div class="grid grid-cols-1 gap-4 mt-6">
              <div class="popular-group-card">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-semibold mb-1">Supercross Superfans</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">104 members · 15 active bets</p>
                    <div class="group-tags">
                      <span class="group-tag">Supercross</span>
                      <span class="group-tag">All Brands</span>
                    </div>
                  </div>
                  <button class="join-group-btn">Join Group</button>
                </div>
                <p class="mt-3 text-sm">The largest Supercross betting group with members from across the country. Join for weekly race predictions and prop bets.</p>
              </div>
              
              <div class="popular-group-card">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-semibold mb-1">Honda Red Riders</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">78 members · 8 active bets</p>
                    <div class="group-tags">
                      <span class="group-tag">Honda</span>
                      <span class="group-tag">Factory Teams</span>
                    </div>
                  </div>
                  <button class="join-group-btn">Join Group</button>
                </div>
                <p class="mt-3 text-sm">For fans of Honda factory teams. We focus on both 250 and 450 classes, with special attention to Team Honda HRC riders.</p>
              </div>
              
              <div class="popular-group-card">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-xl font-semibold mb-1">Fantasy Motocross League</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">62 members · 6 active bets</p>
                    <div class="group-tags">
                      <span class="group-tag">Fantasy</span>
                      <span class="group-tag">Outdoors</span>
                    </div>
                  </div>
                  <button class="join-group-btn">Join Group</button>
                </div>
                <p class="mt-3 text-sm">A group focused on fantasy motocross picks for the outdoor nationals series. Weekly drafts and season-long competitions.</p>
              </div>
            </div>
          </div>
          
          <div class="tab-pane" id="create-tab">
            <div class="create-group-form mt-6">
              <div class="form-group mb-4">
                <label for="group-name" class="block text-sm font-medium mb-1">Group Name</label>
                <input type="text" id="group-name" class="form-input w-full py-2 px-3 border rounded" placeholder="Enter group name">
              </div>
              
              <div class="form-group mb-4">
                <label for="group-description" class="block text-sm font-medium mb-1">Description</label>
                <textarea id="group-description" class="form-textarea w-full py-2 px-3 border rounded" rows="3" placeholder="Describe your group"></textarea>
              </div>
              
              <div class="form-group mb-4">
                <label class="block text-sm font-medium mb-1">Privacy</label>
                <div class="flex space-x-4">
                  <label class="inline-flex items-center">
                    <input type="radio" name="privacy" value="public" class="form-radio" checked>
                    <span class="ml-2">Public</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input type="radio" name="privacy" value="private" class="form-radio">
                    <span class="ml-2">Private</span>
                  </label>
                </div>
              </div>
              
              <div class="form-group mb-4">
                <label class="block text-sm font-medium mb-1">Tags</label>
                <div class="flex flex-wrap gap-2">
                  <div class="tag-option selected">Supercross</div>
                  <div class="tag-option">Motocross</div>
                  <div class="tag-option">Honda</div>
                  <div class="tag-option">Kawasaki</div>
                  <div class="tag-option">KTM</div>
                  <div class="tag-option">Yamaha</div>
                  <div class="tag-option">GasGas</div>
                  <div class="tag-option">Husqvarna</div>
                  <div class="tag-option">Fantasy</div>
                  <div class="tag-option">250 Class</div>
                  <div class="tag-option">450 Class</div>
                </div>
              </div>
              
              <button class="create-group-btn">Create Group</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="w-full md:w-1/3">
      <div class="group-sidebar">
        <div class="sidebar-section">
          <h3 class="text-lg font-semibold mb-3">Active Bets</h3>
          <div class="active-bets-list">
            <div class="active-bet-item">
              <div class="flex justify-between">
                <h4 class="font-medium">Anaheim 1 Winner</h4>
                <span class="bet-amount">$25</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Moto Enthusiasts Group</p>
              <div class="flex justify-between items-center mt-2">
                <span class="bet-selection">Eli Tomac</span>
                <span class="bet-status pending">Pending</span>
              </div>
            </div>
            
            <div class="active-bet-item">
              <div class="flex justify-between">
                <h4 class="font-medium">450 Class Championship</h4>
                <span class="bet-amount">$50</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Moto Enthusiasts Group</p>
              <div class="flex justify-between items-center mt-2">
                <span class="bet-selection">Jett Lawrence</span>
                <span class="bet-status pending">Pending</span>
              </div>
            </div>
            
            <div class="active-bet-item">
              <div class="flex justify-between">
                <h4 class="font-medium">Detroit SX Top 3</h4>
                <span class="bet-amount">$20</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Yamaha Fans United</p>
              <div class="flex justify-between items-center mt-2">
                <span class="bet-selection">Cooper Webb</span>
                <span class="bet-status pending">Pending</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="sidebar-section">
          <h3 class="text-lg font-semibold mb-3">Group Betting Stats</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">2</div>
              <div class="stat-label">Groups Joined</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">7</div>
              <div class="stat-label">Active Bets</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">$195</div>
              <div class="stat-label">Total Wagered</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">$250</div>
              <div class="stat-label">Potential Winnings</div>
            </div>
          </div>
        </div>
        
        <div class="sidebar-section">
          <h3 class="text-lg font-semibold mb-3">Group Betting Tips</h3>
          <ul class="tips-list">
            <li>Join groups that match your interests and betting style</li>
            <li>Create custom prop bets for your group to vote on</li>
            <li>Invite friends to join your private groups</li>
            <li>Set reasonable betting limits for your group</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .group-bets-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .subtitle {
    color: var(--text-muted, #666);
    font-size: 1.1rem;
  }
  
  .tab-buttons {
    display: flex;
    border-bottom: 1px solid var(--border-color, #e0e0e0);
  }
  
  .tab-btn {
    padding: 0.75rem 1.5rem;
    background: none;
    border: none;
    font-weight: 500;
    cursor: pointer;
    position: relative;
  }
  
  .tab-btn.active {
    color: var(--primary-color, #0066cc);
  }
  
  .tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-color, #0066cc);
  }
  
  .tab-pane {
    display: none;
  }
  
  .tab-pane.active {
    display: block;
  }
  
  .group-card, .popular-group-card {
    background-color: var(--card-background, #f9f9f9);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .group-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .group-tag {
    background-color: rgba(0, 102, 204, 0.1);
    color: var(--primary-color, #0066cc);
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .group-status {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .group-status.active {
    background-color: rgba(16, 185, 129, 0.1);
    color: #10b981;
  }
  
  .group-action-btn, .join-group-btn, .create-group-btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .group-action-btn {
    color: var(--primary-color, #0066cc);
    border: 1px solid var(--primary-color, #0066cc);
    background-color: transparent;
  }
  
  .group-action-btn:hover {
    background-color: rgba(0, 102, 204, 0.1);
    text-decoration: none;
  }
  
  .join-group-btn, .create-group-btn {
    background-color: var(--primary-color, #0066cc);
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .join-group-btn:hover, .create-group-btn:hover {
    background-color: var(--primary-dark, #0052a3);
  }
  
  .create-group-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  .group-sidebar {
    position: sticky;
    top: 2rem;
  }
  
  .sidebar-section {
    background-color: var(--card-background, #f9f9f9);
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .active-bet-item {
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color, #e0e0e0);
  }
  
  .active-bet-item:last-child {
    border-bottom: none;
  }
  
  .bet-amount {
    font-weight: 600;
    color: var(--primary-color, #0066cc);
  }
  
  .bet-status {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    border-radius: 999px;
  }
  
  .bet-status.pending {
    background-color: rgba(234, 179, 8, 0.1);
    color: #eab308;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color, #0066cc);
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: var(--text-muted, #666);
  }
  
  .tips-list {
    list-style-type: disc;
    padding-left: 1.25rem;
  }
  
  .tips-list li {
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
  }
  
  .tag-option {
    background-color: var(--background-color, #fff);
    border: 1px solid var(--border-color, #e0e0e0);
    padding: 0.375rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .tag-option.selected {
    background-color: var(--primary-color, #0066cc);
    color: white;
    border-color: var(--primary-color, #0066cc);
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show the corresponding tab
        const tabId = `${this.dataset.tab}-tab`;
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Tag options
    const tagOptions = document.querySelectorAll('.tag-option');
    
    tagOptions.forEach(tag => {
      tag.addEventListener('click', function() {
        this.classList.toggle('selected');
      });
    });
  });
</script>
{{< /rawhtml >}}