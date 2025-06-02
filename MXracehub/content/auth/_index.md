---
title: "Sign In & Register"
description: "Sign in to your MXRaceHub account or create a new account"
---

{{< rawhtml >}}
<div class="auth-container">
  <div class="auth-grid">
    <!-- Left Column: Auth Forms -->
    <div class="auth-forms">
      <div class="auth-tabs">
        <button id="login-tab" class="auth-tab active">Sign In</button>
        <button id="register-tab" class="auth-tab">Register</button>
      </div>
      
      <div id="login-form" class="auth-form">
        <h2 class="auth-title">Welcome Back</h2>
        <p class="auth-subtitle">Sign in to access your account, place bets, and more.</p>
        
        <form class="form-container">
          <div class="form-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" class="form-input" placeholder="your@email.com" required>
          </div>
          
          <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" class="form-input" placeholder="••••••••" required>
            <div class="forgot-password">
              <a href="/auth/reset-password/">Forgot Password?</a>
            </div>
          </div>
          
          <div class="form-group">
            <button type="submit" class="auth-button">
              Sign In
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </form>
        
        <div class="auth-divider">
          <span>or continue with</span>
        </div>
        
        <div class="social-buttons">
          <button class="social-button google">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
            Google
          </button>
          
          <button class="social-button apple">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.498 0c.323 2.408-.79 4.754-2.398 6.392-1.53 1.594-3.603 2.802-5.775 2.633-.368-2.371.902-4.82 2.414-6.316C12.19 1.199 14.542.036 16.498 0zM22 17.5c-.786 1.122-1.18 1.619-2.203 2.604-1.454 1.399-3.5 3.13-6.031 3.125-2.531-.005-3.185-1.506-6.577-1.502-3.395.002-4.145 1.538-6.68 1.534-2.531-.005-4.464-1.587-5.974-3.076C-9.927 14.854-6.034 2.245.985 1.118 3.581.668 5.793 2.287 7.455 2.287c1.66 0 4.284-2.22 7.239-1.893.462.027 3.594.462 5.295 3.458a7.144 7.144 0 0 0-.285 1.512C19.709 5.371 19.704 17.337 22 17.5z"/>
            </svg>
            Apple
          </button>
        </div>
      </div>
      
      <div id="register-form" class="auth-form hidden">
        <h2 class="auth-title">Create Account</h2>
        <p class="auth-subtitle">Join MXRaceHub to access exclusive features and bet on races.</p>
        
        <form class="form-container">
          <div class="form-group">
            <label for="register-username">Username</label>
            <input type="text" id="register-username" class="form-input" placeholder="Choose a username" required>
          </div>
          
          <div class="form-group">
            <label for="register-email">Email</label>
            <input type="email" id="register-email" class="form-input" placeholder="your@email.com" required>
          </div>
          
          <div class="form-group">
            <label for="register-password">Password</label>
            <input type="password" id="register-password" class="form-input" placeholder="Create a password" required>
            <div class="password-requirements">
              <span>Password must be at least 8 characters</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="register-confirm-password">Confirm Password</label>
            <input type="password" id="register-confirm-password" class="form-input" placeholder="Confirm your password" required>
          </div>
          
          <div class="form-group checkbox">
            <input type="checkbox" id="terms-checkbox" required>
            <label for="terms-checkbox">I agree to the <a href="/terms/">Terms of Service</a> and <a href="/privacy/">Privacy Policy</a></label>
          </div>
          
          <div class="form-group">
            <button type="submit" class="auth-button">
              Create Account
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </form>
        
        <div class="auth-divider">
          <span>or register with</span>
        </div>
        
        <div class="social-buttons">
          <button class="social-button google">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
            Google
          </button>
          
          <button class="social-button apple">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.498 0c.323 2.408-.79 4.754-2.398 6.392-1.53 1.594-3.603 2.802-5.775 2.633-.368-2.371.902-4.82 2.414-6.316C12.19 1.199 14.542.036 16.498 0zM22 17.5c-.786 1.122-1.18 1.619-2.203 2.604-1.454 1.399-3.5 3.13-6.031 3.125-2.531-.005-3.185-1.506-6.577-1.502-3.395.002-4.145 1.538-6.68 1.534-2.531-.005-4.464-1.587-5.974-3.076C-9.927 14.854-6.034 2.245.985 1.118 3.581.668 5.793 2.287 7.455 2.287c1.66 0 4.284-2.22 7.239-1.893.462.027 3.594.462 5.295 3.458a7.144 7.144 0 0 0-.285 1.512C19.709 5.371 19.704 17.337 22 17.5z"/>
            </svg>
            Apple
          </button>
        </div>
      </div>
    </div>
    
    <!-- Right Column: Hero Section -->
    <div class="auth-hero">
      <div class="hero-content">
        <h1 class="hero-title">Experience Motocross Like Never Before</h1>
        <p class="hero-text">Join the ultimate community for motocross and supercross fans. Get access to exclusive content, real-time race updates, and interactive betting features.</p>
        
        <div class="hero-features">
          <div class="hero-feature">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
              </svg>
            </div>
            <div class="feature-text">
              <h3>Bet with Friends</h3>
              <p>Create friendly wagers on race outcomes with your buddies.</p>
            </div>
          </div>
          
          <div class="hero-feature">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </div>
            <div class="feature-text">
              <h3>Real-time Updates</h3>
              <p>Get instant race results and standings as they happen.</p>
            </div>
          </div>
          
          <div class="hero-feature">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div class="feature-text">
              <h3>Exclusive Content</h3>
              <p>Access premium rider interviews and behind-the-scenes footage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Auth Page Styles */
  .auth-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .auth-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  @media (min-width: 1024px) {
    .auth-grid {
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }
  }
  
  /* Auth Forms Styling */
  .auth-forms {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 2rem;
  }
  
  .auth-tabs {
    display: flex;
    margin-bottom: 2rem;
    border-bottom: 1px solid #eaeaea;
  }
  
  .auth-tab {
    padding: 0.75rem 1.5rem;
    background: none;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .auth-tab.active {
    color: var(--primary-color, #e20613);
  }
  
  .auth-tab.active:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-color, #e20613);
  }
  
  .auth-form {
    transition: all 0.3s ease;
  }
  
  .auth-form.hidden {
    display: none;
  }
  
  .auth-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  .auth-subtitle {
    color: #666;
    margin-bottom: 2rem;
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group.checkbox {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
  
  .form-group label {
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #555;
  }
  
  .form-input {
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s ease;
  }
  
  .form-input:focus {
    border-color: var(--primary-color, #e20613);
    box-shadow: 0 0 0 3px rgba(226, 6, 19, 0.1);
    outline: none;
  }
  
  .forgot-password {
    margin-top: 0.5rem;
    text-align: right;
  }
  
  .forgot-password a, 
  .form-group.checkbox a {
    color: var(--primary-color, #e20613);
    text-decoration: none;
    font-size: 0.875rem;
  }
  
  .password-requirements {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #777;
  }
  
  .auth-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    background-color: var(--primary-color, #e20613);
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .auth-button:hover {
    background-color: #c20510;
    transform: translateY(-1px);
  }
  
  .auth-divider {
    position: relative;
    text-align: center;
    margin: 1.5rem 0;
  }
  
  .auth-divider:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #eaeaea;
    z-index: 1;
  }
  
  .auth-divider span {
    position: relative;
    z-index: 2;
    background-color: white;
    padding: 0 1rem;
    color: #777;
    font-size: 0.875rem;
  }
  
  .social-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .social-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .social-button:hover {
    background-color: #f8f8f8;
  }
  
  /* Hero Section Styling */
  .auth-hero {
    display: flex;
    align-items: center;
    background-color: var(--secondary-color, #003366);
    background-image: linear-gradient(135deg, #003366 0%, #004080 100%);
    border-radius: 8px;
    overflow: hidden;
    color: white;
  }
  
  .hero-content {
    padding: 2.5rem;
  }
  
  .hero-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  .hero-text {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
    opacity: 0.9;
    line-height: 1.6;
  }
  
  .hero-features {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .hero-feature {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .feature-icon {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.75rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .feature-text h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .feature-text p {
    opacity: 0.8;
    font-size: 0.9375rem;
  }
  
  /* Dark mode adjustments */
  @media (prefers-color-scheme: dark) {
    .auth-forms {
      background-color: #1a1a1a;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
    
    .auth-tabs {
      border-bottom-color: #333;
    }
    
    .auth-tab {
      color: #aaa;
    }
    
    .auth-title {
      color: #f5f5f5;
    }
    
    .auth-subtitle {
      color: #aaa;
    }
    
    .form-group label {
      color: #ccc;
    }
    
    .form-input {
      background-color: #2a2a2a;
      border-color: #444;
      color: #f5f5f5;
    }
    
    .form-input::placeholder {
      color: #777;
    }
    
    .password-requirements {
      color: #999;
    }
    
    .auth-divider:before {
      background-color: #444;
    }
    
    .auth-divider span {
      background-color: #1a1a1a;
      color: #aaa;
    }
    
    .social-button {
      background-color: #2a2a2a;
      border-color: #444;
      color: #f5f5f5;
    }
    
    .social-button:hover {
      background-color: #333;
    }
    
    .auth-hero {
      background-image: linear-gradient(135deg, #001a33 0%, #002b59 100%);
    }
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    loginTab.addEventListener('click', function() {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
    });
    
    registerTab.addEventListener('click', function() {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      registerForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
    });
    
    // Form submission handling (simulated)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission - in a real app, this would send data to the server
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        button.innerHTML = 'Processing...';
        button.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
          alert('This is a demo. In a real application, this would connect to the server.');
          button.innerHTML = originalText;
          button.disabled = false;
        }, 1500);
      });
    });
  });
</script>
{{< /rawhtml >}}