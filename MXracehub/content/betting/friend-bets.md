---
title: "Friend Bets"
description: "Place bets with friends on upcoming races"
layout: "single"
---

{{< rawhtml >}}

<div class="friend-bets-page">
  
  <div class="user-account-summary">
    <div class="user-info">
      <div class="user-avatar">
        <div class="avatar-placeholder">JS</div>
      </div>
      <div class="user-details">
        <div class="user-name">John Smith</div>
        <div class="user-balance">Balance: $<span id="user-balance">500.00</span></div>
      </div>
    </div>
    
    <div class="membership-badge" id="membership-badge">
      <div class="badge-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      </div>
      <div class="badge-text">Free Member</div>
      <a href="/betting/membership" class="upgrade-link">Upgrade</a>
    </div>
  </div>
  
  <div class="friend-bets-tabs">
    <button class="tab-btn active" data-tab="create-bet">Create a Bet</button>
    <button class="tab-btn" data-tab="pending-bets">Pending Bets <span class="badge" id="pending-count">0</span></button>
    <button class="tab-btn" data-tab="active-bets">Active Bets <span class="badge" id="active-count">0</span></button>
    <button class="tab-btn" data-tab="bet-history">Bet History</button>
  </div>
  
  <div class="tab-content">
    <!-- Create Bet Tab -->
    <div id="create-bet" class="tab-pane active">
      <div class="create-bet-form">
        <h2>Challenge a Friend</h2>
        
        <div class="form-group">
          <label for="friend-select">Select Friend</label>
          <select id="friend-select">
            <option value="">Select a friend</option>
            <option value="102">Sarah Johnson</option>
            <option value="103">Mike Wilson</option>
            <option value="104">Emma Thompson</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="race-select">Select Race</label>
          <select id="race-select">
            <option value="">Select a race</option>
            <option value="1">Anaheim 2 - Jan 27, 2024</option>
            <option value="2">Detroit - Feb 3, 2024</option>
            <option value="3">Glendale - Feb 10, 2024</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="bet-type">Bet Type</label>
          <select id="bet-type">
            <option value="">Select bet type</option>
            <option value="race_winner">Race Winner</option>
            <option value="podium_finish">Podium Finish</option>
            <option value="head_to_head">Head-to-Head</option>
            <option value="top_five">Top 5 Finish</option>
            <option value="fastest_lap">Fastest Lap</option>
            <option value="holeshot">Holeshot Winner</option>
            <option value="custom">Custom Bet</option>
          </select>
        </div>
        
        <div class="bet-details-container">
          <!-- This container will be updated based on the selected bet type -->
          <div class="empty-state">
            Select a bet type to continue
          </div>
        </div>
        
        <div class="form-group">
          <label for="bet-amount">Bet Amount ($)</label>
          <input type="number" id="bet-amount" min="5" step="5" placeholder="Enter amount">
          <div class="fee-notice" id="fee-notice">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Free members pay a 1% fee on all bets.
            <a href="/betting/membership" class="upgrade-inline">Upgrade</a> to avoid fees.
          </div>
        </div>
        
        <button id="send-bet-challenge" class="primary-button">
          <span id="button-text">Send Bet Challenge</span>
          <div id="button-spinner" class="spinner hidden"></div>
        </button>
      </div>
    </div>
    
    <!-- Pending Bets Tab -->
    <div id="pending-bets" class="tab-pane">
      <div class="pending-bets-container">
        <h2>Pending Bet Challenges</h2>
        
        <div class="bets-list" id="pending-bets-list">
          <div class="bets-list-sections">
            <div class="bets-section">
              <h3>Challenges Sent</h3>
              <div class="section-content" id="challenges-sent">
                <div class="empty-state">No challenges sent</div>
              </div>
            </div>
            
            <div class="bets-section">
              <h3>Challenges Received</h3>
              <div class="section-content" id="challenges-received">
                <div class="bet-card">
                  <div class="bet-header">
                    <div class="bet-type-tag">Race Winner</div>
                    <div class="bet-amount">$50</div>
                  </div>
                  
                  <div class="bet-details">
                    <div class="bet-user">From: Sarah Johnson</div>
                    <div class="bet-race">Anaheim 2 Supercross</div>
                    <div class="bet-selection">Selection: Jett Lawrence to win</div>
                  </div>
                  
                  <div class="bet-actions">
                    <button class="accept-bet-btn">Accept</button>
                    <button class="decline-bet-btn">Decline</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Active Bets Tab -->
    <div id="active-bets" class="tab-pane">
      <div class="active-bets-container">
        <h2>Active Bets</h2>
        
        <div class="bets-list" id="active-bets-list">
          <div class="empty-state">No active bets</div>
        </div>
      </div>
    </div>
    
    <!-- Bet History Tab -->
    <div id="bet-history" class="tab-pane">
      <div class="bet-history-container">
        <h2>Bet History</h2>
        
        <div class="bets-list" id="bet-history-list">
          <div class="bet-card">
            <div class="bet-header">
              <div class="bet-type-tag">Race Winner</div>
              <div class="bet-result won">Won $75</div>
            </div>
            
            <div class="bet-details">
              <div class="bet-user">Against: Mike Wilson</div>
              <div class="bet-race">San Diego Supercross</div>
              <div class="bet-selection">Selection: Cooper Webb to win</div>
              <div class="bet-date">Jan 20, 2024</div>
            </div>
          </div>
          
          <div class="bet-card">
            <div class="bet-header">
              <div class="bet-type-tag">Podium Finish</div>
              <div class="bet-result lost">Lost $50</div>
            </div>
            
            <div class="bet-details">
              <div class="bet-user">Against: Sarah Johnson</div>
              <div class="bet-race">Anaheim 1 Supercross</div>
              <div class="bet-selection">Selection: Jason Anderson to podium</div>
              <div class="bet-date">Jan 06, 2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Success Modal -->
<div class="modal-overlay" id="success-modal-overlay">
  <div class="modal">
    <div class="modal-content">
      <div class="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      
      <h2>Bet Challenge Sent!</h2>
      <p>Your bet challenge has been sent to <span id="challenge-recipient">Sarah Johnson</span>. You'll be notified when they respond.</p>
      
      <div class="modal-actions">
        <button id="close-success-modal" class="primary-button">OK</button>
      </div>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Current user info (in a real app, this would come from auth system)
  const currentUserId = 101; // Test user ID
  let currentUserData = {
    id: 101,
    username: 'test_user1',
    firstName: 'John',
    lastName: 'Smith',
    balance: 500.00,
    membershipType: 'free'
  };
  
  // Update membership badge based on user type
  function updateMembershipBadge() {
    const badge = document.getElementById('membership-badge');
    const badgeText = badge.querySelector('.badge-text');
    
    if (currentUserData.membershipType === 'monthly') {
      badge.classList.add('premium');
      badgeText.textContent = 'Premium Monthly';
      badge.querySelector('.upgrade-link').style.display = 'none';
      
      // Hide fee notice
      document.getElementById('fee-notice').style.display = 'none';
    } else if (currentUserData.membershipType === 'yearly') {
      badge.classList.add('premium');
      badgeText.textContent = 'Premium Yearly';
      badge.querySelector('.upgrade-link').style.display = 'none';
      
      // Hide fee notice
      document.getElementById('fee-notice').style.display = 'none';
    } else {
      // Free member, keep default styling
      document.getElementById('fee-notice').style.display = 'flex';
    }
  }
  
  // Initialize tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons and panes
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show corresponding pane
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Bet type selection
  const betTypeSelect = document.getElementById('bet-type');
  const betDetailsContainer = document.querySelector('.bet-details-container');
  
  betTypeSelect.addEventListener('change', function() {
    const betType = this.value;
    
    if (!betType) {
      betDetailsContainer.innerHTML = `
        <div class="empty-state">
          Select a bet type to continue
        </div>
      `;
      return;
    }
    
    // Generate the appropriate form based on bet type
    switch (betType) {
      case 'race_winner':
        betDetailsContainer.innerHTML = `
          <div class="form-group">
            <label for="rider-select">Select Winner</label>
            <select id="rider-select">
              <option value="">Select a rider</option>
              <option value="1">Jett Lawrence</option>
              <option value="2">Chase Sexton</option>
              <option value="3">Cooper Webb</option>
              <option value="4">Eli Tomac</option>
              <option value="5">Jason Anderson</option>
            </select>
          </div>
        `;
        break;
        
      case 'podium_finish':
        betDetailsContainer.innerHTML = `
          <div class="form-group">
            <label for="podium-rider-select">Select Rider for Podium</label>
            <select id="podium-rider-select">
              <option value="">Select a rider</option>
              <option value="1">Jett Lawrence</option>
              <option value="2">Chase Sexton</option>
              <option value="3">Cooper Webb</option>
              <option value="4">Eli Tomac</option>
              <option value="5">Jason Anderson</option>
            </select>
          </div>
        `;
        break;
        
      case 'head_to_head':
        betDetailsContainer.innerHTML = `
          <div class="form-group">
            <label for="rider1-select">First Rider</label>
            <select id="rider1-select">
              <option value="">Select first rider</option>
              <option value="1">Jett Lawrence</option>
              <option value="2">Chase Sexton</option>
              <option value="3">Cooper Webb</option>
              <option value="4">Eli Tomac</option>
              <option value="5">Jason Anderson</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="rider2-select">Second Rider</label>
            <select id="rider2-select">
              <option value="">Select second rider</option>
              <option value="1">Jett Lawrence</option>
              <option value="2">Chase Sexton</option>
              <option value="3">Cooper Webb</option>
              <option value="4">Eli Tomac</option>
              <option value="5">Jason Anderson</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Your Pick</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" name="head-to-head-pick" value="rider1"> First rider finishes better
              </label>
              <label class="radio-label">
                <input type="radio" name="head-to-head-pick" value="rider2"> Second rider finishes better
              </label>
            </div>
          </div>
        `;
        break;
        
      case 'custom':
        betDetailsContainer.innerHTML = `
          <div class="form-group">
            <label for="custom-bet-details">Custom Bet Details</label>
            <textarea id="custom-bet-details" rows="3" placeholder="Describe your bet in detail..."></textarea>
          </div>
        `;
        break;
        
      default:
        betDetailsContainer.innerHTML = `
          <div class="form-group">
            <label for="default-rider-select">Select Rider</label>
            <select id="default-rider-select">
              <option value="">Select a rider</option>
              <option value="1">Jett Lawrence</option>
              <option value="2">Chase Sexton</option>
              <option value="3">Cooper Webb</option>
              <option value="4">Eli Tomac</option>
              <option value="5">Jason Anderson</option>
            </select>
          </div>
        `;
    }
  });
  
  // Send bet challenge
  const sendBetBtn = document.getElementById('send-bet-challenge');
  
  sendBetBtn.addEventListener('click', function() {
    // Validate form
    const friend = document.getElementById('friend-select').value;
    const race = document.getElementById('race-select').value;
    const betType = document.getElementById('bet-type').value;
    const amount = parseFloat(document.getElementById('bet-amount').value);
    
    if (!friend || !race || !betType || !amount || amount < 5) {
      alert('Please fill in all fields and enter a bet amount of at least $5');
      return;
    }
    
    // Check if user has enough balance
    if (amount > currentUserData.balance) {
      alert('Insufficient balance for this bet');
      return;
    }
    
    // Validate bet details based on type
    let betDetails = {};
    let isValid = true;
    
    switch (betType) {
      case 'race_winner':
        const rider = document.getElementById('rider-select')?.value;
        if (!rider) {
          alert('Please select a rider');
          isValid = false;
        } else {
          betDetails = { riderId: rider };
        }
        break;
        
      case 'podium_finish':
        const podiumRider = document.getElementById('podium-rider-select')?.value;
        if (!podiumRider) {
          alert('Please select a rider');
          isValid = false;
        } else {
          betDetails = { riderId: podiumRider };
        }
        break;
        
      case 'head_to_head':
        const rider1 = document.getElementById('rider1-select')?.value;
        const rider2 = document.getElementById('rider2-select')?.value;
        const pick = document.querySelector('input[name="head-to-head-pick"]:checked')?.value;
        
        if (!rider1 || !rider2 || !pick) {
          alert('Please select both riders and your pick');
          isValid = false;
        } else if (rider1 === rider2) {
          alert('Please select two different riders');
          isValid = false;
        } else {
          betDetails = { 
            rider1Id: rider1,
            rider2Id: rider2,
            pick
          };
        }
        break;
        
      case 'custom':
        const customDetails = document.getElementById('custom-bet-details')?.value;
        if (!customDetails || customDetails.trim().length < 10) {
          alert('Please enter detailed description for your custom bet');
          isValid = false;
        } else {
          betDetails = { description: customDetails };
        }
        break;
        
      default:
        const defaultRider = document.getElementById('default-rider-select')?.value;
        if (!defaultRider) {
          alert('Please select a rider');
          isValid = false;
        } else {
          betDetails = { riderId: defaultRider };
        }
    }
    
    if (!isValid) {
      return;
    }
    
    // Calculate fee if not premium
    let fee = 0;
    if (currentUserData.membershipType === 'free') {
      fee = amount * 0.01; // 1%
    }
    
    // Show loading state
    sendBetBtn.disabled = true;
    document.getElementById('button-spinner').classList.remove('hidden');
    document.getElementById('button-text').textContent = 'Sending...';
    
    // In a real app, this would be an API call
    // For demo, simulate API call with timeout
    setTimeout(() => {
      // Create a bet object (in a real app, this would come from the API)
      const newBet = {
        id: Math.floor(Math.random() * 10000),
        creatorId: currentUserId,
        targetId: parseInt(friend),
        amount,
        fee,
        betType,
        betDetails,
        raceId: parseInt(race),
        status: 'pending',
        createdAt: new Date()
      };
      
      // Update user balance
      currentUserData.balance -= amount;
      document.getElementById('user-balance').textContent = currentUserData.balance.toFixed(2);
      
      // Show success modal
      const friendName = document.getElementById('friend-select').options[document.getElementById('friend-select').selectedIndex].text;
      document.getElementById('challenge-recipient').textContent = friendName;
      document.getElementById('success-modal-overlay').classList.add('active');
      
      // Reset form
      resetBetForm();
      
      // Reset button state
      sendBetBtn.disabled = false;
      document.getElementById('button-spinner').classList.add('hidden');
      document.getElementById('button-text').textContent = 'Send Bet Challenge';
      
      // Update pending bets count
      const pendingCount = document.getElementById('pending-count');
      pendingCount.textContent = parseInt(pendingCount.textContent) + 1;
      
      // Add to sent challenges (for demo)
      const challengesSent = document.getElementById('challenges-sent');
      if (challengesSent.querySelector('.empty-state')) {
        challengesSent.innerHTML = '';
      }
      
      const raceName = document.getElementById('race-select').options[document.getElementById('race-select').selectedIndex].text;
      let selectionText = '';
      
      if (betType === 'race_winner') {
        const riderName = document.getElementById('rider-select').options[document.getElementById('rider-select').selectedIndex].text;
        selectionText = `Selection: ${riderName} to win`;
      } else if (betType === 'custom') {
        selectionText = `Custom bet: ${betDetails.description.substring(0, 30)}...`;
      }
      
      challengesSent.innerHTML += `
        <div class="bet-card">
          <div class="bet-header">
            <div class="bet-type-tag">${formatBetType(betType)}</div>
            <div class="bet-amount">$${amount.toFixed(2)}</div>
          </div>
          
          <div class="bet-details">
            <div class="bet-user">To: ${friendName}</div>
            <div class="bet-race">${raceName}</div>
            <div class="bet-selection">${selectionText}</div>
          </div>
          
          <div class="bet-actions">
            <button class="cancel-bet-btn" data-bet-id="${newBet.id}">Cancel</button>
          </div>
        </div>
      `;
      
      // Add cancel button event listener
      const cancelBtns = document.querySelectorAll('.cancel-bet-btn');
      cancelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // In a real app, this would call an API
          const betId = this.getAttribute('data-bet-id');
          this.closest('.bet-card').remove();
          
          // Update pending count
          const pendingCount = document.getElementById('pending-count');
          pendingCount.textContent = parseInt(pendingCount.textContent) - 1;
          
          // Check if there are no more challenges
          if (challengesSent.children.length === 0) {
            challengesSent.innerHTML = '<div class="empty-state">No challenges sent</div>';
          }
          
          // Return funds to user balance
          currentUserData.balance += amount;
          document.getElementById('user-balance').textContent = currentUserData.balance.toFixed(2);
        });
      });
    }, 1500);
  });
  
  // Helper function to format bet type for display
  function formatBetType(betType) {
    switch (betType) {
      case 'race_winner': return 'Race Winner';
      case 'podium_finish': return 'Podium Finish';
      case 'head_to_head': return 'Head-to-Head';
      case 'top_five': return 'Top 5 Finish';
      case 'fastest_lap': return 'Fastest Lap';
      case 'holeshot': return 'Holeshot';
      case 'custom': return 'Custom Bet';
      default: return betType;
    }
  }
  
  // Reset bet form
  function resetBetForm() {
    document.getElementById('friend-select').value = '';
    document.getElementById('race-select').value = '';
    document.getElementById('bet-type').value = '';
    document.getElementById('bet-amount').value = '';
    
    betDetailsContainer.innerHTML = `
      <div class="empty-state">
        Select a bet type to continue
      </div>
    `;
  }
  
  // Success modal
  const successModalOverlay = document.getElementById('success-modal-overlay');
  const closeSuccessModal = document.getElementById('close-success-modal');
  
  closeSuccessModal.addEventListener('click', function() {
    successModalOverlay.classList.remove('active');
  });
  
  // Close modal when clicking outside
  successModalOverlay.addEventListener('click', function(event) {
    if (event.target === successModalOverlay) {
      successModalOverlay.classList.remove('active');
    }
  });
  
  // Accept and decline buttons for received challenges
  document.querySelectorAll('.accept-bet-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const betCard = this.closest('.bet-card');
      
      // In a real app, this would call an API
      
      // Update UI
      betCard.remove();
      
      // Check if there are no more challenges
      const challengesReceived = document.getElementById('challenges-received');
      if (challengesReceived.children.length === 0) {
        challengesReceived.innerHTML = '<div class="empty-state">No challenges received</div>';
      }
      
      // Update pending count
      const pendingCount = document.getElementById('pending-count');
      pendingCount.textContent = parseInt(pendingCount.textContent) - 1;
      
      // Update active count
      const activeCount = document.getElementById('active-count');
      activeCount.textContent = parseInt(activeCount.textContent) + 1;
      
      // Add to active bets (for demo)
      const activeBetsList = document.getElementById('active-bets-list');
      if (activeBetsList.querySelector('.empty-state')) {
        activeBetsList.innerHTML = '';
      }
      
      activeBetsList.innerHTML += `
        <div class="bet-card">
          <div class="bet-header">
            <div class="bet-type-tag">Race Winner</div>
            <div class="bet-amount">$50</div>
          </div>
          
          <div class="bet-details">
            <div class="bet-user">Against: Sarah Johnson</div>
            <div class="bet-race">Anaheim 2 Supercross</div>
            <div class="bet-selection">Selection: Jett Lawrence to win</div>
          </div>
          
          <div class="bet-status pending">In Progress</div>
        </div>
      `;
    });
  });
  
  document.querySelectorAll('.decline-bet-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const betCard = this.closest('.bet-card');
      
      // In a real app, this would call an API
      
      // Update UI
      betCard.remove();
      
      // Check if there are no more challenges
      const challengesReceived = document.getElementById('challenges-received');
      if (challengesReceived.children.length === 0) {
        challengesReceived.innerHTML = '<div class="empty-state">No challenges received</div>';
      }
      
      // Update pending count
      const pendingCount = document.getElementById('pending-count');
      pendingCount.textContent = parseInt(pendingCount.textContent) - 1;
    });
  });
  
  // Initialize
  updateMembershipBadge();
});
</script>

<style>
.friend-bets-page {
  max-width: 1200px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding-bottom: 4rem;
}



.user-account-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #0066cc;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.user-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.25rem;
}

.user-balance {
  color: #0066cc;
  font-weight: 500;
}

.membership-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
}

.membership-badge.premium {
  background-color: #e6f2ff;
  color: #0066cc;
}

.badge-icon {
  display: flex;
}

.upgrade-link {
  margin-left: 0.5rem;
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
}

.friend-bets-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.tab-btn {
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
  position: relative;
}

.tab-btn:hover {
  background-color: #f0f0f0;
}

.tab-btn.active {
  background-color: #0066cc;
  color: white;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #dc3545;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-pane {
  display: none;
}

.tab-pane.active {
  display: block;
}

.create-bet-form {
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.create-bet-form h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

select, input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

select:focus, input:focus, textarea:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 1px #0066cc;
}

.fee-notice {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.upgrade-inline {
  color: #0066cc;
  font-weight: 600;
  text-decoration: none;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.radio-label input {
  width: auto;
}

.empty-state {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 4px;
  text-align: center;
  color: #666;
}

.primary-button {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.primary-button:hover {
  background-color: #0052a3;
}

.primary-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.primary-button .spinner {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spinner 1s ease-in-out infinite;
}

@keyframes spinner {
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}

.hidden {
  display: none;
}

.bets-list {
  margin-bottom: 2rem;
}

.bets-list-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .bets-list-sections {
    grid-template-columns: 1fr;
  }
}

.bets-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bet-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.bet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.bet-type-tag {
  background-color: #e6f2ff;
  color: #0066cc;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
}

.bet-amount {
  font-weight: 600;
  color: #333;
}

.bet-details {
  margin-bottom: 1rem;
}

.bet-user, .bet-race, .bet-selection, .bet-date {
  margin-bottom: 0.5rem;
  color: #666;
}

.bet-actions {
  display: flex;
  gap: 0.5rem;
}

.accept-bet-btn, .decline-bet-btn, .cancel-bet-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.accept-bet-btn {
  background-color: #0066cc;
  color: white;
  border: none;
}

.accept-bet-btn:hover {
  background-color: #0052a3;
}

.decline-bet-btn, .cancel-bet-btn {
  background: none;
  border: 1px solid #dc3545;
  color: #dc3545;
}

.decline-bet-btn:hover, .cancel-bet-btn:hover {
  background-color: #dc3545;
  color: white;
}

.bet-result {
  font-weight: 600;
}

.won {
  color: #28a745;
}

.lost {
  color: #dc3545;
}

.bet-status {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
}

.pending {
  background-color: #fff3cd;
  color: #856404;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal {
  width: 90%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform: translateY(20px);
  transition: transform 0.3s;
}

.modal-overlay.active .modal {
  transform: translateY(0);
}

.modal-content {
  padding: 2rem;
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  background-color: rgba(40, 167, 69, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: #28a745;
}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #28a745;
}

.modal-content p {
  margin-bottom: 2rem;
  color: #666;
}

.modal-actions {
  display: flex;
  justify-content: center;
}

.modal-actions .primary-button {
  max-width: 200px;
}

@media (max-width: 768px) {
  .user-account-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .friend-bets-tabs {
    justify-content: center;
  }
  
  .create-bet-form {
    padding: 1.5rem;
  }
}
</style>

{{< /rawhtml >}}