---
title: "Money Transfers"
description: "Transfer funds between your wallet and bank accounts"
layout: "single"
---

{{< rawhtml >}}
<div class="transfers-container">
  <div class="transfers-header">
    <h1 class="text-3xl font-bold mb-2">Money Transfers</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">Transfer funds between your wallet and bank accounts</p>
  </div>

  <div class="transfers-content">
    <div class="wallet-summary">
      <div class="wallet-card">
        <div class="wallet-balance">
          <h2>Available Balance</h2>
          <div class="balance-amount" id="available-balance">$250.00</div>
        </div>
        <div class="wallet-actions">
          <a href="/account/wallet/" class="wallet-btn">View Wallet</a>
        </div>
      </div>
    </div>

    <div class="transfer-options">
      <div class="transfer-tabs">
        <button class="tab-btn active" data-tab="deposit">Deposit to Wallet</button>
        <button class="tab-btn" data-tab="withdraw">Withdraw to Bank</button>
      </div>
      
      <div class="tab-content">
        <!-- Deposit Tab -->
        <div id="deposit-tab" class="tab-pane active">
          <div class="transfer-card">
            <h2 class="text-xl font-semibold mb-4">Deposit Funds to Your Wallet</h2>
            <p class="mb-4">Transfer money from your bank account to your MXRaceHub wallet.</p>
            
            <div class="bank-accounts-section">
              <h3 class="text-lg font-medium mb-3">Your Bank Accounts</h3>
              
              <div id="bank-accounts-list" class="bank-accounts-list">
                <!-- Loading state -->
                <div class="loading-state" id="bank-accounts-loading">
                  <div class="spinner"></div>
                  <p>Loading your bank accounts...</p>
                </div>
                
                <!-- Empty state -->
                <div class="empty-state hidden" id="bank-accounts-empty">
                  <div class="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                  </div>
                  <p>You don't have any bank accounts connected yet.</p>
                  <button id="add-bank-account-btn" class="add-account-btn">Add Bank Account</button>
                </div>
                
                <!-- Bank accounts will be populated here -->
                <div id="accounts-container" class="hidden">
                  <div class="bank-account-item" data-account-id="1">
                    <div class="account-radio">
                      <input type="radio" name="deposit-account" id="deposit-account-1" value="1" checked>
                      <label for="deposit-account-1" class="radiomark"></label>
                    </div>
                    <div class="account-info">
                      <div class="account-name">Personal Checking ••••5678</div>
                      <div class="account-bank">Bank of America</div>
                    </div>
                  </div>
                  
                  <div class="bank-account-item" data-account-id="2">
                    <div class="account-radio">
                      <input type="radio" name="deposit-account" id="deposit-account-2" value="2">
                      <label for="deposit-account-2" class="radiomark"></label>
                    </div>
                    <div class="account-info">
                      <div class="account-name">Savings Account ••••9012</div>
                      <div class="account-bank">Chase Bank</div>
                    </div>
                  </div>
                  
                  <button id="add-bank-account-btn-2" class="add-account-btn-alt">Add Another Bank Account</button>
                </div>
              </div>
            </div>
            
            <form id="deposit-form" class="transfer-form">
              <div class="form-group">
                <label for="deposit-amount">Amount to Deposit ($)</label>
                <input type="number" id="deposit-amount" name="deposit-amount" min="10" step="5" required>
                <div class="error-message" id="deposit-amount-error"></div>
                <div class="hint-text">Minimum deposit: $10.00</div>
              </div>
              
              <div class="form-group">
                <label for="deposit-description">Description (Optional)</label>
                <input type="text" id="deposit-description" name="deposit-description" placeholder="e.g., Funds for betting">
              </div>
              
              <div id="deposit-processing" class="processing-indicator hidden">
                <div class="spinner"></div>
                <span>Processing deposit, please wait...</span>
              </div>
              
              <div id="deposit-success" class="success-message hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Deposit successful! Your wallet has been credited.</span>
              </div>
              
              <div class="transfer-disclaimer">
                <p>Bank transfers typically take 1-3 business days to complete. You will receive an email notification once the funds are available in your wallet.</p>
              </div>
              
              <div class="form-actions">
                <button type="submit" id="deposit-submit-btn" class="submit-btn">Deposit Funds</button>
              </div>
            </form>
          </div>
        </div>
        
        <!-- Withdraw Tab -->
        <div id="withdraw-tab" class="tab-pane">
          <div class="transfer-card">
            <h2 class="text-xl font-semibold mb-4">Withdraw Funds to Your Bank</h2>
            <p class="mb-4">Transfer money from your MXRaceHub wallet to your bank account.</p>
            
            <div class="bank-accounts-section">
              <h3 class="text-lg font-medium mb-3">Your Bank Accounts</h3>
              
              <div id="withdraw-bank-accounts-list" class="bank-accounts-list">
                <!-- Loading state -->
                <div class="loading-state" id="withdraw-bank-accounts-loading">
                  <div class="spinner"></div>
                  <p>Loading your bank accounts...</p>
                </div>
                
                <!-- Empty state -->
                <div class="empty-state hidden" id="withdraw-bank-accounts-empty">
                  <div class="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                  </div>
                  <p>You don't have any bank accounts connected yet.</p>
                  <button id="add-withdraw-bank-account-btn" class="add-account-btn">Add Bank Account</button>
                </div>
                
                <!-- Bank accounts will be populated here -->
                <div id="withdraw-accounts-container" class="hidden">
                  <div class="bank-account-item" data-account-id="1">
                    <div class="account-radio">
                      <input type="radio" name="withdraw-account" id="withdraw-account-1" value="1" checked>
                      <label for="withdraw-account-1" class="radiomark"></label>
                    </div>
                    <div class="account-info">
                      <div class="account-name">Personal Checking ••••5678</div>
                      <div class="account-bank">Bank of America</div>
                    </div>
                  </div>
                  
                  <div class="bank-account-item" data-account-id="2">
                    <div class="account-radio">
                      <input type="radio" name="withdraw-account" id="withdraw-account-2" value="2">
                      <label for="withdraw-account-2" class="radiomark"></label>
                    </div>
                    <div class="account-info">
                      <div class="account-name">Savings Account ••••9012</div>
                      <div class="account-bank">Chase Bank</div>
                    </div>
                  </div>
                  
                  <button id="add-withdraw-bank-account-btn-2" class="add-account-btn-alt">Add Another Bank Account</button>
                </div>
              </div>
            </div>
            
            <form id="withdraw-form" class="transfer-form">
              <div class="form-group">
                <label for="withdraw-amount">Amount to Withdraw ($)</label>
                <input type="number" id="withdraw-amount" name="withdraw-amount" min="10" step="5" required>
                <div class="error-message" id="withdraw-amount-error"></div>
                <div class="hint-text">Minimum withdrawal: $10.00</div>
              </div>
              
              <div class="form-group">
                <label for="withdraw-description">Description (Optional)</label>
                <input type="text" id="withdraw-description" name="withdraw-description" placeholder="e.g., Moving winnings to bank">
              </div>
              
              <div id="withdraw-processing" class="processing-indicator hidden">
                <div class="spinner"></div>
                <span>Processing withdrawal, please wait...</span>
              </div>
              
              <div id="withdraw-success" class="success-message hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Withdrawal request submitted! The funds will be sent to your bank account.</span>
              </div>
              
              <div class="insufficient-funds-message hidden" id="insufficient-funds">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>You don't have enough funds in your wallet to make this withdrawal.</span>
              </div>
              
              <div class="transfer-disclaimer">
                <p>Bank transfers typically take 1-3 business days to complete. Your bank account will be credited once the transfer is processed.</p>
              </div>
              
              <div class="form-actions">
                <button type="submit" id="withdraw-submit-btn" class="submit-btn">Withdraw Funds</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Add Bank Account Modal -->
  <div id="add-bank-modal" class="modal hidden">
    <div class="modal-overlay"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="text-xl font-semibold">Add Bank Account</h2>
        <button class="modal-close" id="modal-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="modal-content">
        <form id="bank-account-form" class="bank-account-form">
          <div class="form-row">
            <div class="form-group">
              <label for="bank-name">Bank Name</label>
              <input type="text" id="bank-name" name="bank-name" required>
              <div class="error-message" id="bank-name-error"></div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="account-name">Account Name</label>
              <input type="text" id="account-name" name="account-name" required>
              <div class="error-message" id="account-name-error"></div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group half">
              <label for="account-type">Account Type</label>
              <select id="account-type" name="account-type" required>
                <option value="">Select account type</option>
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
              <div class="error-message" id="account-type-error"></div>
            </div>
            
            <div class="form-group half">
              <label for="account-currency">Currency</label>
              <select id="account-currency" name="account-currency" required>
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              <div class="error-message" id="account-currency-error"></div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="routing-number">Routing Number</label>
              <input type="text" id="routing-number" name="routing-number" required>
              <div class="error-message" id="routing-number-error"></div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="account-number">Account Number</label>
              <input type="text" id="account-number" name="account-number" required>
              <div class="error-message" id="account-number-error"></div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="confirm-account-number">Confirm Account Number</label>
              <input type="text" id="confirm-account-number" name="confirm-account-number" required>
              <div class="error-message" id="confirm-account-number-error"></div>
            </div>
          </div>
          
          <div id="bank-account-processing" class="processing-indicator hidden">
            <div class="spinner"></div>
            <span>Adding bank account, please wait...</span>
          </div>
          
          <div class="form-actions">
            <button type="button" class="cancel-btn" id="bank-account-cancel">Cancel</button>
            <button type="submit" id="bank-account-submit" class="submit-btn">Add Bank Account</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  .transfers-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .transfers-header {
    margin-bottom: 2rem;
  }
  
  .transfers-content {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    .transfers-content {
      grid-template-columns: 1fr;
    }
  }
  
  .wallet-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
  
  .wallet-balance h2 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #666;
  }
  
  .balance-amount {
    font-size: 2rem;
    font-weight: 700;
    color: #0066cc;
    margin-bottom: 1rem;
  }
  
  .wallet-btn {
    display: inline-block;
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s;
    text-decoration: none;
  }
  
  .wallet-btn:hover {
    background-color: #0052a3;
    text-decoration: none;
  }
  
  .transfer-tabs {
    display: flex;
    border-bottom: 1px solid #eee;
    margin-bottom: 1.5rem;
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
    color: #0066cc;
  }
  
  .tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #0066cc;
  }
  
  .tab-pane {
    display: none;
  }
  
  .tab-pane.active {
    display: block;
  }
  
  .transfer-card {
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .bank-accounts-section {
    margin-bottom: 1.5rem;
  }
  
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .spinner {
    width: 30px;
    height: 30px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-left-color: #0066cc;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    text-align: center;
  }
  
  .empty-icon {
    color: #666;
    margin-bottom: 1rem;
  }
  
  .add-account-btn {
    padding: 0.75rem 1.5rem;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  .add-account-btn:hover {
    background-color: #0052a3;
  }
  
  .add-account-btn-alt {
    padding: 0.5rem 1rem;
    background-color: transparent;
    color: #0066cc;
    border: 1px solid #0066cc;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 1rem;
    display: block;
    text-align: center;
  }
  
  .add-account-btn-alt:hover {
    background-color: #f0f7ff;
  }
  
  .bank-account-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    transition: all 0.2s;
  }
  
  .bank-account-item:hover {
    border-color: #0066cc;
    background-color: #f0f7ff;
  }
  
  .account-radio {
    position: relative;
    margin-right: 1rem;
  }
  
  .account-radio input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  .radiomark {
    position: relative;
    display: inline-block;
    height: 20px;
    width: 20px;
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 50%;
    cursor: pointer;
  }
  
  .account-radio input:checked ~ .radiomark {
    border-color: #0066cc;
  }
  
  .radiomark:after {
    content: "";
    position: absolute;
    display: none;
    top: 3px;
    left: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #0066cc;
  }
  
  .account-radio input:checked ~ .radiomark:after {
    display: block;
  }
  
  .account-info {
    flex-grow: 1;
  }
  
  .account-name {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .account-bank {
    font-size: 0.875rem;
    color: #666;
  }
  
  .transfer-form {
    margin-top: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .half {
    flex: 0 0 calc(50% - 0.5rem);
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input[type="text"], 
  input[type="email"], 
  input[type="password"], 
  input[type="tel"], 
  input[type="number"],
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    color: #000000;
    background-color: #ffffff;
  }
  
  .hint-text {
    font-size: 0.85rem;
    color: #444444;
    margin-top: 0.25rem;
    font-weight: 500;
  }
  
  .error-message {
    font-size: 0.85rem;
    color: #e53e3e;
    margin-top: 0.25rem;
    font-weight: 500;
  }
  
  .processing-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background-color: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .success-message {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background-color: #f0fff4;
    border: 1px solid #c6f6d5;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem 0;
    color: #2f855a;
  }
  
  .success-message svg {
    color: #38a169;
    flex-shrink: 0;
  }
  
  .insufficient-funds-message {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background-color: #fff5f5;
    border: 1px solid #fed7d7;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem 0;
    color: #e53e3e;
  }
  
  .transfer-disclaimer {
    margin: 1rem 0;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 4px;
    font-size: 0.875rem;
    color: #666;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  }
  
  .submit-btn {
    padding: 0.75rem 1.5rem;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .submit-btn:hover {
    background-color: #0052a3;
  }
  
  .cancel-btn {
    padding: 0.75rem 1.5rem;
    background-color: transparent;
    color: #666;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .cancel-btn:hover {
    background-color: #f5f5f5;
  }
  
  /* Modal styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-container {
    position: relative;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    z-index: 101;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .modal-close {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
  }
  
  .modal-close:hover {
    color: #333;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .hidden {
    display: none;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Variables
    let accountBalance = 250.00; // For demo purposes, this would come from the API
    let bankAccounts = [
      {
        id: 1,
        bankName: 'Bank of America',
        accountName: 'Personal Checking',
        accountNumber: '••••5678',
        accountType: 'checking',
        currency: 'USD',
        routingNumber: '123456789'
      },
      {
        id: 2,
        bankName: 'Chase Bank',
        accountName: 'Savings Account',
        accountNumber: '••••9012',
        accountType: 'savings',
        currency: 'USD',
        routingNumber: '987654321'
      }
    ]; // For demo purposes, this would come from the API
    
    // Elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    const depositForm = document.getElementById('deposit-form');
    const withdrawForm = document.getElementById('withdraw-form');
    const bankAccountForm = document.getElementById('bank-account-form');
    
    const addBankAccountBtn = document.getElementById('add-bank-account-btn');
    const addBankAccountBtn2 = document.getElementById('add-bank-account-btn-2');
    const addWithdrawBankAccountBtn = document.getElementById('add-withdraw-bank-account-btn');
    const addWithdrawBankAccountBtn2 = document.getElementById('add-withdraw-bank-account-btn-2');
    
    const bankAccountModal = document.getElementById('add-bank-modal');
    const modalClose = document.getElementById('modal-close');
    const bankAccountCancel = document.getElementById('bank-account-cancel');
    
    // Format currency
    function formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    }
    
    // Initialize the page
    function init() {
      // Display account balance
      document.getElementById('available-balance').textContent = formatCurrency(accountBalance);
      
      // Load bank accounts
      loadBankAccounts();
    }
    
    // Load bank accounts
    function loadBankAccounts() {
      // Simulate API call
      setTimeout(() => {
        const accountsContainer = document.getElementById('accounts-container');
        const bankAccountsLoading = document.getElementById('bank-accounts-loading');
        const bankAccountsEmpty = document.getElementById('bank-accounts-empty');
        
        const withdrawAccountsContainer = document.getElementById('withdraw-accounts-container');
        const withdrawBankAccountsLoading = document.getElementById('withdraw-bank-accounts-loading');
        const withdrawBankAccountsEmpty = document.getElementById('withdraw-bank-accounts-empty');
        
        // Hide loading state
        bankAccountsLoading.classList.add('hidden');
        withdrawBankAccountsLoading.classList.add('hidden');
        
        if (bankAccounts.length > 0) {
          // Show accounts container
          accountsContainer.classList.remove('hidden');
          withdrawAccountsContainer.classList.remove('hidden');
        } else {
          // Show empty state
          bankAccountsEmpty.classList.remove('hidden');
          withdrawBankAccountsEmpty.classList.remove('hidden');
        }
      }, 1000);
    }
    
    // Tab navigation
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all tabs
        tabButtons.forEach(tab => tab.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Open bank account modal
    function openBankAccountModal() {
      bankAccountModal.classList.remove('hidden');
      // Reset form
      bankAccountForm.reset();
    }
    
    // Close bank account modal
    function closeBankAccountModal() {
      bankAccountModal.classList.add('hidden');
    }
    
    // Add bank account buttons
    if (addBankAccountBtn) addBankAccountBtn.addEventListener('click', openBankAccountModal);
    if (addBankAccountBtn2) addBankAccountBtn2.addEventListener('click', openBankAccountModal);
    if (addWithdrawBankAccountBtn) addWithdrawBankAccountBtn.addEventListener('click', openBankAccountModal);
    if (addWithdrawBankAccountBtn2) addWithdrawBankAccountBtn2.addEventListener('click', openBankAccountModal);
    
    // Modal close buttons
    if (modalClose) modalClose.addEventListener('click', closeBankAccountModal);
    if (bankAccountCancel) bankAccountCancel.addEventListener('click', closeBankAccountModal);
    
    // Bank account form submission
    if (bankAccountForm) {
      bankAccountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateBankAccountForm()) {
          // Show processing
          document.getElementById('bank-account-processing').classList.remove('hidden');
          
          // Get form data
          const bankName = document.getElementById('bank-name').value;
          const accountName = document.getElementById('account-name').value;
          const accountType = document.getElementById('account-type').value;
          const currency = document.getElementById('account-currency').value;
          const routingNumber = document.getElementById('routing-number').value;
          const accountNumber = document.getElementById('account-number').value;
          
          // Check if user is logged in first
          fetch('/api/user', {
            method: 'GET',
            credentials: 'include'
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('You must be logged in to add a bank account');
            }
            return response.json();
          })
          .then(userData => {
            // In a real implementation, this would send the bank account info to a secure API
            // For demo purposes, we'll simulate a successful response
            return new Promise((resolve) => {
              setTimeout(() => {
                // Add new bank account to the list
                const newAccount = {
                  id: bankAccounts.length + 1,
                  bankName: bankName,
                  accountName: accountName,
                  accountNumber: '••••' + accountNumber.slice(-4),
                  accountType: accountType,
                  currency: currency,
                  routingNumber: routingNumber
                };
                
                bankAccounts.push(newAccount);
                
                resolve(newAccount);
              }, 1500);
            });
          })
          .then(newAccount => {
            // Hide processing
            document.getElementById('bank-account-processing').classList.add('hidden');
            
            // Close modal
            closeBankAccountModal();
            
            // Reload bank accounts
            loadBankAccounts();
            
            // Show success message
            alert('Bank account added successfully!');
          })
          .catch(error => {
            // Hide processing
            document.getElementById('bank-account-processing').classList.add('hidden');
            
            // Show error message
            alert('Error: ' + error.message);
            
            // If not logged in, redirect to login page
            if (error.message.includes('logged in')) {
              setTimeout(function() {
                window.location.href = '/account/login/';
              }, 2000);
            }
          });
        }
      });
    }
    
    // Validate bank account form
    function validateBankAccountForm() {
      let isValid = true;
      
      // Reset errors
      document.getElementById('bank-name-error').textContent = '';
      document.getElementById('account-name-error').textContent = '';
      document.getElementById('account-type-error').textContent = '';
      document.getElementById('account-currency-error').textContent = '';
      document.getElementById('routing-number-error').textContent = '';
      document.getElementById('account-number-error').textContent = '';
      document.getElementById('confirm-account-number-error').textContent = '';
      
      // Validate bank name
      const bankName = document.getElementById('bank-name').value.trim();
      if (!bankName) {
        document.getElementById('bank-name-error').textContent = 'Please enter your bank name';
        isValid = false;
      }
      
      // Validate account name
      const accountName = document.getElementById('account-name').value.trim();
      if (!accountName) {
        document.getElementById('account-name-error').textContent = 'Please enter your account name';
        isValid = false;
      }
      
      // Validate account type
      const accountType = document.getElementById('account-type').value;
      if (!accountType) {
        document.getElementById('account-type-error').textContent = 'Please select an account type';
        isValid = false;
      }
      
      // Validate routing number
      const routingNumber = document.getElementById('routing-number').value.trim();
      if (!routingNumber) {
        document.getElementById('routing-number-error').textContent = 'Please enter your routing number';
        isValid = false;
      } else if (!/^\d{9}$/.test(routingNumber)) {
        document.getElementById('routing-number-error').textContent = 'Routing number must be 9 digits';
        isValid = false;
      }
      
      // Validate account number
      const accountNumber = document.getElementById('account-number').value.trim();
      if (!accountNumber) {
        document.getElementById('account-number-error').textContent = 'Please enter your account number';
        isValid = false;
      } else if (!/^\d{4,17}$/.test(accountNumber)) {
        document.getElementById('account-number-error').textContent = 'Account number must be between 4 and 17 digits';
        isValid = false;
      }
      
      // Validate confirm account number
      const confirmAccountNumber = document.getElementById('confirm-account-number').value.trim();
      if (!confirmAccountNumber) {
        document.getElementById('confirm-account-number-error').textContent = 'Please confirm your account number';
        isValid = false;
      } else if (confirmAccountNumber !== accountNumber) {
        document.getElementById('confirm-account-number-error').textContent = 'Account numbers do not match';
        isValid = false;
      }
      
      return isValid;
    }
    
    // Deposit form submission
    if (depositForm) {
      depositForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        document.getElementById('deposit-amount-error').textContent = '';
        
        // Get form data
        const amount = parseFloat(document.getElementById('deposit-amount').value);
        const description = document.getElementById('deposit-description').value || 'Deposit from bank';
        const selectedAccountId = document.querySelector('input[name="deposit-account"]:checked')?.value;
        
        // Validate amount
        if (!amount || amount < 10) {
          document.getElementById('deposit-amount-error').textContent = 'Please enter an amount of at least $10.00';
          return;
        }
        
        // Validate account selection
        if (!selectedAccountId) {
          alert('Please select a bank account or add a new one');
          return;
        }
        
        // Show processing
        document.getElementById('deposit-processing').classList.remove('hidden');
        document.getElementById('deposit-submit-btn').disabled = true;
        
        // Check if user is logged in first
        fetch('/api/user', {
          method: 'GET',
          credentials: 'include'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('You must be logged in to make a deposit');
          }
          return response.json();
        })
        .then(userData => {
          // In a real implementation, this would send the deposit info to a secure API
          // For demo purposes, we'll simulate a successful response
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                amount: amount,
                description: description,
                status: 'pending',
                estimatedArrival: '1-3 business days'
              });
            }, 1500);
          });
        })
        .then(data => {
          // Hide processing
          document.getElementById('deposit-processing').classList.add('hidden');
          
          // Show success message
          document.getElementById('deposit-success').classList.remove('hidden');
          
          // Reset form
          depositForm.reset();
          
          // Disable button
          document.getElementById('deposit-submit-btn').textContent = 'Deposit Initiated';
          
          // Scroll to success message
          document.getElementById('deposit-success').scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
          // Hide processing
          document.getElementById('deposit-processing').classList.add('hidden');
          
          // Show error message
          alert('Error: ' + error.message);
          
          // Re-enable button
          document.getElementById('deposit-submit-btn').disabled = false;
          
          // If not logged in, redirect to login page
          if (error.message.includes('logged in')) {
            setTimeout(function() {
              window.location.href = '/account/login/';
            }, 2000);
          }
        });
      });
    }
    
    // Withdraw form submission
    if (withdrawForm) {
      withdrawForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        document.getElementById('withdraw-amount-error').textContent = '';
        document.getElementById('insufficient-funds').classList.add('hidden');
        
        // Get form data
        const amount = parseFloat(document.getElementById('withdraw-amount').value);
        const description = document.getElementById('withdraw-description').value || 'Withdrawal to bank';
        const selectedAccountId = document.querySelector('input[name="withdraw-account"]:checked')?.value;
        
        // Validate amount
        if (!amount || amount < 10) {
          document.getElementById('withdraw-amount-error').textContent = 'Please enter an amount of at least $10.00';
          return;
        }
        
        // Check account balance
        if (amount > accountBalance) {
          document.getElementById('insufficient-funds').classList.remove('hidden');
          return;
        }
        
        // Validate account selection
        if (!selectedAccountId) {
          alert('Please select a bank account or add a new one');
          return;
        }
        
        // Show processing
        document.getElementById('withdraw-processing').classList.remove('hidden');
        document.getElementById('withdraw-submit-btn').disabled = true;
        
        // Check if user is logged in first
        fetch('/api/user', {
          method: 'GET',
          credentials: 'include'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('You must be logged in to make a withdrawal');
          }
          return response.json();
        })
        .then(userData => {
          // In a real implementation, this would send the withdrawal info to a secure API
          // For demo purposes, we'll simulate a successful response
          return new Promise((resolve) => {
            setTimeout(() => {
              // Update account balance
              accountBalance -= amount;
              
              resolve({
                amount: amount,
                description: description,
                status: 'pending',
                estimatedArrival: '1-3 business days'
              });
            }, 1500);
          });
        })
        .then(data => {
          // Hide processing
          document.getElementById('withdraw-processing').classList.add('hidden');
          
          // Show success message
          document.getElementById('withdraw-success').classList.remove('hidden');
          
          // Update displayed balance
          document.getElementById('available-balance').textContent = formatCurrency(accountBalance);
          
          // Reset form
          withdrawForm.reset();
          
          // Disable button
          document.getElementById('withdraw-submit-btn').textContent = 'Withdrawal Initiated';
          
          // Scroll to success message
          document.getElementById('withdraw-success').scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
          // Hide processing
          document.getElementById('withdraw-processing').classList.add('hidden');
          
          // Show error message
          alert('Error: ' + error.message);
          
          // Re-enable button
          document.getElementById('withdraw-submit-btn').disabled = false;
          
          // If not logged in, redirect to login page
          if (error.message.includes('logged in')) {
            setTimeout(function() {
              window.location.href = '/account/login/';
            }, 2000);
          }
        });
      });
    }
    
    // Initialize the page
    init();
  });
</script>
{{< /rawhtml >}}