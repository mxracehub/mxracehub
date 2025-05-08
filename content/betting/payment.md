---
title: "Payment & Betting"
description: "Place bets on upcoming races and manage your payments"
---

<div class="payment-page">
  <div class="payment-header">
    <h1>Payment & Betting</h1>
    <p class="subtitle">Securely place bets on your favorite riders and races</p>
  </div>
  
  <div class="payment-options">
    <div class="option-header">
      <h2>Select Payment Method</h2>
      <p>Choose your preferred payment option to fund your betting account</p>
    </div>
    
    <div class="payment-methods">
      <div class="payment-method" id="credit-card">
        <div class="method-header">
          <h3>Credit Card</h3>
          <div class="method-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cc-icon">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          </div>
        </div>
        <p>Fast and secure payment using major credit cards</p>
        <button class="select-method" data-method="cc">Select</button>
      </div>
      
      <div class="payment-method" id="paypal">
        <div class="method-header">
          <h3>PayPal</h3>
          <div class="method-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="paypal-icon">
              <path d="M7 11l2 7a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2l3-10a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v3Z" />
              <path d="M10 11h6a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2Z" />
            </svg>
          </div>
        </div>
        <p>Quick and easy with your PayPal account</p>
        <button class="select-method" data-method="paypal">Select</button>
      </div>
      
      <div class="payment-method" id="crypto">
        <div class="method-header">
          <h3>Cryptocurrency</h3>
          <div class="method-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="crypto-icon">
              <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
            </svg>
          </div>
        </div>
        <p>Pay with Bitcoin, Ethereum, or other cryptocurrencies</p>
        <button class="select-method" data-method="crypto">Select</button>
      </div>
    </div>
  </div>
  
  <div id="payment-form-container" class="payment-form-container hidden">
    <h2>Complete Your Payment</h2>
    
    <!-- Credit Card Form (hidden by default) -->
    <div id="cc-form" class="payment-form hidden">
      <div class="form-group">
        <label for="name">Name on Card</label>
        <input type="text" id="name" name="name" placeholder="John Smith" required>
        <div id="name-error" class="error-message"></div>
      </div>
      
      <div class="form-group">
        <label for="card-number">Card Number</label>
        <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012 3456" required maxlength="19">
        <div id="card-number-error" class="error-message"></div>
      </div>
      
      <div class="form-row">
        <div class="form-group half">
          <label for="expiry">Expiration Date</label>
          <input type="text" id="expiry" name="expiry" placeholder="MM/YY" required maxlength="5">
          <div id="expiry-error" class="error-message"></div>
        </div>
        
        <div class="form-group half">
          <label for="cvv">CVV</label>
          <input type="text" id="cvv" name="cvv" placeholder="123" required maxlength="4">
          <div id="cvv-error" class="error-message"></div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="amount">Deposit Amount ($)</label>
        <input type="number" id="amount" name="amount" placeholder="100.00" min="10" step="5" required>
        <div id="amount-error" class="error-message"></div>
        <div class="hint-text">Minimum deposit: $10.00</div>
      </div>
      
      <div id="cc-processing" class="processing-indicator hidden">
        <div class="spinner"></div>
        <span>Processing payment, please wait...</span>
      </div>
      
      <div id="cc-success" class="success-message hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Payment successful! Your account has been credited.</span>
      </div>
      
      <button id="cc-submit" class="submit-btn">Complete Payment</button>
    </div>
    
    <!-- PayPal Form (hidden by default) -->
    <div id="paypal-form" class="payment-form hidden">
      <div class="form-group">
        <label for="pp-amount">Deposit Amount ($)</label>
        <input type="number" id="pp-amount" name="pp-amount" placeholder="100.00" min="10" step="5" required>
        <div id="pp-amount-error" class="error-message"></div>
        <div class="hint-text">Minimum deposit: $10.00</div>
      </div>
      
      <p>You will be redirected to PayPal to complete your payment.</p>
      
      <div id="paypal-processing" class="processing-indicator hidden">
        <div class="spinner"></div>
        <span>Preparing PayPal checkout...</span>
      </div>
      
      <div id="paypal-success" class="success-message hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>PayPal payment completed! Your account has been credited.</span>
      </div>
      
      <button id="paypal-submit" class="submit-btn">Continue to PayPal</button>
    </div>
    
    <!-- Crypto Form (hidden by default) -->
    <div id="crypto-form" class="payment-form hidden">
      <div class="form-group">
        <label for="crypto-currency">Select Cryptocurrency</label>
        <select id="crypto-currency" name="crypto-currency" required>
          <option value="btc">Bitcoin (BTC)</option>
          <option value="eth">Ethereum (ETH)</option>
          <option value="sol">Solana (SOL)</option>
          <option value="usdc">USD Coin (USDC)</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="crypto-amount">Deposit Amount ($)</label>
        <input type="number" id="crypto-amount" name="crypto-amount" placeholder="100.00" min="10" step="5" required>
        <div id="crypto-amount-error" class="error-message"></div>
        <div class="hint-text">Minimum deposit: $10.00</div>
      </div>
      
      <div class="crypto-info">
        <p>Equivalent amount: <span id="crypto-equivalent">0.00345 BTC</span></p>
        <p>You will receive wallet address details after confirming.</p>
      </div>
      
      <div id="crypto-processing" class="processing-indicator hidden">
        <div class="spinner"></div>
        <span>Generating payment address...</span>
      </div>
      
      <div id="crypto-success" class="success-message hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Address generated! Send your crypto to the address below.</span>
      </div>
      
      <div id="crypto-address-container" class="crypto-address-container hidden">
        <label>Send payment to this address:</label>
        <div class="crypto-address">
          <code id="crypto-address">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</code>
          <button id="copy-address" class="copy-btn" title="Copy to clipboard">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
        <div class="qr-code-container">
          <div class="qr-code"></div>
          <p class="crypto-note">Scan this QR code with your wallet app, or copy the address above.</p>
        </div>
      </div>
      
      <button id="crypto-submit" class="submit-btn">Generate Payment Address</button>
    </div>
  </div>
  
  <div class="betting-portal">
    <h2>Place Your Bets</h2>
    <p>Once your payment is processed, you can place bets on upcoming races.</p>
    
    <div class="upcoming-races">
      <h3>Upcoming Races</h3>
      
      <div class="race-cards">
        <div class="race-card">
          <div class="race-card-header">
            <h4>Anaheim 2</h4>
            <div class="race-date">January 27, 2024</div>
          </div>
          <div class="race-track">Angel Stadium, Anaheim, CA</div>
          <div class="bet-types">
            <button class="bet-type">Race Winner</button>
            <button class="bet-type">Podium Finish</button>
            <button class="bet-type">Head-to-Head</button>
          </div>
        </div>
        
        <div class="race-card">
          <div class="race-card-header">
            <h4>Detroit</h4>
            <div class="race-date">February 3, 2024</div>
          </div>
          <div class="race-track">Ford Field, Detroit, MI</div>
          <div class="bet-types">
            <button class="bet-type">Race Winner</button>
            <button class="bet-type">Podium Finish</button>
            <button class="bet-type">Head-to-Head</button>
          </div>
        </div>
        
        <div class="race-card">
          <div class="race-card-header">
            <h4>Glendale</h4>
            <div class="race-date">February 10, 2024</div>
          </div>
          <div class="race-track">State Farm Stadium, Glendale, AZ</div>
          <div class="bet-types">
            <button class="bet-type">Race Winner</button>
            <button class="bet-type">Podium Finish</button>
            <button class="bet-type">Head-to-Head</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="betting-groups">
      <h3>Your Betting Groups</h3>
      <p>Join or create betting groups to compete with friends.</p>
      
      <div class="group-actions">
        <button class="create-group">Create New Group</button>
        <button class="join-group">Join Existing Group</button>
      </div>
      
      <div class="group-cards">
        <div class="group-card">
          <h4 class="group-name">Moto Maniacs</h4>
          <div class="group-members">12 members</div>
          <div class="group-balance">Your balance: $230</div>
          <button class="view-group">View Group</button>
        </div>
        
        <div class="group-card">
          <h4 class="group-name">Factory Fans</h4>
          <div class="group-members">8 members</div>
          <div class="group-balance">Your balance: $115</div>
          <button class="view-group">View Group</button>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Method selection
    const methodButtons = document.querySelectorAll('.select-method');
    const formContainer = document.getElementById('payment-form-container');
    const ccForm = document.getElementById('cc-form');
    const paypalForm = document.getElementById('paypal-form');
    const cryptoForm = document.getElementById('crypto-form');
    
    methodButtons.forEach(button => {
      button.addEventListener('click', function() {
        const method = this.getAttribute('data-method');
        
        formContainer.classList.remove('hidden');
        
        // Hide all forms first
        ccForm.classList.add('hidden');
        paypalForm.classList.add('hidden');
        cryptoForm.classList.add('hidden');
        
        // Show selected form
        if (method === 'cc') {
          ccForm.classList.remove('hidden');
        } else if (method === 'paypal') {
          paypalForm.classList.remove('hidden');
        } else if (method === 'crypto') {
          cryptoForm.classList.remove('hidden');
        }
        
        // Scroll to form
        formContainer.scrollIntoView({ behavior: 'smooth' });
      });
    });
    
    // Crypto amount calculation (simplified for demonstration)
    const cryptoAmount = document.getElementById('crypto-amount');
    const cryptoEquivalent = document.getElementById('crypto-equivalent');
    const cryptoCurrency = document.getElementById('crypto-currency');
    
    function updateCryptoEquivalent() {
      const amount = parseFloat(cryptoAmount.value) || 0;
      const currency = cryptoCurrency.value;
      
      let rate;
      switch(currency) {
        case 'btc':
          rate = 0.000034;
          break;
        case 'eth':
          rate = 0.00052;
          break;
        case 'sol':
          rate = 0.011;
          break;
        case 'usdc':
          rate = 1;
          break;
        default:
          rate = 0.000034;
      }
      
      const equivalent = (amount * rate).toFixed(6);
      cryptoEquivalent.textContent = `${equivalent} ${currency.toUpperCase()}`;
    }
    
    cryptoAmount.addEventListener('input', updateCryptoEquivalent);
    cryptoCurrency.addEventListener('change', updateCryptoEquivalent);
    
    // Credit Card Form Validation & Submission
    const ccSubmitBtn = document.getElementById('cc-submit');
    const ccNameInput = document.getElementById('name');
    const ccNumberInput = document.getElementById('card-number');
    const ccExpiryInput = document.getElementById('expiry');
    const ccCvvInput = document.getElementById('cvv');
    const ccAmountInput = document.getElementById('amount');
    
    // Format card number with spaces
    if (ccNumberInput) {
      ccNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '');
        
        // Add space after every 4 digits
        if (value.length > 0) {
          value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        
        e.target.value = value;
      });
    }
    
    // Format expiry as MM/YY
    if (ccExpiryInput) {
      ccExpiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 2) {
          value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        e.target.value = value;
      });
    }
    
    // Credit card validation
    function validateCreditCardForm() {
      let isValid = true;
      
      // Reset errors
      document.getElementById('name-error').textContent = '';
      document.getElementById('card-number-error').textContent = '';
      document.getElementById('expiry-error').textContent = '';
      document.getElementById('cvv-error').textContent = '';
      document.getElementById('amount-error').textContent = '';
      
      // Validate name
      if (!ccNameInput.value.trim()) {
        document.getElementById('name-error').textContent = 'Please enter the name on card';
        isValid = false;
      }
      
      // Validate card number (simplified)
      const cardNumber = ccNumberInput.value.replace(/\s+/g, '');
      if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
        document.getElementById('card-number-error').textContent = 'Please enter a valid card number';
        isValid = false;
      }
      
      // Validate expiry
      const expiry = ccExpiryInput.value;
      if (!expiry || !expiry.includes('/') || expiry.length !== 5) {
        document.getElementById('expiry-error').textContent = 'Please enter a valid expiry date (MM/YY)';
        isValid = false;
      } else {
        const [month, year] = expiry.split('/');
        const currentYear = new Date().getFullYear() % 100; // Get last 2 digits
        const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
        
        if (parseInt(month) < 1 || parseInt(month) > 12) {
          document.getElementById('expiry-error').textContent = 'Invalid month';
          isValid = false;
        } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
          document.getElementById('expiry-error').textContent = 'Card has expired';
          isValid = false;
        }
      }
      
      // Validate CVV
      const cvv = ccCvvInput.value;
      if (!cvv || cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)) {
        document.getElementById('cvv-error').textContent = 'Please enter a valid CVV';
        isValid = false;
      }
      
      // Validate amount
      const amount = parseFloat(ccAmountInput.value);
      if (!amount || amount < 10) {
        document.getElementById('amount-error').textContent = 'Please enter an amount of at least $10.00';
        isValid = false;
      }
      
      return isValid;
    }
    
    // Credit card submission
    if (ccSubmitBtn) {
      ccSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateCreditCardForm()) {
          // Show processing indicator
          document.getElementById('cc-processing').classList.remove('hidden');
          ccSubmitBtn.disabled = true;
          
          // Get form data
          const name = document.getElementById('name').value;
          const cardNumber = document.getElementById('card-number').value.replace(/\s+/g, '');
          const expiry = document.getElementById('expiry').value;
          const cvv = document.getElementById('cvv').value;
          const amount = parseFloat(document.getElementById('amount').value);
          
          // Check if user is logged in first
          fetch('/api/user', {
            method: 'GET',
            credentials: 'include'
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('You must be logged in to make a payment');
            }
            return response.json();
          })
          .then(userData => {
            // User is logged in, process payment
            // In a real implementation, this would send the payment info to a secure API
            // For demo purposes, we'll simulate a successful payment
            
            // Simulate API call with timeout
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1500);
            }).then(() => {
              // After successful payment, update user's balance
              return fetch('/api/wallet/deposit', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  amount: amount,
                  method: 'credit_card',
                  description: 'Credit card deposit'
                }),
                credentials: 'include'
              });
            });
          })
          .then(response => {
            if (response && !response.ok) {
              throw new Error('Failed to update account balance');
            }
            return response ? response.json() : null;
          })
          .then(data => {
            // Hide processing indicator
            document.getElementById('cc-processing').classList.add('hidden');
            
            // Show success message
            document.getElementById('cc-success').classList.remove('hidden');
            
            // Reset form
            document.getElementById('cc-form').reset();
            
            // Disable button to prevent double submission
            ccSubmitBtn.textContent = 'Payment Completed';
            
            // Scroll to success message
            document.getElementById('cc-success').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Refresh page after delay to show updated balance
            setTimeout(function() {
              window.location.href = '/account/wallet/';
            }, 3000);
          })
          .catch(error => {
            // Hide processing indicator
            document.getElementById('cc-processing').classList.add('hidden');
            
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = `
              <div class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>${error.message}</span>
              </div>
            `;
            
            document.getElementById('cc-form').prepend(errorMessage);
            
            // If not logged in, redirect to login page after a delay
            if (error.message.includes('logged in')) {
              setTimeout(function() {
                window.location.href = '/account/login/';
              }, 2000);
            }
            
            // Re-enable button
            ccSubmitBtn.disabled = false;
          });
        }
      });
    }
    
    // PayPal form validation and submission
    const paypalSubmitBtn = document.getElementById('paypal-submit');
    const paypalAmountInput = document.getElementById('pp-amount');
    
    if (paypalSubmitBtn) {
      paypalSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate amount
        const amount = parseFloat(paypalAmountInput.value);
        if (!amount || amount < 10) {
          document.getElementById('pp-amount-error').textContent = 'Please enter an amount of at least $10.00';
          return;
        }
        
        // Reset error
        document.getElementById('pp-amount-error').textContent = '';
        
        // Show processing
        document.getElementById('paypal-processing').classList.remove('hidden');
        paypalSubmitBtn.disabled = true;
        
        // Check if user is logged in first
        fetch('/api/user', {
          method: 'GET',
          credentials: 'include'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('You must be logged in to make a payment');
          }
          return response.json();
        })
        .then(userData => {
          // User is logged in, redirect to PayPal
          // In a real implementation, this would redirect to PayPal checkout
          
          // Simulate API call with timeout
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1500);
          }).then(() => {
            // After successful payment, update user's balance
            return fetch('/api/wallet/deposit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: amount,
                method: 'paypal',
                description: 'PayPal deposit'
              }),
              credentials: 'include'
            });
          });
        })
        .then(response => {
          if (response && !response.ok) {
            throw new Error('Failed to update account balance');
          }
          return response ? response.json() : null;
        })
        .then(data => {
          // Hide processing
          document.getElementById('paypal-processing').classList.add('hidden');
          
          // Show success
          document.getElementById('paypal-success').classList.remove('hidden');
          
          // Reset form
          paypalAmountInput.value = '';
          
          // Disable button
          paypalSubmitBtn.textContent = 'Payment Completed';
          
          // Scroll to success
          document.getElementById('paypal-success').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
          // Redirect to wallet page after a delay
          setTimeout(function() {
            window.location.href = '/account/wallet/';
          }, 3000);
        })
        .catch(error => {
          // Hide processing
          document.getElementById('paypal-processing').classList.add('hidden');
          
          // Show error message
          const errorMessage = document.createElement('div');
          errorMessage.className = 'error-message';
          errorMessage.innerHTML = `
            <div class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>${error.message}</span>
            </div>
          `;
          
          document.getElementById('paypal-form').prepend(errorMessage);
          
          // If not logged in, redirect to login page after a delay
          if (error.message.includes('logged in')) {
            setTimeout(function() {
              window.location.href = '/account/login/';
            }, 2000);
          }
          
          // Re-enable button
          paypalSubmitBtn.disabled = false;
          paypalSubmitBtn.textContent = 'Continue to PayPal';
        });
      });
    }
    
    // Crypto form submission
    const cryptoSubmitBtn = document.getElementById('crypto-submit');
    const cryptoAddress = document.getElementById('crypto-address');
    const copyAddressBtn = document.getElementById('copy-address');
    const cryptoAddressContainer = document.getElementById('crypto-address-container');
    
    if (cryptoSubmitBtn) {
      cryptoSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate amount
        const amount = parseFloat(cryptoAmount.value);
        if (!amount || amount < 10) {
          document.getElementById('crypto-amount-error').textContent = 'Please enter an amount of at least $10.00';
          return;
        }
        
        // Reset error
        document.getElementById('crypto-amount-error').textContent = '';
        
        // Show processing
        document.getElementById('crypto-processing').classList.remove('hidden');
        cryptoSubmitBtn.disabled = true;
        
        // Check if user is logged in first
        fetch('/api/user', {
          method: 'GET',
          credentials: 'include'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('You must be logged in to make a payment');
          }
          return response.json();
        })
        .then(userData => {
          // User is logged in, generate crypto address
          const currency = cryptoCurrency.value;
          let address = '';
          
          // In a real implementation, this would call an API to generate a unique crypto address
          // For demo purposes, we'll generate a random address
          switch(currency) {
            case 'btc':
              address = 'bc1q' + generateRandomString(38);
              break;
            case 'eth':
              address = '0x' + generateRandomString(40);
              break;
            case 'sol':
              address = generateRandomString(43);
              break;
            case 'usdc':
              address = '0x' + generateRandomString(40);
              break;
            default:
              address = 'bc1q' + generateRandomString(38);
          }
          
          // In a real implementation, the deposit would be tracked by the backend
          // and the user's balance would be updated when the payment is confirmed
          // For demo purposes, we'll create a pending deposit
          return fetch('/api/wallet/crypto-deposit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: amount,
              currency: currency,
              address: address,
              status: 'pending'
            }),
            credentials: 'include'
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to create deposit request');
            }
            return { address, currency };
          });
        })
        .then(data => {
          // Hide processing
          document.getElementById('crypto-processing').classList.add('hidden');
          
          // Show success
          document.getElementById('crypto-success').classList.remove('hidden');
          
          // Show address
          cryptoAddressContainer.classList.remove('hidden');
          cryptoAddress.textContent = data.address;
          
          // Add QR code (in a real implementation, this would be a generated QR code)
          const qrCodeContainer = document.querySelector('.qr-code');
          if (qrCodeContainer) {
            qrCodeContainer.innerHTML = `
              <div style="background-color: white; padding: 1rem; border-radius: 8px;">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
                  <rect x="10" y="10" width="80" height="80" fill="none" stroke="black" stroke-width="2"/>
                  <text x="50" y="55" text-anchor="middle" font-size="8" font-family="monospace">QR Code for</text>
                  <text x="50" y="65" text-anchor="middle" font-size="8" font-family="monospace">${data.currency.toUpperCase()}</text>
                </svg>
              </div>
            `;
          }
          
          // Hide generate button
          cryptoSubmitBtn.classList.add('hidden');
          
          // Scroll to address
          cryptoAddressContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Create a button to simulate payment confirmation
          const confirmBtn = document.createElement('button');
          confirmBtn.className = 'submit-btn mt-6';
          confirmBtn.textContent = 'Simulate Payment Confirmation';
          confirmBtn.onclick = function() {
            // In a real implementation, this would be triggered by a webhook from the crypto payment provider
            fetch('/api/wallet/confirm-deposit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: amount,
                method: 'crypto',
                currency: data.currency,
                description: `${data.currency.toUpperCase()} deposit`
              }),
              credentials: 'include'
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to confirm deposit');
              }
              return response.json();
            })
            .then(() => {
              // Redirect to wallet page
              window.location.href = '/account/wallet/';
            })
            .catch(error => {
              alert('Error confirming payment: ' + error.message);
            });
          };
          
          // Add the button to the page
          cryptoAddressContainer.appendChild(confirmBtn);
        })
        .catch(error => {
          // Hide processing
          document.getElementById('crypto-processing').classList.add('hidden');
          
          // Show error message
          const errorMessage = document.createElement('div');
          errorMessage.className = 'error-message';
          errorMessage.innerHTML = `
            <div class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>${error.message}</span>
            </div>
          `;
          
          document.getElementById('crypto-form').prepend(errorMessage);
          
          // If not logged in, redirect to login page after a delay
          if (error.message.includes('logged in')) {
            setTimeout(function() {
              window.location.href = '/account/login/';
            }, 2000);
          }
          
          // Re-enable button
          cryptoSubmitBtn.disabled = false;
        });
      });
    }
    
    // Copy crypto address
    if (copyAddressBtn) {
      copyAddressBtn.addEventListener('click', function() {
        const address = cryptoAddress.textContent;
        navigator.clipboard.writeText(address).then(function() {
          // Show copied confirmation
          const originalText = copyAddressBtn.innerHTML;
          copyAddressBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          copyAddressBtn.style.backgroundColor = '#68d391';
          copyAddressBtn.style.color = 'white';
          
          setTimeout(function() {
            copyAddressBtn.innerHTML = originalText;
            copyAddressBtn.style.backgroundColor = '';
            copyAddressBtn.style.color = '';
          }, 2000);
        });
      });
    }
    
    // Generate random string for addresses
    function generateRandomString(length) {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }
  });
</script>

<style>
  .payment-page {
    max-width: 1200px;
    margin: 0 auto;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .payment-header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .subtitle {
    color: #666;
    font-size: 1.2rem;
  }
  
  .payment-options {
    margin-bottom: 3rem;
  }
  
  .option-header {
    margin-bottom: 1.5rem;
  }
  
  .payment-methods {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .payment-method {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .payment-method:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  }
  
  .method-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .method-logo {
    background-color: #eee;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .payment-method p {
    margin-bottom: 1.5rem;
    color: #666;
  }
  
  .select-method {
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
  }
  
  .select-method:hover {
    background-color: #0052a3;
  }
  
  .payment-form-container {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 2rem;
    margin-bottom: 3rem;
  }
  
  .payment-form {
    margin-top: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-row {
    display: flex;
    gap: 1rem;
  }
  
  .half {
    flex: 1;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .submit-btn {
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
    margin-top: 1rem;
  }
  
  .submit-btn:hover {
    background-color: #0052a3;
  }
  
  .hint-text {
    font-size: 0.85rem;
    color: #666;
    margin-top: 0.25rem;
  }
  
  .error-message {
    font-size: 0.85rem;
    color: #e53e3e;
    margin-top: 0.25rem;
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
  
  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid #e2e8f0;
    border-top-color: #0ea5e9;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
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
  
  .crypto-info {
    background-color: #e8f4ff;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  
  .crypto-info p {
    margin: 0.5rem 0;
  }
  
  .crypto-address-container {
    margin: 1.5rem 0;
    padding: 1rem;
    background-color: #f7fafc;
    border: 1px solid #edf2f7;
    border-radius: 4px;
  }
  
  .crypto-address {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #edf2f7;
    border-radius: 4px;
    padding: 0.75rem;
    margin: 0.5rem 0 1rem;
    position: relative;
  }
  
  .crypto-address code {
    font-family: monospace;
    font-size: 0.9rem;
    word-break: break-all;
    flex-grow: 1;
  }
  
  .copy-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border-radius: 4px;
    color: #4a5568;
    transition: all 0.2s;
  }
  
  .copy-btn:hover {
    background-color: #e2e8f0;
    color: #1a202c;
  }
  
  .qr-code-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }
  
  .qr-code {
    width: 200px;
    height: 200px;
    background-color: #fff;
    border: 1px solid #e2e8f0;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .qr-code::before {
    content: 'QR Code';
    position: absolute;
    color: #a0aec0;
    font-size: 0.9rem;
  }
  
  .crypto-note {
    font-size: 0.85rem;
    color: #4a5568;
    text-align: center;
    max-width: 250px;
  }
  
  .betting-portal {
    margin-top: 3rem;
  }
  
  .race-cards, .group-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .race-card, .group-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  .race-card-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;
  }
  
  .race-card-header h4 {
    margin: 0;
  }
  
  .race-date, .race-track {
    color: #666;
    margin-bottom: 1rem;
  }
  
  .bet-types {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .bet-type {
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .bet-type:hover {
    background-color: #0052a3;
  }
  
  .group-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .create-group, .join-group, .view-group {
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .view-group {
    width: 100%;
    margin-top: 1rem;
  }
  
  .create-group:hover, .join-group:hover, .view-group:hover {
    background-color: #0052a3;
  }
  
  .group-name {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  .group-members, .group-balance {
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  .hidden {
    display: none;
  }
</style>