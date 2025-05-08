---
title: "My Wallet"
description: "Manage your MXRaceHub funds"
layout: "single"
---

{{< rawhtml >}}
<div class="wallet-container">
  <div class="wallet-header">
    <h1 class="text-3xl font-bold mb-2">Your Wallet</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">Manage your deposits, withdrawals, and transactions</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="balance-card">
      <h2 class="text-lg font-medium mb-2">Available Balance</h2>
      <p class="balance-amount text-3xl font-bold">$250.00</p>
      <button class="add-funds-btn mt-4">Add Funds</button>
    </div>
    
    <div class="balance-card">
      <h2 class="text-lg font-medium mb-2">Pending Bets</h2>
      <p class="balance-amount text-3xl font-bold">$75.00</p>
      <a href="/account/bets/" class="view-bets-btn mt-4">View Bets</a>
    </div>
    
    <div class="balance-card">
      <h2 class="text-lg font-medium mb-2">Lifetime Winnings</h2>
      <p class="balance-amount text-3xl font-bold">$1,250.00</p>
      <a href="/account/stats/" class="view-stats-btn mt-4">View Stats</a>
    </div>
  </div>
  
  <div class="wallet-tabs">
    <div class="tab-buttons mb-6">
      <button class="tab-btn active" data-tab="deposit">Deposit</button>
      <button class="tab-btn" data-tab="withdraw">Withdraw</button>
      <button class="tab-btn" data-tab="history">Transaction History</button>
    </div>
    
    <div class="tab-content">
      <div class="tab-pane active" id="deposit-tab">
        <h2 class="text-2xl font-semibold mb-4">Deposit Funds</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="option-card active">
            <div class="option-header">
              <div class="option-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <div class="option-title">Credit Card</div>
            </div>
            <a href="#" class="option-link">Select</a>
          </div>
          
          <div class="option-card">
            <div class="option-header">
              <div class="option-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
              </div>
              <div class="option-title">Bank Account</div>
            </div>
            <a href="#" class="option-link">Select</a>
          </div>
          
          <div class="option-card">
            <div class="option-header">
              <div class="option-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div class="option-title">Cryptocurrency</div>
            </div>
            <a href="#" class="option-link">Select</a>
          </div>
        </div>
        
        <div class="deposit-form">
          <div class="form-group mb-4">
            <label for="deposit-amount" class="block text-sm font-medium mb-1">Amount</label>
            <input type="text" id="deposit-amount" class="form-input w-full py-2 px-3 border rounded" placeholder="Enter amount">
          </div>
          
          <button class="deposit-button">Deposit Funds</button>
        </div>
      </div>
      
      <div class="tab-pane" id="withdraw-tab">
        <h2 class="text-2xl font-semibold mb-4">Withdraw Funds</h2>
        
        <div class="withdraw-form">
          <div class="form-group mb-4">
            <label for="withdraw-amount" class="block text-sm font-medium mb-1">Amount</label>
            <input type="text" id="withdraw-amount" class="form-input w-full py-2 px-3 border rounded" placeholder="Enter amount">
          </div>
          
          <div class="form-group mb-4">
            <label class="block text-sm font-medium mb-2">Withdrawal Method</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="method-card">
                <input type="radio" name="withdraw-method" id="bank-method" class="hidden" checked>
                <label for="bank-method" class="method-label">
                  <div class="method-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                  </div>
                  <div class="method-name">Bank Account</div>
                </label>
              </div>
              
              <div class="method-card">
                <input type="radio" name="withdraw-method" id="crypto-method" class="hidden">
                <label for="crypto-method" class="method-label">
                  <div class="method-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div class="method-name">Cryptocurrency</div>
                </label>
              </div>
            </div>
          </div>
          
          <button class="withdraw-button">Withdraw Funds</button>
        </div>
      </div>
      
      <div class="tab-pane" id="history-tab">
        <h2 class="text-2xl font-semibold mb-4">Transaction History</h2>
        
        <div class="transaction-list">
          <div class="transaction-item">
            <div class="transaction-info">
              <div class="transaction-title">Deposit (Credit Card)</div>
              <div class="transaction-date">Apr 15, 2025</div>
            </div>
            <div class="transaction-amount deposit">+$100.00</div>
          </div>
          
          <div class="transaction-item">
            <div class="transaction-info">
              <div class="transaction-title">Bet Placed - Anaheim SX</div>
              <div class="transaction-date">Apr 12, 2025</div>
            </div>
            <div class="transaction-amount withdraw">-$50.00</div>
          </div>
          
          <div class="transaction-item">
            <div class="transaction-info">
              <div class="transaction-title">Bet Won - Denver SX</div>
              <div class="transaction-date">Apr 8, 2025</div>
            </div>
            <div class="transaction-amount deposit">+$125.00</div>
          </div>
          
          <div class="transaction-item">
            <div class="transaction-info">
              <div class="transaction-title">Withdrawal (Bank Account)</div>
              <div class="transaction-date">Apr 2, 2025</div>
            </div>
            <div class="transaction-amount withdraw">-$200.00</div>
          </div>
          
          <div class="transaction-item">
            <div class="transaction-info">
              <div class="transaction-title">Deposit (Cryptocurrency)</div>
              <div class="transaction-date">Mar 28, 2025</div>
            </div>
            <div class="transaction-amount deposit">+$300.00</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .wallet-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .wallet-header {
    margin-bottom: 2rem;
  }
  
  .balance-card {
    padding: 1.5rem;
    border-radius: 8px;
    background-color: var(--card-background, #f9f9f9);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .balance-amount {
    color: var(--primary-color, #0066cc);
  }
  
  .add-funds-btn, .view-bets-btn, .view-stats-btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: var(--primary-color, #0066cc);
    color: white;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease;
    text-align: center;
    width: 100%;
    border: none;
    cursor: pointer;
  }
  
  .add-funds-btn:hover, .view-bets-btn:hover, .view-stats-btn:hover {
    background-color: var(--primary-dark, #0052a3);
    transform: translateY(-2px);
    text-decoration: none;
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
  
  .option-card {
    padding: 1rem;
    border-radius: 6px;
    border: 2px solid transparent;
    background-color: var(--background-color, #fff);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .option-card.active {
    border-color: var(--primary-color, #0066cc);
  }
  
  .option-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .option-icon {
    margin-right: 0.75rem;
    color: var(--primary-color, #0066cc);
  }
  
  .option-title {
    font-weight: 500;
  }
  
  .option-link {
    display: block;
    padding: 0.5rem;
    text-align: center;
    border-radius: 4px;
    border: 1px solid var(--border-color, #e0e0e0);
    transition: all 0.2s ease;
  }
  
  .option-card.active .option-link {
    background-color: var(--primary-color, #0066cc);
    color: white;
    border-color: var(--primary-color, #0066cc);
  }
  
  .deposit-button, .withdraw-button {
    display: inline-block;
    padding: 0.75rem 2rem;
    background-color: var(--primary-color, #0066cc);
    color: white;
    border-radius: 4px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .deposit-button:hover, .withdraw-button:hover {
    background-color: var(--primary-dark, #0052a3);
  }
  
  .method-card {
    position: relative;
  }
  
  .method-label {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 6px;
    border: 2px solid var(--border-color, #e0e0e0);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  input[type="radio"]:checked + .method-label {
    border-color: var(--primary-color, #0066cc);
  }
  
  .method-icon {
    margin-right: 0.75rem;
    color: var(--primary-color, #0066cc);
  }
  
  .transaction-list {
    display: flex;
    flex-direction: column;
  }
  
  .transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color, #e0e0e0);
  }
  
  .transaction-title {
    font-weight: 500;
    margin-bottom: 0.25rem;
    color: var(--text-color, #333);
  }
  
  .transaction-date {
    font-size: 0.875rem;
    color: var(--text-muted, #666);
  }
  
  .transaction-amount {
    font-weight: 600;
    font-size: 1.125rem;
  }
  
  .transaction-amount.deposit {
    color: #10b981;
  }
  
  .transaction-amount.withdraw {
    color: #ef4444;
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
    
    // Option cards
    const optionCards = document.querySelectorAll('.option-card');
    
    optionCards.forEach(card => {
      card.addEventListener('click', function() {
        // Remove active class from all cards
        optionCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        this.classList.add('active');
      });
    });
  });
</script>
{{< /rawhtml >}}