---
title: "Payment Successful"
description: "Your payment has been processed successfully"
---

<div class="success-page">
  <div class="success-container">
    <div class="success-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    </div>
    
    <h1>Payment Successful!</h1>
    
    <div class="details-container">
      <div class="amount-row">
        <span class="label">Amount</span>
        <span class="value" id="payment-amount">$100.00</span>
      </div>
      
      <div class="method-row">
        <span class="label">Payment Method</span>
        <span class="value" id="payment-method">Credit Card</span>
      </div>
      
      <div class="timestamp-row">
        <span class="label">Date & Time</span>
        <span class="value" id="payment-timestamp">April 19, 2023 - 10:15 AM</span>
      </div>
      
      <div class="reference-row">
        <span class="label">Transaction ID</span>
        <span class="value reference" id="payment-reference">TXN-123456789</span>
      </div>
    </div>
    
    <p class="success-message">Your account has been credited and your balance has been updated.</p>
    
    <div class="action-buttons">
      <a href="/betting/payment" class="btn secondary">Make Another Deposit</a>
      <a href="/betting/my-bets" class="btn primary">Place Bets</a>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Extract amount from URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const amount = urlParams.get('amount');
  
  if (amount) {
    document.getElementById('payment-amount').textContent = `$${parseFloat(amount).toFixed(2)}`;
  }
  
  // Generate mock transaction details
  const paymentMethod = urlParams.get('method') || 'Credit Card';
  document.getElementById('payment-method').textContent = paymentMethod;
  
  // Set current timestamp
  const now = new Date();
  const timestamp = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  document.getElementById('payment-timestamp').textContent = timestamp;
  
  // Generate random transaction reference
  const reference = 'TXN-' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  document.getElementById('payment-reference').textContent = reference;
});
</script>

<style>
.success-page {
  max-width: 1200px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 2rem 1rem;
}

.success-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 3rem 2rem;
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

.success-container h1 {
  color: #28a745;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.details-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
}

.amount-row, .method-row, .timestamp-row, .reference-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.reference-row {
  border-bottom: none;
}

.label {
  color: #666;
  font-weight: 500;
}

.value {
  font-weight: 600;
  color: #333;
}

.value.reference {
  font-family: monospace;
  font-size: 0.9rem;
}

.success-message {
  margin-bottom: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.btn.primary {
  background-color: #0066cc;
  color: white;
}

.btn.primary:hover {
  background-color: #0052a3;
}

.btn.secondary {
  background-color: #f0f0f0;
  color: #333;
}

.btn.secondary:hover {
  background-color: #e0e0e0;
}

@media (max-width: 768px) {
  .success-container {
    padding: 2rem 1.5rem;
  }
  
  .success-icon {
    width: 60px;
    height: 60px;
  }
  
  .success-container h1 {
    font-size: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>