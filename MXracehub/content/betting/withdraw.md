---
title: "Withdraw Funds"
description: "Withdraw your winnings to your bank account or cryptocurrency wallet"
---

<div class="withdraw-page">
  <div class="withdraw-header">
    <h1>Withdraw Funds</h1>
    <p class="subtitle">Cash out your winnings to your preferred payment method</p>
  </div>
  
  <div class="account-summary">
    <div class="balance-card">
      <div class="balance-header">Available Balance</div>
      <div class="balance-amount">$750.00</div>
      <div class="withdrawal-limit">
        <span>Withdrawal Limit:</span>
        <span>$10,000.00 per month</span>
      </div>
    </div>
  </div>
  
  <div class="withdraw-container">
    <div class="tabs">
      <button class="tab-btn active" data-tab="bank-transfer">Bank Transfer</button>
      <button class="tab-btn" data-tab="paypal">PayPal</button>
      <button class="tab-btn" data-tab="crypto">Cryptocurrency</button>
    </div>
    
    <div class="tab-content">
      <!-- Bank Transfer Tab -->
      <div id="bank-transfer" class="tab-pane active">
        <div class="withdraw-form">
          <div class="form-group">
            <label for="bank-amount">Amount to Withdraw ($)</label>
            <div class="input-with-icon">
              <span class="currency-icon">$</span>
              <input type="number" id="bank-amount" min="10" step="5" placeholder="0.00">
            </div>
            <div class="amount-hint">Minimum withdrawal: $10.00</div>
          </div>
          
          <div class="saved-accounts">
            <h3>Your Bank Accounts</h3>
            
            <div class="accounts-list">
              <div class="no-accounts">
                You don't have any saved bank accounts yet.
              </div>
              
              <button id="add-account" class="add-account-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Add Bank Account
              </button>
            </div>
          </div>
          
          <div id="add-account-form" class="add-account-form hidden">
            <h3>Add Bank Account</h3>
            
            <div class="form-group">
              <label for="account-holder">Account Holder Name</label>
              <input type="text" id="account-holder" placeholder="Your full name">
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="routing-number">Routing Number</label>
                <input type="text" id="routing-number" placeholder="9 digits">
              </div>
              
              <div class="form-group">
                <label for="account-number">Account Number</label>
                <input type="text" id="account-number" placeholder="Your account number">
              </div>
            </div>
            
            <div class="form-group">
              <label for="account-type">Account Type</label>
              <select id="account-type">
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
            </div>
            
            <div class="form-actions">
              <button id="cancel-add-account" class="cancel-btn">Cancel</button>
              <button id="save-account" class="save-btn">Save Account</button>
            </div>
          </div>
          
          <div id="bank-errors" class="error-message" role="alert"></div>
          
          <button id="submit-bank-withdraw" class="withdraw-button">
            <span id="bank-button-text">Withdraw to Bank</span>
            <div id="bank-spinner" class="spinner hidden"></div>
          </button>
        </div>
      </div>
      
      <!-- PayPal Tab -->
      <div id="paypal" class="tab-pane">
        <div class="withdraw-form">
          <div class="form-group">
            <label for="paypal-email">PayPal Email Address</label>
            <input type="email" id="paypal-email" placeholder="your-email@example.com">
          </div>
          
          <div class="form-group">
            <label for="paypal-amount">Amount to Withdraw ($)</label>
            <div class="input-with-icon">
              <span class="currency-icon">$</span>
              <input type="number" id="paypal-amount" min="10" step="5" placeholder="0.00">
            </div>
            <div class="amount-hint">Minimum withdrawal: $10.00</div>
          </div>
          
          <div id="paypal-errors" class="error-message" role="alert"></div>
          
          <button id="submit-paypal-withdraw" class="withdraw-button">
            <span id="paypal-button-text">Withdraw to PayPal</span>
            <div id="paypal-spinner" class="spinner hidden"></div>
          </button>
          
          <div class="paypal-info">
            <p>Funds will typically arrive in your PayPal account within 24 hours, but may take up to 3 business days during high volume periods.</p>
          </div>
        </div>
      </div>
      
      <!-- Cryptocurrency Tab -->
      <div id="crypto" class="tab-pane">
        <div class="withdraw-form">
          <div class="form-group">
            <label for="crypto-currency">Select Cryptocurrency</label>
            <select id="crypto-currency">
              <option value="btc">Bitcoin (BTC)</option>
              <option value="eth">Ethereum (ETH)</option>
              <option value="sol">Solana (SOL)</option>
              <option value="usdc">USD Coin (USDC)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="crypto-address">Your Wallet Address</label>
            <input type="text" id="crypto-address" placeholder="Enter your wallet address">
          </div>
          
          <div class="form-group">
            <label for="crypto-amount">Amount to Withdraw ($)</label>
            <div class="input-with-icon">
              <span class="currency-icon">$</span>
              <input type="number" id="crypto-amount" min="10" step="5" placeholder="0.00">
            </div>
            <div class="amount-hint">Minimum withdrawal: $10.00</div>
          </div>
          
          <div class="crypto-conversion">
            <p>You will receive approximately <span id="crypto-value">0.00</span> <span id="crypto-symbol">BTC</span></p>
          </div>
          
          <div id="crypto-errors" class="error-message" role="alert"></div>
          
          <button id="submit-crypto-withdraw" class="withdraw-button">
            <span id="crypto-button-text">Withdraw to Wallet</span>
            <div id="crypto-spinner" class="spinner hidden"></div>
          </button>
          
          <div class="crypto-info">
            <p>Please double-check your wallet address carefully. Cryptocurrency transactions cannot be reversed once confirmed.</p>
            <p>Withdrawals will be processed within 2 hours during normal operation.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="recent-withdrawals">
    <h2>Recent Withdrawals</h2>
    
    <div class="withdrawal-history">
      <div class="withdrawal-item">
        <div class="withdrawal-icon bank">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        </div>
        <div class="withdrawal-details">
          <div class="withdrawal-primary">
            <span class="withdrawal-method">Bank Transfer</span>
            <span class="withdrawal-amount">$200.00</span>
          </div>
          <div class="withdrawal-secondary">
            <span class="withdrawal-date">Apr 2, 2023</span>
            <span class="withdrawal-status completed">Completed</span>
          </div>
        </div>
      </div>
      
      <div class="withdrawal-item">
        <div class="withdrawal-icon paypal">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 11l2 7a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2l3-10a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v3Z" />
            <path d="M10 11h6a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2Z" />
          </svg>
        </div>
        <div class="withdrawal-details">
          <div class="withdrawal-primary">
            <span class="withdrawal-method">PayPal</span>
            <span class="withdrawal-amount">$150.00</span>
          </div>
          <div class="withdrawal-secondary">
            <span class="withdrawal-date">Mar 18, 2023</span>
            <span class="withdrawal-status completed">Completed</span>
          </div>
        </div>
      </div>
      
      <div class="withdrawal-item">
        <div class="withdrawal-icon crypto">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
          </svg>
        </div>
        <div class="withdrawal-details">
          <div class="withdrawal-primary">
            <span class="withdrawal-method">Bitcoin</span>
            <span class="withdrawal-amount">$100.00</span>
          </div>
          <div class="withdrawal-secondary">
            <span class="withdrawal-date">Mar 5, 2023</span>
            <span class="withdrawal-status processing">Processing</span>
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
  
  // Bank Account Form Toggle
  const addAccountBtn = document.getElementById('add-account');
  const addAccountForm = document.getElementById('add-account-form');
  const cancelAddAccountBtn = document.getElementById('cancel-add-account');
  const saveAccountBtn = document.getElementById('save-account');
  
  if (addAccountBtn) {
    addAccountBtn.addEventListener('click', function() {
      addAccountForm.classList.remove('hidden');
      this.classList.add('hidden');
    });
  }
  
  if (cancelAddAccountBtn) {
    cancelAddAccountBtn.addEventListener('click', function() {
      addAccountForm.classList.add('hidden');
      addAccountBtn.classList.remove('hidden');
    });
  }
  
  if (saveAccountBtn) {
    saveAccountBtn.addEventListener('click', function() {
      const accountHolder = document.getElementById('account-holder').value;
      const routingNumber = document.getElementById('routing-number').value;
      const accountNumber = document.getElementById('account-number').value;
      const accountType = document.getElementById('account-type').value;
      
      if (!accountHolder || !routingNumber || !accountNumber) {
        document.getElementById('bank-errors').textContent = 'Please fill out all fields';
        return;
      }
      
      // Create a new account element
      const accountsList = document.querySelector('.accounts-list');
      const noAccounts = document.querySelector('.no-accounts');
      
      if (noAccounts) {
        noAccounts.remove();
      }
      
      const accountElement = document.createElement('div');
      accountElement.className = 'account-item';
      accountElement.innerHTML = `
        <div class="account-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        </div>
        <div class="account-details">
          <div class="account-name">${accountHolder}</div>
          <div class="account-number">●●●● ${accountNumber.slice(-4)}</div>
          <div class="account-type">${accountType.charAt(0).toUpperCase() + accountType.slice(1)}</div>
        </div>
        <div class="account-actions">
          <input type="radio" name="selected-account" checked>
        </div>
      `;
      
      accountsList.insertBefore(accountElement, addAccountBtn);
      
      // Hide the form and show the add button
      addAccountForm.classList.add('hidden');
      addAccountBtn.classList.remove('hidden');
      
      // Clear form fields
      document.getElementById('account-holder').value = '';
      document.getElementById('routing-number').value = '';
      document.getElementById('account-number').value = '';
    });
  }
  
  // Crypto conversion calculation
  const cryptoCurrency = document.getElementById('crypto-currency');
  const cryptoAmount = document.getElementById('crypto-amount');
  const cryptoValue = document.getElementById('crypto-value');
  const cryptoSymbol = document.getElementById('crypto-symbol');
  
  // Mock exchange rates
  const exchangeRates = {
    btc: 0.000034,
    eth: 0.00052,
    sol: 0.011,
    usdc: 1
  };
  
  // Update crypto conversion when amount or currency changes
  function updateCryptoConversion() {
    const currency = cryptoCurrency.value;
    const amount = parseFloat(cryptoAmount.value) || 0;
    const rate = exchangeRates[currency];
    
    cryptoValue.textContent = (amount * rate).toFixed(8);
    cryptoSymbol.textContent = currency.toUpperCase();
  }
  
  if (cryptoCurrency && cryptoAmount) {
    cryptoCurrency.addEventListener('change', updateCryptoConversion);
    cryptoAmount.addEventListener('input', updateCryptoConversion);
  }
  
  // Submit handlers for each withdrawal method
  const bankWithdrawBtn = document.getElementById('submit-bank-withdraw');
  const paypalWithdrawBtn = document.getElementById('submit-paypal-withdraw');
  const cryptoWithdrawBtn = document.getElementById('submit-crypto-withdraw');
  
  // Bank withdrawal
  if (bankWithdrawBtn) {
    bankWithdrawBtn.addEventListener('click', async function() {
      const amount = parseFloat(document.getElementById('bank-amount').value);
      const selectedAccount = document.querySelector('input[name="selected-account"]:checked');
      
      if (!amount || amount < 10) {
        document.getElementById('bank-errors').textContent = 'Please enter a valid amount (minimum $10)';
        return;
      }
      
      if (!selectedAccount) {
        document.getElementById('bank-errors').textContent = 'Please add and select a bank account';
        return;
      }
      
      // Show loading state
      this.disabled = true;
      document.getElementById('bank-spinner').classList.remove('hidden');
      document.getElementById('bank-button-text').textContent = 'Processing...';
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Add withdrawal to history
        addWithdrawalToHistory('Bank Transfer', amount);
        
        // Reset form
        document.getElementById('bank-amount').value = '';
        
        // Show success message
        alert('Your withdrawal request has been submitted successfully!');
      } catch (error) {
        document.getElementById('bank-errors').textContent = 'An error occurred. Please try again.';
      } finally {
        // Reset button state
        this.disabled = false;
        document.getElementById('bank-spinner').classList.add('hidden');
        document.getElementById('bank-button-text').textContent = 'Withdraw to Bank';
      }
    });
  }
  
  // PayPal withdrawal
  if (paypalWithdrawBtn) {
    paypalWithdrawBtn.addEventListener('click', async function() {
      const email = document.getElementById('paypal-email').value;
      const amount = parseFloat(document.getElementById('paypal-amount').value);
      
      if (!email || !email.includes('@')) {
        document.getElementById('paypal-errors').textContent = 'Please enter a valid email address';
        return;
      }
      
      if (!amount || amount < 10) {
        document.getElementById('paypal-errors').textContent = 'Please enter a valid amount (minimum $10)';
        return;
      }
      
      // Show loading state
      this.disabled = true;
      document.getElementById('paypal-spinner').classList.remove('hidden');
      document.getElementById('paypal-button-text').textContent = 'Processing...';
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Add withdrawal to history
        addWithdrawalToHistory('PayPal', amount);
        
        // Reset form
        document.getElementById('paypal-email').value = '';
        document.getElementById('paypal-amount').value = '';
        
        // Show success message
        alert('Your withdrawal request has been submitted successfully!');
      } catch (error) {
        document.getElementById('paypal-errors').textContent = 'An error occurred. Please try again.';
      } finally {
        // Reset button state
        this.disabled = false;
        document.getElementById('paypal-spinner').classList.add('hidden');
        document.getElementById('paypal-button-text').textContent = 'Withdraw to PayPal';
      }
    });
  }
  
  // Crypto withdrawal
  if (cryptoWithdrawBtn) {
    cryptoWithdrawBtn.addEventListener('click', async function() {
      const currency = document.getElementById('crypto-currency').value;
      const address = document.getElementById('crypto-address').value;
      const amount = parseFloat(document.getElementById('crypto-amount').value);
      
      if (!address) {
        document.getElementById('crypto-errors').textContent = 'Please enter a valid wallet address';
        return;
      }
      
      if (!amount || amount < 10) {
        document.getElementById('crypto-errors').textContent = 'Please enter a valid amount (minimum $10)';
        return;
      }
      
      // Show loading state
      this.disabled = true;
      document.getElementById('crypto-spinner').classList.remove('hidden');
      document.getElementById('crypto-button-text').textContent = 'Processing...';
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Add withdrawal to history
        const currencyName = {
          btc: 'Bitcoin',
          eth: 'Ethereum',
          sol: 'Solana',
          usdc: 'USD Coin'
        }[currency];
        
        addWithdrawalToHistory(currencyName, amount, 'processing');
        
        // Reset form
        document.getElementById('crypto-address').value = '';
        document.getElementById('crypto-amount').value = '';
        updateCryptoConversion();
        
        // Show success message
        alert('Your withdrawal request has been submitted successfully!');
      } catch (error) {
        document.getElementById('crypto-errors').textContent = 'An error occurred. Please try again.';
      } finally {
        // Reset button state
        this.disabled = false;
        document.getElementById('crypto-spinner').classList.add('hidden');
        document.getElementById('crypto-button-text').textContent = 'Withdraw to Wallet';
      }
    });
  }
  
  // Helper function to add withdrawal to history
  function addWithdrawalToHistory(method, amount, status = 'processing') {
    const historyContainer = document.querySelector('.withdrawal-history');
    
    const withdrawalElement = document.createElement('div');
    withdrawalElement.className = 'withdrawal-item';
    
    // Determine icon class
    let iconClass = 'bank';
    if (method.toLowerCase().includes('paypal')) {
      iconClass = 'paypal';
    } else if (!method.toLowerCase().includes('bank')) {
      iconClass = 'crypto';
    }
    
    // Format the SVG based on the withdrawal method
    let svgIcon = '';
    
    if (iconClass === 'bank') {
      svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      `;
    } else if (iconClass === 'paypal') {
      svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 11l2 7a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2l3-10a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v3Z" />
          <path d="M10 11h6a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2Z" />
        </svg>
      `;
    } else {
      svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
        </svg>
      `;
    }
    
    // Get current date
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    withdrawalElement.innerHTML = `
      <div class="withdrawal-icon ${iconClass}">
        ${svgIcon}
      </div>
      <div class="withdrawal-details">
        <div class="withdrawal-primary">
          <span class="withdrawal-method">${method}</span>
          <span class="withdrawal-amount">$${amount.toFixed(2)}</span>
        </div>
        <div class="withdrawal-secondary">
          <span class="withdrawal-date">${formattedDate}</span>
          <span class="withdrawal-status ${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
        </div>
      </div>
    `;
    
    // Add to the beginning of the list
    historyContainer.insertBefore(withdrawalElement, historyContainer.firstChild);
  }
});
</script>

<style>
.withdraw-page {
  max-width: 1200px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.withdraw-header {
  margin-bottom: 2rem;
  text-align: center;
}

.subtitle {
  color: #666;
  font-size: 1.2rem;
}

.account-summary {
  margin-bottom: 2rem;
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

.withdrawal-limit {
  color: #666;
  font-size: 0.9rem;
}

.withdraw-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
  margin-bottom: 3rem;
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

.withdraw-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 1rem;
  }
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

input, select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus, select:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 1px #0066cc;
}

.input-with-icon {
  position: relative;
}

.currency-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #333;
  font-weight: bold;
}

input[type="number"].input-with-icon {
  padding-left: 2rem;
}

.amount-hint {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
}

.withdraw-button {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #0066cc;
  color: white;
  border: 0;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  margin-bottom: 1.5rem;
}

.withdraw-button:hover {
  background-color: #0052a3;
}

.withdraw-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
  min-height: 1.5rem;
}

.saved-accounts {
  margin-bottom: 1.5rem;
}

.saved-accounts h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #333;
}

.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.no-accounts {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  color: #666;
  text-align: center;
}

.add-account-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #f0f0f0;
  border: 1px dashed #ccc;
  border-radius: 4px;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-account-btn:hover {
  background-color: #e0e0e0;
}

.add-account-form {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.add-account-form h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #333;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.cancel-btn {
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-btn:hover {
  background-color: #f0f0f0;
}

.save-btn {
  padding: 0.5rem 1rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-btn:hover {
  background-color: #0052a3;
}

.account-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  gap: 1rem;
}

.account-icon {
  width: 36px;
  height: 36px;
  background-color: #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
}

.account-details {
  flex: 1;
}

.account-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
}

.account-number, .account-type {
  font-size: 0.8rem;
  color: #666;
}

.paypal-info, .crypto-info {
  margin-top: 1.5rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #666;
}

.paypal-info p, .crypto-info p {
  margin: 0.5rem 0;
}

.crypto-conversion {
  background-color: #f9f9f9;
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

#crypto-value, #crypto-symbol {
  font-weight: 500;
  color: #333;
}

.recent-withdrawals {
  margin-top: 3rem;
}

.recent-withdrawals h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.withdrawal-history {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
}

.withdrawal-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.withdrawal-item:last-child {
  border-bottom: none;
}

.withdrawal-icon {
  width: 36px;
  height: 36px;
  background-color: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.withdrawal-icon.bank {
  color: #0066cc;
  background-color: rgba(0, 102, 204, 0.1);
}

.withdrawal-icon.paypal {
  color: #003087;
  background-color: rgba(0, 48, 135, 0.1);
}

.withdrawal-icon.crypto {
  color: #f7931a;
  background-color: rgba(247, 147, 26, 0.1);
}

.withdrawal-details {
  flex: 1;
}

.withdrawal-primary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.withdrawal-method {
  font-weight: 500;
  color: #333;
}

.withdrawal-amount {
  font-weight: 500;
  color: #dc3545;
}

.withdrawal-secondary {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
}

.withdrawal-status {
  font-weight: 500;
}

.withdrawal-status.completed {
  color: #28a745;
}

.withdrawal-status.processing {
  color: #fd7e14;
}

.withdrawal-status.failed {
  color: #dc3545;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

@keyframes spin {
  to { transform: translateY(-50%) rotate(360deg); }
}

.hidden {
  display: none;
}
</style>