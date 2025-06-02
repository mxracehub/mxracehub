---
title: "Transfer Funds"
description: "Transfer funds between users and manage your balance"
---

<div class="transfers-page">
  <div class="transfers-header">
    <h1>Transfer Funds</h1>
    <p class="subtitle">Send money to other users and manage your account balance</p>
  </div>
  
  <div class="account-summary">
    <div class="balance-card">
      <div class="balance-header">Available Balance</div>
      <div class="balance-amount">$750.00</div>
      <a href="/betting/payment" class="add-funds-btn">Add Funds</a>
    </div>
    
    <div class="payment-options">
      <div class="option-card">
        <div class="option-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 9V8a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v1" />
            <rect width="18" height="13" x="3" y="8" rx="2" />
            <circle cx="12" cy="15" r="2" />
          </svg>
        </div>
        <h3>Deposit</h3>
        <p>Add money to your account</p>
        <a href="/betting/payment" class="option-link">Deposit Funds</a>
      </div>
      
      <div class="option-card active">
        <div class="option-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 19V5" />
            <path d="M5 12h14" />
          </svg>
        </div>
        <h3>Transfer</h3>
        <p>Send money to other users</p>
        <a href="/betting/transfers" class="option-link">Transfer Funds</a>
      </div>
      
      <div class="option-card">
        <div class="option-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        </div>
        <h3>Withdraw</h3>
        <p>Cash out to your bank account</p>
        <a href="/betting/withdraw" class="option-link">Withdraw Funds</a>
      </div>
    </div>
  </div>
  
  <div class="transfers-container">
    <div class="tabs">
      <button class="tab-btn active" data-tab="send-money">Send Money</button>
      <button class="tab-btn" data-tab="transaction-history">Transaction History</button>
    </div>
    
    <div class="tab-content">
      <div id="send-money" class="tab-pane active">
        <!-- Include the transfer form partial -->
        <div class="transfer-form-wrapper">
          {{< partial "payment/transfer-form.html" >}}
        </div>
      </div>
      
      <div id="transaction-history" class="tab-pane">
        <div class="transaction-filters">
          <div class="filter-group">
            <label for="transaction-type">Type:</label>
            <select id="transaction-type">
              <option value="all">All Transactions</option>
              <option value="deposits">Deposits</option>
              <option value="transfers">Transfers</option>
              <option value="withdrawals">Withdrawals</option>
              <option value="bets">Betting Activity</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="date-range">Date Range:</label>
            <select id="date-range">
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
        
        <div class="transaction-list">
          <div class="transaction-item deposit">
            <div class="transaction-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
            <div class="transaction-details">
              <div class="transaction-title">Deposit (Credit Card)</div>
              <div class="transaction-date">Apr 15, 2023</div>
            </div>
            <div class="transaction-amount positive">+$200.00</div>
          </div>
          
          <div class="transaction-item transfer-out">
            <div class="transaction-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m5 5 5.5 5.5" />
                <path d="m18 18-5.5-5.5" />
                <path d="M5 19V5h14" />
              </svg>
            </div>
            <div class="transaction-details">
              <div class="transaction-title">Transfer to Jane Doe</div>
              <div class="transaction-date">Apr 10, 2023</div>
            </div>
            <div class="transaction-amount negative">-$50.00</div>
          </div>
          
          <div class="transaction-item bet-win">
            <div class="transaction-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z" />
                <path d="m10 9.5 2 1.5 2-1.5" />
                <path d="M12 12v4" />
                <path d="M19 9a7 7 0 1 0-13.6 2.3" />
                <path d="M22 22 8.6 8.6" />
              </svg>
            </div>
            <div class="transaction-details">
              <div class="transaction-title">Bet Win - Detroit Supercross</div>
              <div class="transaction-date">Apr 5, 2023</div>
            </div>
            <div class="transaction-amount positive">+$120.00</div>
          </div>
          
          <div class="transaction-item bet-loss">
            <div class="transaction-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z" />
                <path d="m10 9.5 2 1.5 2-1.5" />
                <path d="M12 12v4" />
                <path d="M19 9a7 7 0 1 0-13.6 2.3" />
                <path d="M22 22 8.6 8.6" />
              </svg>
            </div>
            <div class="transaction-details">
              <div class="transaction-title">Bet Loss - Anaheim Supercross</div>
              <div class="transaction-date">Mar 28, 2023</div>
            </div>
            <div class="transaction-amount negative">-$75.00</div>
          </div>
          
          <div class="transaction-item transfer-in">
            <div class="transaction-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m19 5-5.5 5.5" />
                <path d="m6 18 5.5-5.5" />
                <path d="M19 5v14H5" />
              </svg>
            </div>
            <div class="transaction-details">
              <div class="transaction-title">Transfer from Mike Johnson</div>
              <div class="transaction-date">Mar 22, 2023</div>
            </div>
            <div class="transaction-amount positive">+$35.00</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
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
  
  // Transaction filtering (simplified for demo)
  const typeFilter = document.getElementById('transaction-type');
  const dateFilter = document.getElementById('date-range');
  const transactionItems = document.querySelectorAll('.transaction-item');
  
  function applyFilters() {
    const typeValue = typeFilter.value;
    
    transactionItems.forEach(item => {
      // Show all items if 'all' is selected
      if (typeValue === 'all') {
        item.style.display = 'flex';
        return;
      }
      
      // Otherwise, filter by transaction type
      if (
        (typeValue === 'deposits' && item.classList.contains('deposit')) ||
        (typeValue === 'transfers' && (item.classList.contains('transfer-in') || item.classList.contains('transfer-out'))) ||
        (typeValue === 'withdrawals' && item.classList.contains('withdrawal')) ||
        (typeValue === 'bets' && (item.classList.contains('bet-win') || item.classList.contains('bet-loss')))
      ) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  typeFilter.addEventListener('change', applyFilters);
  dateFilter.addEventListener('change', applyFilters);
});
</script>

<style>
.transfers-page {
  max-width: 1200px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.transfers-header {
  margin-bottom: 2rem;
  text-align: center;
}

.subtitle {
  color: #666;
  font-size: 1.2rem;
}

.account-summary {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.balance-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.balance-header {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.balance-amount {
  font-size: 3rem;
  font-weight: bold;
  color: #0066cc;
  margin-bottom: 1rem;
}

.add-funds-btn {
  display: inline-block;
  background-color: #0066cc;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.add-funds-btn:hover {
  background-color: #0052a3;
}

.payment-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.option-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 2px solid transparent;
}

.option-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}

.option-card.active {
  border-color: #0066cc;
}

.option-icon {
  width: 48px;
  height: 48px;
  background-color: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #0066cc;
}

.option-card h3 {
  margin: 0 0 0.5rem;
  color: #333;
}

.option-card p {
  color: #666;
  margin-bottom: 1.5rem;
}

.option-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.option-link:hover {
  background-color: #e0e0e0;
}

.option-card.active .option-link {
  background-color: #0066cc;
  color: white;
}

.option-card.active .option-link:hover {
  background-color: #0052a3;
}

.transfers-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #eee;
}

.tab-btn {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  position: relative;
}

.tab-btn:hover {
  color: #333;
}

.tab-btn.active {
  color: #0066cc;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #0066cc;
}

.tab-content {
  padding: 1.5rem;
}

.tab-pane {
  display: none;
}

.tab-pane.active {
  display: block;
}

.transfer-form-wrapper {
  /* No additional styling needed, the form has its own */
}

.transaction-filters {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
  color: #333;
}

.filter-group select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.transaction-list {
  display: flex;
  flex-direction: column;
}

.transaction-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-icon {
  width: 36px;
  height: 36px;
  background-color: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.deposit .transaction-icon {
  color: #28a745;
  background-color: rgba(40, 167, 69, 0.1);
}

.withdrawal .transaction-icon {
  color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
}

.transfer-in .transaction-icon {
  color: #17a2b8;
  background-color: rgba(23, 162, 184, 0.1);
}

.transfer-out .transaction-icon {
  color: #6c757d;
  background-color: rgba(108, 117, 125, 0.1);
}

.bet-win .transaction-icon,
.bet-loss .transaction-icon {
  color: #fd7e14;
  background-color: rgba(253, 126, 20, 0.1);
}

.transaction-details {
  flex: 1;
}

.transaction-title {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
}

.transaction-date {
  font-size: 0.85rem;
  color: #666;
}

.transaction-amount {
  font-weight: bold;
  font-size: 1.1rem;
}

.positive {
  color: #28a745;
}

.negative {
  color: #dc3545;
}

@media (max-width: 768px) {
  .payment-options {
    grid-template-columns: 1fr;
  }
  
  .transaction-filters {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>