---
title: "Membership"
description: "Manage your MXRaceHub membership"
layout: "single"
---

{{< rawhtml >}}
<div class="membership-container">
  <div class="membership-header">
    <h1 class="text-3xl font-bold mb-2">Membership</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">Join our premium membership to unlock exclusive benefits</p>
  </div>

  <div class="membership-content">
    <div class="membership-plan-container" id="current-plan-container">
      <!-- This will be dynamically populated with the current membership status -->
      <!-- Loading state -->
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Loading membership information...</p>
      </div>
    </div>

    <div class="membership-plans">
      <h2 class="text-xl font-semibold mb-4">Available Plans</h2>
      
      <div class="plans-grid">
        <div class="plan-card">
          <div class="plan-header">
            <h3 class="plan-name">Monthly Premium</h3>
            <div class="plan-badge">Popular</div>
          </div>
          <div class="plan-price">
            <span class="price">$5</span>
            <span class="period">/ month</span>
          </div>
          <div class="plan-features">
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>No betting fees (1% fee waived)</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Early access to race odds</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Exclusive rider interviews</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Priority customer support</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Create unlimited betting groups</span>
            </div>
          </div>
          <button class="select-plan-btn" data-plan="monthly" data-amount="5" data-name="Monthly Premium">Select Plan</button>
        </div>
        
        <div class="plan-card best-value">
          <div class="plan-header">
            <h3 class="plan-name">Annual Premium</h3>
            <div class="plan-badge">Best Value</div>
          </div>
          <div class="plan-price">
            <span class="price">$50</span>
            <span class="period">/ year</span>
          </div>
          <div class="plan-features">
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>No betting fees (1% fee waived)</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Early access to race odds</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Exclusive rider interviews</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Priority customer support</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Create unlimited betting groups</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Save 17% compared to monthly</span>
            </div>
          </div>
          <button class="select-plan-btn" data-plan="annual" data-amount="50" data-name="Annual Premium">Select Plan</button>
        </div>
        
        <div class="plan-card">
          <div class="plan-header">
            <h3 class="plan-name">Free Plan</h3>
            <div class="plan-badge">Basic</div>
          </div>
          <div class="plan-price">
            <span class="price">$0</span>
            <span class="period">/ forever</span>
          </div>
          <div class="plan-features">
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Access to races and riders</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Basic betting features</span>
            </div>
            <div class="feature-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Join betting groups</span>
            </div>
            <div class="feature-item feature-na">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="na-icon">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span>1% betting fee on all bets</span>
            </div>
            <div class="feature-item feature-na">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="na-icon">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span>Exclusive premium content</span>
            </div>
          </div>
          <button class="current-plan-btn" disabled>Current Plan</button>
        </div>
      </div>
    </div>
    
    <!-- Payment Form -->
    <div id="membership-payment-container" class="membership-payment-container hidden">
      <h2 class="text-xl font-semibold mb-4">Payment Information</h2>
      
      <div class="payment-method-tabs">
        <button class="tab-btn active" data-tab="credit-card">Credit Card</button>
        <button class="tab-btn" data-tab="paypal">PayPal</button>
        <button class="tab-btn" data-tab="account-balance">Account Balance</button>
      </div>
      
      <div class="tab-content">
        <!-- Credit Card Tab -->
        <div id="credit-card-tab" class="tab-pane active">
          <form id="cc-payment-form" class="payment-form">
            <div class="form-row">
              <div class="form-group">
                <label for="cc-name">Name on Card</label>
                <input type="text" id="cc-name" name="cc-name" required>
                <div class="error-message" id="cc-name-error"></div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="cc-number">Card Number</label>
              <input type="text" id="cc-number" name="cc-number" placeholder="1234 5678 9012 3456" required maxlength="19">
              <div class="error-message" id="cc-number-error"></div>
            </div>
            
            <div class="form-row">
              <div class="form-group half">
                <label for="cc-expiry">Expiration Date</label>
                <input type="text" id="cc-expiry" name="cc-expiry" placeholder="MM/YY" required maxlength="5">
                <div class="error-message" id="cc-expiry-error"></div>
              </div>
              
              <div class="form-group half">
                <label for="cc-cvv">CVV</label>
                <input type="text" id="cc-cvv" name="cc-cvv" placeholder="123" required maxlength="4">
                <div class="error-message" id="cc-cvv-error"></div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="cc-billing-address">Billing Address</label>
              <input type="text" id="cc-billing-address" name="cc-billing-address" required>
              <div class="error-message" id="cc-billing-address-error"></div>
            </div>
            
            <div class="form-row">
              <div class="form-group half">
                <label for="cc-city">City</label>
                <input type="text" id="cc-city" name="cc-city" required>
                <div class="error-message" id="cc-city-error"></div>
              </div>
              
              <div class="form-group quarter">
                <label for="cc-state">State</label>
                <input type="text" id="cc-state" name="cc-state" required>
                <div class="error-message" id="cc-state-error"></div>
              </div>
              
              <div class="form-group quarter">
                <label for="cc-zip">Zip Code</label>
                <input type="text" id="cc-zip" name="cc-zip" required>
                <div class="error-message" id="cc-zip-error"></div>
              </div>
            </div>
            
            <div class="form-group">
              <div class="save-card-container">
                <input type="checkbox" id="save-card" name="save-card">
                <label for="save-card">Save card for future payments</label>
              </div>
            </div>
            
            <div class="order-summary">
              <h3>Order Summary</h3>
              <div class="order-item">
                <span class="item-name" id="plan-name-display">Premium Membership - Monthly</span>
                <span class="item-price" id="plan-price-display">$5.00</span>
              </div>
              <div class="order-total">
                <span>Total</span>
                <span id="plan-total-display">$5.00</span>
              </div>
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
              <span>Payment successful! Your membership has been activated.</span>
            </div>
            
            <div class="form-actions">
              <button type="button" class="cancel-btn" id="cc-cancel">Cancel</button>
              <button type="submit" class="submit-btn" id="cc-submit-btn">Complete Payment</button>
            </div>
          </form>
        </div>
        
        <!-- PayPal Tab -->
        <div id="paypal-tab" class="tab-pane">
          <div class="paypal-info">
            <p>You will be redirected to PayPal to complete your payment.</p>
            
            <div class="order-summary">
              <h3>Order Summary</h3>
              <div class="order-item">
                <span class="item-name" id="pp-plan-name-display">Premium Membership - Monthly</span>
                <span class="item-price" id="pp-plan-price-display">$5.00</span>
              </div>
              <div class="order-total">
                <span>Total</span>
                <span id="pp-plan-total-display">$5.00</span>
              </div>
            </div>
            
            <div id="paypal-processing" class="processing-indicator hidden">
              <div class="spinner"></div>
              <span>Preparing PayPal checkout...</span>
            </div>
            
            <div id="paypal-success" class="success-message hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Payment successful! Your membership has been activated.</span>
            </div>
            
            <div class="paypal-actions">
              <button type="button" class="cancel-btn" id="paypal-cancel">Cancel</button>
              <button type="button" class="submit-btn" id="paypal-submit-btn">Proceed to PayPal</button>
            </div>
          </div>
        </div>
        
        <!-- Account Balance Tab -->
        <div id="account-balance-tab" class="tab-pane">
          <div class="balance-info">
            <div class="balance-display">
              <span>Current Balance:</span>
              <span id="account-balance-display">$0.00</span>
            </div>
            
            <div class="insufficient-funds-message hidden" id="insufficient-funds">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>You don't have enough funds in your account balance. Please add funds or choose another payment method.</span>
            </div>
            
            <div class="order-summary">
              <h3>Order Summary</h3>
              <div class="order-item">
                <span class="item-name" id="bal-plan-name-display">Premium Membership - Monthly</span>
                <span class="item-price" id="bal-plan-price-display">$5.00</span>
              </div>
              <div class="order-total">
                <span>Total</span>
                <span id="bal-plan-total-display">$5.00</span>
              </div>
            </div>
            
            <div id="balance-processing" class="processing-indicator hidden">
              <div class="spinner"></div>
              <span>Processing payment, please wait...</span>
            </div>
            
            <div id="balance-success" class="success-message hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Payment successful! Your membership has been activated.</span>
            </div>
            
            <div class="balance-actions">
              <button type="button" class="cancel-btn" id="balance-cancel">Cancel</button>
              <button type="button" class="submit-btn" id="balance-submit-btn">Pay from Balance</button>
              <a href="/account/wallet/" class="add-funds-link">Add Funds</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="membership-benefits">
      <h2 class="text-xl font-semibold mb-4">Premium Membership Benefits</h2>
      
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h3 class="benefit-title">Real-time Race Updates</h3>
          <p class="benefit-description">Get immediate notifications for race starts, finishes, and standings.</p>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          </div>
          <h3 class="benefit-title">No Betting Fees</h3>
          <p class="benefit-description">Save 1% on all your bets, which adds up to significant savings over time.</p>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </div>
          <h3 class="benefit-title">Exclusive Content</h3>
          <p class="benefit-description">Access rider interviews, behind-the-scenes footage, and expert analysis.</p>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <h3 class="benefit-title">Advanced Statistics</h3>
          <p class="benefit-description">Dive deep into rider and team stats to make more informed betting decisions.</p>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3 class="benefit-title">Create Unlimited Groups</h3>
          <p class="benefit-description">Form as many betting groups as you want with friends and fellow fans.</p>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
            </svg>
          </div>
          <h3 class="benefit-title">Priority Support</h3>
          <p class="benefit-description">Get priority customer service with dedicated support representatives.</p>
        </div>
      </div>
      
      <div class="faq-section">
        <h2 class="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        
        <div class="faq-container">
          <div class="faq-item">
            <div class="faq-question">
              <h3>Can I cancel my membership at any time?</h3>
              <button class="faq-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
            <div class="faq-answer">
              <p>Yes, you can cancel your premium membership at any time. If you cancel, you'll continue to have access to premium features until the end of your current billing period.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <h3>How do I get a refund?</h3>
              <button class="faq-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
            <div class="faq-answer">
              <p>Refunds are available within 14 days of your initial membership purchase if you haven't used any premium features. Contact our support team to request a refund.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <h3>Can I upgrade from monthly to annual?</h3>
              <button class="faq-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
            <div class="faq-answer">
              <p>Yes, you can upgrade from monthly to annual at any time. When you upgrade, we'll automatically apply any unused portion of your current monthly subscription to your annual plan.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <h3>What payment methods do you accept?</h3>
              <button class="faq-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
            <div class="faq-answer">
              <p>We accept all major credit cards, PayPal, and you can also pay using your existing account balance. If you have cryptocurrency, you can add funds to your account first and then use your balance to purchase a membership.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .membership-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .membership-header {
    margin-bottom: 2rem;
  }
  
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #0066cc;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .membership-plan-container {
    margin-bottom: 2rem;
  }
  
  .current-plan {
    padding: 1.5rem;
    background-color: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 8px;
    margin-bottom: 2rem;
  }
  
  .current-plan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .current-plan-info h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .current-plan-price {
    font-size: 1.25rem;
    color: #0066cc;
    font-weight: 600;
  }
  
  .current-plan-status {
    font-size: 0.875rem;
    color: #666;
  }
  
  .current-plan-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .action-btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    font-size: 0.875rem;
    transition: all 0.2s;
    cursor: pointer;
  }
  
  .upgrade-btn {
    background-color: #0066cc;
    color: white;
    border: none;
  }
  
  .upgrade-btn:hover {
    background-color: #0052a3;
  }
  
  .cancel-btn {
    background-color: transparent;
    color: #666;
    border: 1px solid #ddd;
  }
  
  .cancel-btn:hover {
    background-color: #f5f5f5;
  }
  
  .plans-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .plan-card {
    padding: 1.5rem;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
  }
  
  .plan-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
  
  .plan-card.best-value {
    border-color: #0066cc;
  }
  
  .plan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .plan-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 20px;
    font-weight: 600;
    background-color: #eee;
  }
  
  .plan-card.best-value .plan-badge {
    background-color: #0066cc;
    color: white;
  }
  
  .plan-name {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }
  
  .plan-price {
    margin: 1rem 0;
  }
  
  .price {
    font-size: 2rem;
    font-weight: 700;
    color: #0066cc;
  }
  
  .period {
    font-size: 1rem;
    color: #666;
  }
  
  .plan-features {
    margin-bottom: 1.5rem;
  }
  
  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .check-icon {
    color: #10b981;
    flex-shrink: 0;
  }
  
  .na-icon {
    color: #ef4444;
    flex-shrink: 0;
  }
  
  .feature-na {
    color: #999;
  }
  
  .select-plan-btn, .current-plan-btn {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s;
    text-align: center;
    cursor: pointer;
  }
  
  .select-plan-btn {
    background-color: #0066cc;
    color: white;
    border: none;
  }
  
  .select-plan-btn:hover {
    background-color: #0052a3;
  }
  
  .current-plan-btn {
    background-color: #eee;
    color: #666;
    border: none;
    cursor: not-allowed;
  }
  
  .membership-payment-container {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .payment-method-tabs {
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
  
  .payment-form {
    margin-bottom: 1.5rem;
  }
  
  .form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .form-group {
    flex: 1;
    min-width: 0;
    margin-bottom: 1rem;
  }
  
  .half {
    flex: 0 0 calc(50% - 0.5rem);
  }
  
  .quarter {
    flex: 0 0 calc(25% - 0.5rem);
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
  
  .save-card-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .save-card-container input[type="checkbox"] {
    width: auto;
  }
  
  .order-summary {
    margin: 1.5rem 0;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  
  .order-summary h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }
  
  .order-total {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
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
  
  .form-actions, .paypal-actions, .balance-actions {
    display: flex;
    justify-content: space-between;
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
    flex-grow: 1;
  }
  
  .submit-btn:hover {
    background-color: #0052a3;
  }
  
  .paypal-info, .balance-info {
    padding: 1rem 0;
  }
  
  .balance-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-weight: 600;
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
  
  .add-funds-link {
    padding: 0.75rem 1.5rem;
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    transition: all 0.2s;
  }
  
  .add-funds-link:hover {
    background-color: #eee;
    text-decoration: none;
  }
  
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .benefit-card {
    padding: 1.5rem;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .benefit-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .benefit-icon {
    color: #0066cc;
    margin-bottom: 1rem;
  }
  
  .benefit-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .benefit-description {
    color: #666;
    font-size: 0.95rem;
  }
  
  .faq-section {
    margin-top: 3rem;
  }
  
  .faq-container {
    border-top: 1px solid #eee;
  }
  
  .faq-item {
    border-bottom: 1px solid #eee;
  }
  
  .faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 0;
    cursor: pointer;
  }
  
  .faq-question h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
  }
  
  .faq-toggle {
    background: none;
    border: none;
    color: #666;
    transition: transform 0.2s;
  }
  
  .faq-item.active .faq-toggle {
    transform: rotate(180deg);
  }
  
  .faq-answer {
    padding: 0 0 1.25rem 0;
    color: #666;
    display: none;
  }
  
  .faq-item.active .faq-answer {
    display: block;
  }
  
  .hidden {
    display: none;
  }
  
  @media (max-width: 768px) {
    .plans-grid, .benefits-grid {
      grid-template-columns: 1fr;
    }
    
    .form-row {
      flex-direction: column;
      gap: 0;
    }
    
    .half, .quarter {
      flex: 1 1 100%;
    }
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Variables
    let selectedPlan = null;
    let selectedPrice = 0;
    let selectedPlanName = '';
    let accountBalance = 250.00; // For demo purposes, this would come from the API
    
    // Get elements
    const planButtons = document.querySelectorAll('.select-plan-btn');
    const currentPlanContainer = document.getElementById('current-plan-container');
    const membershipPaymentContainer = document.getElementById('membership-payment-container');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Form elements
    const ccForm = document.getElementById('cc-payment-form');
    const ccSubmitBtn = document.getElementById('cc-submit-btn');
    const ccCancelBtn = document.getElementById('cc-cancel');
    
    const paypalSubmitBtn = document.getElementById('paypal-submit-btn');
    const paypalCancelBtn = document.getElementById('paypal-cancel');
    
    const balanceSubmitBtn = document.getElementById('balance-submit-btn');
    const balanceCancelBtn = document.getElementById('balance-cancel');
    const insufficientFundsMsg = document.getElementById('insufficient-funds');
    
    // Format currency
    function formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    }
    
    // Load user data and check current membership
    function loadUserData() {
      // In a real implementation, this would fetch from the API
      // For demo purposes, we'll simulate a response
      
      setTimeout(() => {
        // Display account balance
        document.getElementById('account-balance-display').textContent = formatCurrency(accountBalance);
        
        // Check if user has an active membership
        const hasMembership = false; // This would be determined from the API
        
        if (hasMembership) {
          currentPlanContainer.innerHTML = `
            <div class="current-plan">
              <div class="current-plan-header">
                <div class="current-plan-info">
                  <h3>Monthly Premium</h3>
                  <div class="current-plan-status">Active until May 21, 2025</div>
                </div>
                <div class="current-plan-price">$5.00 / month</div>
              </div>
              <p>You're enjoying all premium features with no betting fees.</p>
              <div class="current-plan-actions">
                <button class="action-btn upgrade-btn" data-action="upgrade">Upgrade to Annual</button>
                <button class="action-btn cancel-btn" data-action="cancel">Cancel Membership</button>
              </div>
            </div>
          `;
          
          // Add event listeners to action buttons
          document.querySelector('[data-action="upgrade"]').addEventListener('click', () => {
            selectPlan('annual', 50, 'Annual Premium');
          });
          
          document.querySelector('[data-action="cancel"]').addEventListener('click', () => {
            if (confirm('Are you sure you want to cancel your membership? You will still have access until the end of your current billing period.')) {
              // In a real implementation, this would call the API to cancel
              alert('Your membership has been canceled. You will have access until the end of your current billing period.');
              loadUserData(); // Reload user data
            }
          });
        } else {
          currentPlanContainer.innerHTML = `
            <div class="current-plan">
              <div class="current-plan-header">
                <div class="current-plan-info">
                  <h3>Free Plan</h3>
                  <div class="current-plan-status">Limited features</div>
                </div>
                <div class="current-plan-price">$0.00</div>
              </div>
              <p>You're currently on the free plan. Upgrade to unlock premium features and avoid betting fees.</p>
            </div>
          `;
        }
      }, 1000);
    }
    
    // Initialize the page
    loadUserData();
    
    // Select a membership plan
    function selectPlan(plan, price, name) {
      selectedPlan = plan;
      selectedPrice = price;
      selectedPlanName = name;
      
      // Update all plan displays in the payment tabs
      const planDisplays = [
        document.getElementById('plan-name-display'),
        document.getElementById('pp-plan-name-display'),
        document.getElementById('bal-plan-name-display')
      ];
      
      const priceDisplays = [
        document.getElementById('plan-price-display'),
        document.getElementById('pp-plan-price-display'),
        document.getElementById('bal-plan-price-display')
      ];
      
      const totalDisplays = [
        document.getElementById('plan-total-display'),
        document.getElementById('pp-plan-total-display'),
        document.getElementById('bal-plan-total-display')
      ];
      
      planDisplays.forEach(el => {
        if (el) el.textContent = `Premium Membership - ${name}`;
      });
      
      priceDisplays.forEach(el => {
        if (el) el.textContent = formatCurrency(price);
      });
      
      totalDisplays.forEach(el => {
        if (el) el.textContent = formatCurrency(price);
      });
      
      // Show/hide relevant sections
      membershipPaymentContainer.classList.remove('hidden');
      
      // Check account balance for the balance payment method
      if (accountBalance < price) {
        insufficientFundsMsg.classList.remove('hidden');
        balanceSubmitBtn.disabled = true;
      } else {
        insufficientFundsMsg.classList.add('hidden');
        balanceSubmitBtn.disabled = false;
      }
      
      // Scroll to payment section
      membershipPaymentContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Plan selection event listeners
    planButtons.forEach(button => {
      button.addEventListener('click', function() {
        const plan = this.getAttribute('data-plan');
        const price = parseFloat(this.getAttribute('data-amount'));
        const name = this.getAttribute('data-name');
        selectPlan(plan, price, name);
      });
    });
    
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
    
    // FAQ accordion
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', function() {
        item.classList.toggle('active');
      });
    });
    
    // Credit card form validation & submission
    if (ccForm) {
      // Format credit card number with spaces
      const ccNumberInput = document.getElementById('cc-number');
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
      const ccExpiryInput = document.getElementById('cc-expiry');
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
        document.getElementById('cc-name-error').textContent = '';
        document.getElementById('cc-number-error').textContent = '';
        document.getElementById('cc-expiry-error').textContent = '';
        document.getElementById('cc-cvv-error').textContent = '';
        document.getElementById('cc-billing-address-error').textContent = '';
        document.getElementById('cc-city-error').textContent = '';
        document.getElementById('cc-state-error').textContent = '';
        document.getElementById('cc-zip-error').textContent = '';
        
        // Validate name
        const name = document.getElementById('cc-name').value.trim();
        if (!name) {
          document.getElementById('cc-name-error').textContent = 'Please enter the name on card';
          isValid = false;
        }
        
        // Validate card number (simplified)
        const cardNumber = document.getElementById('cc-number').value.replace(/\s+/g, '');
        if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
          document.getElementById('cc-number-error').textContent = 'Please enter a valid card number';
          isValid = false;
        }
        
        // Validate expiry
        const expiry = document.getElementById('cc-expiry').value;
        if (!expiry || !expiry.includes('/') || expiry.length !== 5) {
          document.getElementById('cc-expiry-error').textContent = 'Please enter a valid expiry date (MM/YY)';
          isValid = false;
        } else {
          const [month, year] = expiry.split('/');
          const currentYear = new Date().getFullYear() % 100; // Get last 2 digits
          const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
          
          if (parseInt(month) < 1 || parseInt(month) > 12) {
            document.getElementById('cc-expiry-error').textContent = 'Invalid month';
            isValid = false;
          } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            document.getElementById('cc-expiry-error').textContent = 'Card has expired';
            isValid = false;
          }
        }
        
        // Validate CVV
        const cvv = document.getElementById('cc-cvv').value;
        if (!cvv || cvv.length < 3 || cvv.length > 4 || !/^\d+$/.test(cvv)) {
          document.getElementById('cc-cvv-error').textContent = 'Please enter a valid CVV';
          isValid = false;
        }
        
        // Validate billing address
        const billingAddress = document.getElementById('cc-billing-address').value.trim();
        if (!billingAddress) {
          document.getElementById('cc-billing-address-error').textContent = 'Please enter your billing address';
          isValid = false;
        }
        
        // Validate city
        const city = document.getElementById('cc-city').value.trim();
        if (!city) {
          document.getElementById('cc-city-error').textContent = 'Please enter your city';
          isValid = false;
        }
        
        // Validate state
        const state = document.getElementById('cc-state').value.trim();
        if (!state) {
          document.getElementById('cc-state-error').textContent = 'Please enter your state';
          isValid = false;
        }
        
        // Validate zip
        const zip = document.getElementById('cc-zip').value.trim();
        if (!zip) {
          document.getElementById('cc-zip-error').textContent = 'Please enter your zip code';
          isValid = false;
        }
        
        return isValid;
      }
      
      // Credit card form submission
      ccForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateCreditCardForm()) {
          // Show processing indicator
          document.getElementById('cc-processing').classList.remove('hidden');
          ccSubmitBtn.disabled = true;
          
          // In a real implementation, this would send the payment info to a secure API
          // For demo purposes, we'll simulate a successful payment
          setTimeout(function() {
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
              // Simulate API call with timeout
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                }, 1500);
              }).then(() => {
                // After successful payment, create membership
                return fetch('/api/membership/create', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    plan: selectedPlan,
                    price: selectedPrice,
                    paymentMethod: 'credit_card'
                  }),
                  credentials: 'include'
                });
              });
            })
            .then(response => {
              if (response && !response.ok) {
                throw new Error('Failed to create membership');
              }
              
              // Hide processing indicator
              document.getElementById('cc-processing').classList.add('hidden');
              
              // Show success message
              document.getElementById('cc-success').classList.remove('hidden');
              
              // Disable button
              ccSubmitBtn.textContent = 'Payment Completed';
              
              // Reload user data after a delay
              setTimeout(function() {
                window.location.href = '/account/settings/#membership-tab';
              }, 3000);
            })
            .catch(error => {
              // Hide processing indicator
              document.getElementById('cc-processing').classList.add('hidden');
              
              // Show error message
              alert('Error: ' + error.message);
              
              // Re-enable button
              ccSubmitBtn.disabled = false;
              
              // If not logged in, redirect to login page
              if (error.message.includes('logged in')) {
                setTimeout(function() {
                  window.location.href = '/account/login/';
                }, 2000);
              }
            });
          }, 1000);
        }
      });
    }
    
    // Cancel buttons
    if (ccCancelBtn) {
      ccCancelBtn.addEventListener('click', function() {
        membershipPaymentContainer.classList.add('hidden');
      });
    }
    
    if (paypalCancelBtn) {
      paypalCancelBtn.addEventListener('click', function() {
        membershipPaymentContainer.classList.add('hidden');
      });
    }
    
    if (balanceCancelBtn) {
      balanceCancelBtn.addEventListener('click', function() {
        membershipPaymentContainer.classList.add('hidden');
      });
    }
    
    // PayPal payment
    if (paypalSubmitBtn) {
      paypalSubmitBtn.addEventListener('click', function() {
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
          // User is logged in, process PayPal payment
          // In a real implementation, this would redirect to PayPal
          
          // Simulate API call with timeout
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1500);
          }).then(() => {
            // After successful payment, create membership
            return fetch('/api/membership/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                plan: selectedPlan,
                price: selectedPrice,
                paymentMethod: 'paypal'
              }),
              credentials: 'include'
            });
          });
        })
        .then(response => {
          if (response && !response.ok) {
            throw new Error('Failed to create membership');
          }
          
          // Hide processing
          document.getElementById('paypal-processing').classList.add('hidden');
          
          // Show success
          document.getElementById('paypal-success').classList.remove('hidden');
          
          // Disable button
          paypalSubmitBtn.textContent = 'Payment Completed';
          
          // Reload user data after a delay
          setTimeout(function() {
            window.location.href = '/account/settings/#membership-tab';
          }, 3000);
        })
        .catch(error => {
          // Hide processing
          document.getElementById('paypal-processing').classList.add('hidden');
          
          // Show error message
          alert('Error: ' + error.message);
          
          // Re-enable button
          paypalSubmitBtn.disabled = false;
          
          // If not logged in, redirect to login page
          if (error.message.includes('logged in')) {
            setTimeout(function() {
              window.location.href = '/account/login/';
            }, 2000);
          }
        });
      });
    }
    
    // Account balance payment
    if (balanceSubmitBtn) {
      balanceSubmitBtn.addEventListener('click', function() {
        // Check if user has sufficient balance
        if (accountBalance < selectedPrice) {
          insufficientFundsMsg.classList.remove('hidden');
          return;
        }
        
        // Show processing
        document.getElementById('balance-processing').classList.remove('hidden');
        balanceSubmitBtn.disabled = true;
        
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
          // User is logged in, process payment from balance
          
          // Simulate API call with timeout
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1500);
          }).then(() => {
            // After successful payment, create membership and deduct from balance
            return fetch('/api/wallet/pay-from-balance', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: selectedPrice,
                description: `Premium Membership - ${selectedPlanName}`
              }),
              credentials: 'include'
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to process payment from balance');
              }
              return response.json();
            })
            .then(data => {
              // Now create the membership
              return fetch('/api/membership/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  plan: selectedPlan,
                  price: selectedPrice,
                  paymentMethod: 'account_balance'
                }),
                credentials: 'include'
              });
            });
          });
        })
        .then(response => {
          if (response && !response.ok) {
            throw new Error('Failed to create membership');
          }
          
          // Hide processing
          document.getElementById('balance-processing').classList.add('hidden');
          
          // Show success
          document.getElementById('balance-success').classList.remove('hidden');
          
          // Update account balance (this would come from the API in a real implementation)
          accountBalance -= selectedPrice;
          document.getElementById('account-balance-display').textContent = formatCurrency(accountBalance);
          
          // Disable button
          balanceSubmitBtn.textContent = 'Payment Completed';
          
          // Reload user data after a delay
          setTimeout(function() {
            window.location.href = '/account/settings/#membership-tab';
          }, 3000);
        })
        .catch(error => {
          // Hide processing
          document.getElementById('balance-processing').classList.add('hidden');
          
          // Show error message
          alert('Error: ' + error.message);
          
          // Re-enable button
          balanceSubmitBtn.disabled = false;
          
          // If not logged in, redirect to login page
          if (error.message.includes('logged in')) {
            setTimeout(function() {
              window.location.href = '/account/login/';
            }, 2000);
          }
        });
      });
    }
  });
</script>
{{< /rawhtml >}}