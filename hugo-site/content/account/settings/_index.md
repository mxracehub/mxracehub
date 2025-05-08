---
title: "Account Settings"
description: "Manage your MXRaceHub account settings and preferences"
layout: "single"
---

{{< rawhtml >}}
<div class="settings-container">
  <div class="settings-header">
    <h1 class="text-3xl font-bold mb-2">Account Settings</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">Manage your account security and preferences</p>
  </div>

  <div class="settings-content">
    <div class="settings-navigation">
      <button class="nav-item active" data-tab="security">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        Security
      </button>
      
      <button class="nav-item" data-tab="preferences">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        Preferences
      </button>
      
      <button class="nav-item" data-tab="notifications">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        Notifications
      </button>
      
      <button class="nav-item" data-tab="membership">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
          <line x1="7" y1="7" x2="7.01" y2="7"></line>
        </svg>
        Membership
      </button>
      
      <button class="nav-item" data-tab="privacy">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        Privacy
      </button>
    </div>
    
    <div class="settings-panel">
      <!-- Security Tab -->
      <div class="settings-tab active" id="security-tab">
        <h2 class="text-xl font-semibold mb-4">Security Settings</h2>
        
        <div class="settings-card">
          <h3 class="text-lg font-medium mb-3">Change Password</h3>
          
          <form id="password-form" class="settings-form">
            <div class="form-group">
              <label for="current-password">Current Password</label>
              <div class="password-input-container">
                <input type="password" id="current-password" name="currentPassword" required>
                <button type="button" class="toggle-password" data-target="current-password">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="show-icon">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hide-icon hidden">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </button>
              </div>
              <div class="error-message" id="current-password-error"></div>
            </div>
            
            <div class="form-group">
              <label for="new-password">New Password</label>
              <div class="password-input-container">
                <input type="password" id="new-password" name="newPassword" required>
                <button type="button" class="toggle-password" data-target="new-password">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="show-icon">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hide-icon hidden">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </button>
              </div>
              <div class="error-message" id="new-password-error"></div>
              <div class="password-strength hidden" id="password-strength">
                <div class="strength-meter">
                  <div class="strength-indicator" id="strength-indicator"></div>
                </div>
                <div class="strength-text" id="strength-text">Password strength: <span>Weak</span></div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="confirm-password">Confirm New Password</label>
              <div class="password-input-container">
                <input type="password" id="confirm-password" name="confirmPassword" required>
                <button type="button" class="toggle-password" data-target="confirm-password">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="show-icon">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hide-icon hidden">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </button>
              </div>
              <div class="error-message" id="confirm-password-error"></div>
            </div>
            
            <div class="form-actions">
              <button type="submit" id="save-password" class="save-btn">Update Password</button>
            </div>
            
            <div id="password-success" class="success-message hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Password updated successfully!</span>
            </div>
          </form>
        </div>
        
        <div class="settings-card">
          <h3 class="text-lg font-medium mb-3">Two-Factor Authentication</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Add an extra layer of security to your account by enabling two-factor authentication.
          </p>
          
          <div class="toggle-container">
            <label class="toggle-switch">
              <input type="checkbox" id="two-factor-toggle">
              <span class="toggle-slider"></span>
            </label>
            <span class="toggle-label">Enable Two-Factor Authentication</span>
          </div>
          
          <div id="two-factor-options" class="mt-4 hidden">
            <div class="two-factor-option">
              <input type="radio" name="two-factor-method" id="authenticator-app" value="app" checked>
              <label for="authenticator-app">
                <div class="option-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </div>
                <div class="option-content">
                  <div class="option-title">Authenticator App</div>
                  <div class="option-description">Use Google Authenticator, Authy, or similar apps</div>
                </div>
              </label>
            </div>
            
            <div class="two-factor-option">
              <input type="radio" name="two-factor-method" id="sms-verification" value="sms">
              <label for="sms-verification">
                <div class="option-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div class="option-content">
                  <div class="option-title">SMS Verification</div>
                  <div class="option-description">Receive security codes via text message</div>
                </div>
              </label>
            </div>
            
            <button id="setup-2fa" class="setup-btn mt-4">Set Up Two-Factor Authentication</button>
          </div>
        </div>
        
        <div class="settings-card">
          <h3 class="text-lg font-medium mb-3">Login Activity</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Recent logins to your account. If you don't recognize a login, please change your password immediately.
          </p>
          
          <div class="login-activity">
            <div class="activity-item">
              <div class="activity-icon successful">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div class="activity-details">
                <div class="activity-location">San Francisco, CA, United States</div>
                <div class="activity-device">Chrome on Windows</div>
                <div class="activity-time">Today, 2:15 PM</div>
              </div>
              <div class="activity-status">Current</div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon successful">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div class="activity-details">
                <div class="activity-location">San Francisco, CA, United States</div>
                <div class="activity-device">Safari on iPhone</div>
                <div class="activity-time">Yesterday, 9:20 AM</div>
              </div>
              <div class="activity-status"></div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon failed">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <div class="activity-details">
                <div class="activity-location">Los Angeles, CA, United States</div>
                <div class="activity-device">Firefox on MacOS</div>
                <div class="activity-time">April 18, 2025, 4:35 PM</div>
              </div>
              <div class="activity-status failed">Failed</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Preferences Tab -->
      <div class="settings-tab" id="preferences-tab">
        <h2 class="text-xl font-semibold mb-4">User Preferences</h2>
        
        <div class="settings-card">
          <h3 class="text-lg font-medium mb-3">Appearance</h3>
          
          <div class="form-group">
            <label>Theme</label>
            <div class="theme-options">
              <div class="theme-option">
                <input type="radio" name="theme" id="theme-light" value="light">
                <label for="theme-light">
                  <div class="theme-preview light-theme"></div>
                  <span>Light</span>
                </label>
              </div>
              
              <div class="theme-option">
                <input type="radio" name="theme" id="theme-dark" value="dark">
                <label for="theme-dark">
                  <div class="theme-preview dark-theme"></div>
                  <span>Dark</span>
                </label>
              </div>
              
              <div class="theme-option">
                <input type="radio" name="theme" id="theme-system" value="system" checked>
                <label for="theme-system">
                  <div class="theme-preview system-theme"></div>
                  <span>System</span>
                </label>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label>Accent Color</label>
            <div class="color-options">
              <div class="color-option">
                <input type="radio" name="accent-color" id="color-blue" value="blue" checked>
                <label for="color-blue">
                  <div class="color-preview blue"></div>
                  <span>Blue</span>
                </label>
              </div>
              
              <div class="color-option">
                <input type="radio" name="accent-color" id="color-red" value="red">
                <label for="color-red">
                  <div class="color-preview red"></div>
                  <span>Red</span>
                </label>
              </div>
              
              <div class="color-option">
                <input type="radio" name="accent-color" id="color-green" value="green">
                <label for="color-green">
                  <div class="color-preview green"></div>
                  <span>Green</span>
                </label>
              </div>
              
              <div class="color-option">
                <input type="radio" name="accent-color" id="color-orange" value="orange">
                <label for="color-orange">
                  <div class="color-preview orange"></div>
                  <span>Orange</span>
                </label>
              </div>
              
              <div class="color-option">
                <input type="radio" name="accent-color" id="color-purple" value="purple">
                <label for="color-purple">
                  <div class="color-preview purple"></div>
                  <span>Purple</span>
                </label>
              </div>
            </div>
          </div>
          
          <button id="save-appearance" class="save-btn">Save Appearance</button>
        </div>
        
        <div class="settings-card">
          <h3 class="text-lg font-medium mb-3">Language & Region</h3>
          
          <div class="form-group">
            <label for="language">Language</label>
            <select id="language">
              <option value="en-US">English (United States)</option>
              <option value="en-GB">English (United Kingdom)</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="time-format">Time Format</label>
            <select id="time-format">
              <option value="12h">12-hour (1:30 PM)</option>
              <option value="24h">24-hour (13:30)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="date-format">Date Format</label>
            <select id="date-format">
              <option value="mdy">MM/DD/YYYY</option>
              <option value="dmy">DD/MM/YYYY</option>
              <option value="ymd">YYYY/MM/DD</option>
            </select>
          </div>
          
          <button id="save-regional" class="save-btn">Save Preferences</button>
        </div>
      </div>
      
      <!-- Notifications Tab -->
      <div class="settings-tab" id="notifications-tab">
        <h2 class="text-xl font-semibold mb-4">Notification Settings</h2>
        
        <div class="settings-card">
          <h3 class="text-lg font-medium mb-3">Email Notifications</h3>
          
          <div class="notification-option">
            <div class="notification-details">
              <div class="notification-title">Race updates and results</div>
              <div class="notification-description">Get notified when races start, finish, and when results are posted</div>
            </div>
            <div class="notification-toggle">
              <label class="toggle-switch">
                <input type="checkbox" checked id="email-races">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="notification-option">
            <div class="notification-details">
              <div class="notification-title">Betting activity</div>
              <div class="notification-description">Notifications about your bets, including wins and losses</div>
            </div>
            <div class="notification-toggle">
              <label class="toggle-switch">
                <input type="checkbox" checked id="email-betting">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="notification-option">
            <div class="notification-details">
              <div class="notification-title">Friend requests and activity</div>
              <div class="notification-description">Updates when friends send you bet requests or join your groups</div>
            </div>
            <div class="notification-toggle">
              <label class="toggle-switch">
                <input type="checkbox" checked id="email-friends">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="notification-option">
            <div class="notification-details">
              <div class="notification-title">Promotions and special offers</div>
              <div class="notification-description">Information about special promotions, bonuses, and offers</div>
            </div>
            <div class="notification-toggle">
              <label class="toggle-switch">
                <input type="checkbox" id="email-promos">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="settings-card">
          <h3 class="text-lg font-medium mb-3">Push Notifications</h3>
          
          <div class="notification-option">
            <div class="notification-details">
              <div class="notification-title">Race updates and results</div>
              <div class="notification-description">Get notified when races start, finish, and when results are posted</div>
            </div>
            <div class="notification-toggle">
              <label class="toggle-switch">
                <input type="checkbox" checked id="push-races">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="notification-option">
            <div class="notification-details">
              <div class="notification-title">Betting activity</div>
              <div class="notification-description">Notifications about your bets, including wins and losses</div>
            </div>
            <div class="notification-toggle">
              <label class="toggle-switch">
                <input type="checkbox" checked id="push-betting">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="notification-option">
            <div class="notification-details">
              <div class="notification-title">Friend requests and activity</div>
              <div class="notification-description">Updates when friends send you bet requests or join your groups</div>
            </div>
            <div class="notification-toggle">
              <label class="toggle-switch">
                <input type="checkbox" checked id="push-friends">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="notification-option">
            <div class="notification-details">
              <div class="notification-title">Promotions and special offers</div>
              <div class="notification-description">Information about special promotions, bonuses, and offers</div>
            </div>
            <div class="notification-toggle">
              <label class="toggle-switch">
                <input type="checkbox" id="push-promos">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <button id="save-notifications" class="save-btn">Save Notification Settings</button>
      </div>
      
      <!-- Membership Tab -->
      <div class="settings-tab" id="membership-tab">
        <h2 class="text-xl font-semibold mb-4">Membership Settings</h2>
        
        <div class="settings-card">
          <div class="membership-details">
            <div class="membership-icon premium">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div class="membership-info">
              <h3 class="membership-type">Premium Membership</h3>
              <p class="membership-expiry">Expires on: April 30, 2026</p>
              <p class="membership-billing">Next billing date: April 30, 2025</p>
            </div>
          </div>
          
          <div class="membership-perks">
            <h4 class="text-md font-medium mb-2">Your Premium Benefits</h4>
            <ul class="perks-list">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>No betting fees (1% fee waived)</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Early access to race odds</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Exclusive rider interviews</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Priority customer support</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Create unlimited betting groups</span>
              </li>
            </ul>
          </div>
          
          <div class="membership-actions">
            <button class="change-plan-btn">Change Plan</button>
            <button class="cancel-plan-btn">Cancel Membership</button>
          </div>
        </div>
        
        <div class="settings-card">
          <h3 class="text-lg font-medium mb-3">Billing Information</h3>
          
          <div class="payment-method-info">
            <div class="payment-method-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <div class="payment-method-details">
              <div class="payment-method-name">Credit Card •••• 4589</div>
              <div class="payment-method-expiry">Expires 05/28</div>
            </div>
            <button class="edit-payment-btn">Edit</button>
          </div>
          
          <h4 class="text-md font-medium mt-4 mb-2">Billing Address</h4>
          <address class="billing-address">
            John Doe<br>
            123 Main Street<br>
            Anytown, CA 12345<br>
            United States
          </address>
          
          <button class="edit-billing-btn mt-2">Edit Billing Address</button>
        </div>
        
        <div class="settings-card">
          <h3 class="text-lg font-medium mb-3">Billing History</h3>
          
          <div class="billing-history">
            <div class="billing-item">
              <div class="billing-date">April 1, 2025</div>
              <div class="billing-details">
                <div class="billing-description">Premium Membership - Annual</div>
                <div class="billing-amount">$100.00</div>
              </div>
              <a href="#" class="billing-receipt">Receipt</a>
            </div>
            
            <div class="billing-item">
              <div class="billing-date">April 1, 2024</div>
              <div class="billing-details">
                <div class="billing-description">Premium Membership - Annual</div>
                <div class="billing-amount">$100.00</div>
              </div>
              <a href="#" class="billing-receipt">Receipt</a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Privacy Tab -->
      <div class="settings-tab" id="privacy-tab">
        <h2 class="text-xl font-semibold mb-4">Privacy Settings</h2>
        
        <div class="settings-card">
          <h3 class="text-lg font-medium mb-3">Privacy Controls</h3>
          
          <div class="privacy-option">
            <div class="privacy-details">
              <div class="privacy-title">Profile visibility</div>
              <div class="privacy-description">Control who can see your profile information</div>
            </div>
            <div class="privacy-control">
              <select id="profile-visibility">
                <option value="public">Public</option>
                <option value="friends" selected>Friends only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          
          <div class="privacy-option">
            <div class="privacy-details">
              <div class="privacy-title">Betting activity visibility</div>
              <div class="privacy-description">Control who can see your betting activity</div>
            </div>
            <div class="privacy-control">
              <select id="betting-visibility">
                <option value="public">Public</option>
                <option value="friends" selected>Friends only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          
          <div class="privacy-option">
            <div class="privacy-details">
              <div class="privacy-title">Show online status</div>
              <div class="privacy-description">Allow others to see when you're online</div>
            </div>
            <div class="privacy-control">
              <label class="toggle-switch">
                <input type="checkbox" checked id="online-status">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="settings-card">
          <h3 class="text-lg font-medium mb-3">Data & Personalization</h3>
          
          <div class="privacy-option">
            <div class="privacy-details">
              <div class="privacy-title">Allow personalized recommendations</div>
              <div class="privacy-description">We'll use your activity to provide better recommendations</div>
            </div>
            <div class="privacy-control">
              <label class="toggle-switch">
                <input type="checkbox" checked id="personalization">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="privacy-option">
            <div class="privacy-details">
              <div class="privacy-title">Allow analytics cookies</div>
              <div class="privacy-description">Help us improve by letting us analyze how you use the app</div>
            </div>
            <div class="privacy-control">
              <label class="toggle-switch">
                <input type="checkbox" checked id="analytics">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="privacy-option">
            <div class="privacy-details">
              <div class="privacy-title">Location services</div>
              <div class="privacy-description">Allow MXRaceHub to access your location for region-specific features</div>
            </div>
            <div class="privacy-control">
              <label class="toggle-switch">
                <input type="checkbox" checked id="location">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="settings-card privacy-actions">
          <button class="download-data-btn">Download Your Data</button>
          <button class="delete-account-btn">Delete Account</button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .settings-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .settings-header {
    margin-bottom: 2rem;
  }
  
  .settings-content {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    .settings-content {
      grid-template-columns: 1fr;
    }
    
    .settings-navigation {
      display: flex;
      overflow-x: auto;
      margin-bottom: 1rem;
    }
    
    .nav-item {
      flex-shrink: 0;
    }
  }
  
  .settings-navigation {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    background-color: transparent;
    font-size: 1rem;
    text-align: left;
  }
  
  .nav-item:hover {
    background-color: var(--hover-color, #f0f0f0);
  }
  
  .nav-item.active {
    background-color: var(--primary-light, #e6f2ff);
    color: var(--primary-color, #0066cc);
    font-weight: 500;
  }
  
  .settings-tab {
    display: none;
  }
  
  .settings-tab.active {
    display: block;
  }
  
  .settings-card {
    background-color: var(--card-background, #f9f9f9);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color, #333);
  }
  
  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color, #e0e0e0);
    border-radius: 4px;
    background-color: var(--input-background, #fff);
    color: var(--text-color, #333);
  }
  
  .password-input-container {
    position: relative;
  }
  
  .toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted, #666);
  }
  
  .hidden {
    display: none !important;
  }
  
  .error-message {
    font-size: 0.85rem;
    color: #e53e3e;
    margin-top: 0.25rem;
  }
  
  .password-strength {
    margin-top: 0.5rem;
  }
  
  .strength-meter {
    height: 4px;
    background-color: #e0e0e0;
    border-radius: 2px;
    margin-bottom: 0.25rem;
  }
  
  .strength-indicator {
    height: 100%;
    border-radius: 2px;
    width: 0%;
    transition: width 0.3s, background-color 0.3s;
  }
  
  .strength-text {
    font-size: 0.85rem;
    color: var(--text-muted, #666);
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
  }
  
  .save-btn {
    padding: 0.75rem 2rem;
    background-color: var(--primary-color, #0066cc);
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .save-btn:hover {
    background-color: var(--primary-dark, #0052a3);
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
  
  .toggle-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
  }
  
  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .toggle-slider {
    background-color: var(--primary-color, #0066cc);
  }
  
  input:focus + .toggle-slider {
    box-shadow: 0 0 1px var(--primary-color, #0066cc);
  }
  
  input:checked + .toggle-slider:before {
    transform: translateX(20px);
  }
  
  .toggle-label {
    font-weight: 500;
  }
  
  .two-factor-options {
    margin-top: 1rem;
  }
  
  .two-factor-option {
    margin-bottom: 0.75rem;
  }
  
  .two-factor-option input[type="radio"] {
    display: none;
  }
  
  .two-factor-option label {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--border-color, #e0e0e0);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .two-factor-option input[type="radio"]:checked + label {
    border-color: var(--primary-color, #0066cc);
    background-color: var(--primary-light, #e6f2ff);
  }
  
  .option-icon {
    color: var(--primary-color, #0066cc);
  }
  
  .option-title {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .option-description {
    font-size: 0.875rem;
    color: var(--text-muted, #666);
  }
  
  .setup-btn {
    background-color: var(--primary-color, #0066cc);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .setup-btn:hover {
    background-color: var(--primary-dark, #0052a3);
  }
  
  .login-activity {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .activity-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--background-color, #fff);
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .activity-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .activity-icon.successful {
    background-color: #e6fffa;
    color: #0d9488;
  }
  
  .activity-icon.failed {
    background-color: #fee2e2;
    color: #ef4444;
  }
  
  .activity-details {
    flex-grow: 1;
  }
  
  .activity-location {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .activity-device, .activity-time {
    font-size: 0.875rem;
    color: var(--text-muted, #666);
  }
  
  .activity-status {
    font-weight: 500;
  }
  
  .activity-status.failed {
    color: #ef4444;
  }
  
  /* Appearance tab styles */
  .theme-options, .color-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
    margin-top: 0.5rem;
  }
  
  .theme-option input[type="radio"], .color-option input[type="radio"] {
    display: none;
  }
  
  .theme-option label, .color-option label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .theme-preview {
    width: 80px;
    height: 50px;
    border-radius: 6px;
    border: 2px solid var(--border-color, #e0e0e0);
    transition: all 0.2s;
  }
  
  .light-theme {
    background-color: #f9f9f9;
  }
  
  .dark-theme {
    background-color: #1a1a1a;
  }
  
  .system-theme {
    background: linear-gradient(to right, #f9f9f9 50%, #1a1a1a 50%);
  }
  
  .theme-option input[type="radio"]:checked + label .theme-preview,
  .color-option input[type="radio"]:checked + label .color-preview {
    border-color: var(--primary-color, #0066cc);
    box-shadow: 0 0 0 2px var(--primary-light, #e6f2ff);
  }
  
  .color-preview {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid var(--border-color, #e0e0e0);
    transition: all 0.2s;
  }
  
  .color-preview.blue {
    background-color: #0066cc;
  }
  
  .color-preview.red {
    background-color: #e53e3e;
  }
  
  .color-preview.green {
    background-color: #38a169;
  }
  
  .color-preview.orange {
    background-color: #dd6b20;
  }
  
  .color-preview.purple {
    background-color: #805ad5;
  }
  
  /* Notifications tab styles */
  .notification-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color, #e0e0e0);
  }
  
  .notification-option:last-child {
    border-bottom: none;
  }
  
  .notification-title {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .notification-description {
    font-size: 0.875rem;
    color: var(--text-muted, #666);
  }
  
  /* Membership tab styles */
  .membership-details {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .membership-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .membership-icon.premium {
    background-color: #fef3c7;
    color: #d97706;
  }
  
  .membership-type {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: #d97706;
  }
  
  .membership-expiry, .membership-billing {
    font-size: 0.875rem;
    color: var(--text-muted, #666);
  }
  
  .perks-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
  }
  
  .perks-list li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .perks-list li svg {
    color: #10b981;
    flex-shrink: 0;
  }
  
  .membership-actions {
    display: flex;
    gap: 1rem;
  }
  
  .change-plan-btn, .cancel-plan-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .change-plan-btn {
    background-color: var(--primary-color, #0066cc);
    color: white;
    border: none;
  }
  
  .change-plan-btn:hover {
    background-color: var(--primary-dark, #0052a3);
  }
  
  .cancel-plan-btn {
    background-color: transparent;
    color: var(--text-color, #333);
    border: 1px solid var(--border-color, #e0e0e0);
  }
  
  .cancel-plan-btn:hover {
    background-color: var(--hover-color, #f0f0f0);
  }
  
  .payment-method-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--background-color, #fff);
    border-radius: 6px;
    border: 1px solid var(--border-color, #e0e0e0);
    margin-bottom: 1.5rem;
  }
  
  .payment-method-icon {
    color: var(--text-muted, #666);
  }
  
  .payment-method-details {
    flex-grow: 1;
  }
  
  .payment-method-name {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .payment-method-expiry {
    font-size: 0.875rem;
    color: var(--text-muted, #666);
  }
  
  .edit-payment-btn, .edit-billing-btn {
    background: none;
    border: none;
    color: var(--primary-color, #0066cc);
    cursor: pointer;
    font-weight: 500;
  }
  
  .edit-payment-btn:hover, .edit-billing-btn:hover {
    text-decoration: underline;
  }
  
  .billing-address {
    font-style: normal;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
  
  .billing-history {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .billing-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color, #e0e0e0);
  }
  
  .billing-item:last-child {
    border-bottom: none;
  }
  
  .billing-date {
    width: 100px;
    font-weight: 500;
  }
  
  .billing-details {
    flex-grow: 1;
  }
  
  .billing-description {
    margin-bottom: 0.25rem;
  }
  
  .billing-amount {
    font-size: 0.875rem;
    color: var(--text-muted, #666);
  }
  
  .billing-receipt {
    color: var(--primary-color, #0066cc);
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  /* Privacy tab styles */
  .privacy-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color, #e0e0e0);
  }
  
  .privacy-option:last-child {
    border-bottom: none;
  }
  
  .privacy-title {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .privacy-description {
    font-size: 0.875rem;
    color: var(--text-muted, #666);
  }
  
  .privacy-control select {
    width: auto;
  }
  
  .privacy-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .download-data-btn, .delete-account-btn {
    padding: 0.75rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }
  
  .download-data-btn {
    background-color: var(--background-color, #fff);
    color: var(--text-color, #333);
    border: 1px solid var(--border-color, #e0e0e0);
  }
  
  .download-data-btn:hover {
    background-color: var(--hover-color, #f0f0f0);
  }
  
  .delete-account-btn {
    background-color: #fee2e2;
    color: #ef4444;
    border: 1px solid #fecaca;
  }
  
  .delete-account-btn:hover {
    background-color: #fecaca;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const navItems = document.querySelectorAll('.nav-item');
    const tabs = document.querySelectorAll('.settings-tab');
    
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        // Remove active class from all navigation items and tabs
        navItems.forEach(nav => nav.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Show corresponding tab
        const tabId = `${this.dataset.tab}-tab`;
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.dataset.target;
        const passwordInput = document.getElementById(targetId);
        const showIcon = this.querySelector('.show-icon');
        const hideIcon = this.querySelector('.hide-icon');
        
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          showIcon.classList.add('hidden');
          hideIcon.classList.remove('hidden');
        } else {
          passwordInput.type = 'password';
          showIcon.classList.remove('hidden');
          hideIcon.classList.add('hidden');
        }
      });
    });
    
    // Password strength checker
    const newPasswordInput = document.getElementById('new-password');
    const strengthIndicator = document.getElementById('strength-indicator');
    const strengthText = document.getElementById('strength-text').querySelector('span');
    const strengthContainer = document.getElementById('password-strength');
    
    if (newPasswordInput && strengthIndicator && strengthText) {
      newPasswordInput.addEventListener('input', function() {
        const password = this.value;
        
        if (password.length === 0) {
          strengthContainer.classList.add('hidden');
          return;
        }
        
        strengthContainer.classList.remove('hidden');
        
        // Calculate password strength
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Character variety checks
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/\d/.test(password)) strength += 1;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
        
        // Update UI
        let strengthPercentage, strengthLabel, strengthColor;
        
        if (strength < 3) {
          strengthPercentage = 25;
          strengthLabel = 'Weak';
          strengthColor = '#ef4444';
        } else if (strength < 5) {
          strengthPercentage = 50;
          strengthLabel = 'Medium';
          strengthColor = '#f59e0b';
        } else if (strength < 6) {
          strengthPercentage = 75;
          strengthLabel = 'Strong';
          strengthColor = '#10b981';
        } else {
          strengthPercentage = 100;
          strengthLabel = 'Very Strong';
          strengthColor = '#10b981';
        }
        
        strengthIndicator.style.width = `${strengthPercentage}%`;
        strengthIndicator.style.backgroundColor = strengthColor;
        strengthText.textContent = strengthLabel;
      });
    }
    
    // Password form submission
    const passwordForm = document.getElementById('password-form');
    
    if (passwordForm) {
      passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validatePasswordForm()) {
          updatePassword();
        }
      });
    }
    
    // Validate password form
    function validatePasswordForm() {
      let isValid = true;
      
      // Reset errors
      document.getElementById('current-password-error').textContent = '';
      document.getElementById('new-password-error').textContent = '';
      document.getElementById('confirm-password-error').textContent = '';
      
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      // Check current password
      if (!currentPassword) {
        document.getElementById('current-password-error').textContent = 'Please enter your current password';
        isValid = false;
      }
      
      // Check new password
      if (!newPassword) {
        document.getElementById('new-password-error').textContent = 'Please enter a new password';
        isValid = false;
      } else if (newPassword.length < 8) {
        document.getElementById('new-password-error').textContent = 'Password must be at least 8 characters long';
        isValid = false;
      }
      
      // Check password confirmation
      if (!confirmPassword) {
        document.getElementById('confirm-password-error').textContent = 'Please confirm your new password';
        isValid = false;
      } else if (confirmPassword !== newPassword) {
        document.getElementById('confirm-password-error').textContent = 'Passwords do not match';
        isValid = false;
      }
      
      return isValid;
    }
    
    // Simulate password update
    function updatePassword() {
      const saveButton = document.getElementById('save-password');
      saveButton.disabled = true;
      saveButton.textContent = 'Updating...';
      
      // Simulate API call
      setTimeout(function() {
        // Show success message
        document.getElementById('password-success').classList.remove('hidden');
        
        // Reset form
        document.getElementById('password-form').reset();
        
        // Reset button
        saveButton.disabled = false;
        saveButton.textContent = 'Update Password';
        
        // Hide strength indicator
        document.getElementById('password-strength').classList.add('hidden');
        
        // Hide success message after a delay
        setTimeout(function() {
          document.getElementById('password-success').classList.add('hidden');
        }, 5000);
      }, 1500);
    }
    
    // Two-factor authentication toggle
    const twoFactorToggle = document.getElementById('two-factor-toggle');
    const twoFactorOptions = document.getElementById('two-factor-options');
    
    if (twoFactorToggle && twoFactorOptions) {
      twoFactorToggle.addEventListener('change', function() {
        if (this.checked) {
          twoFactorOptions.classList.remove('hidden');
        } else {
          twoFactorOptions.classList.add('hidden');
        }
      });
    }
    
    // Save notifications button
    const saveNotificationsBtn = document.getElementById('save-notifications');
    
    if (saveNotificationsBtn) {
      saveNotificationsBtn.addEventListener('click', function() {
        this.disabled = true;
        this.textContent = 'Saving...';
        
        // Simulate API call
        setTimeout(() => {
          this.disabled = false;
          this.textContent = 'Save Notification Settings';
          
          // Show a temporary success message
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Notification settings saved successfully!</span>
          `;
          
          this.insertAdjacentElement('afterend', successMessage);
          
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        }, 1500);
      });
    }
    
    // Save appearance button
    const saveAppearanceBtn = document.getElementById('save-appearance');
    
    if (saveAppearanceBtn) {
      saveAppearanceBtn.addEventListener('click', function() {
        this.disabled = true;
        this.textContent = 'Saving...';
        
        // Simulate API call
        setTimeout(() => {
          this.disabled = false;
          this.textContent = 'Save Appearance';
          
          // Show a temporary success message
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Appearance settings saved successfully!</span>
          `;
          
          this.insertAdjacentElement('afterend', successMessage);
          
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        }, 1500);
      });
    }
    
    // Save regional preferences button
    const saveRegionalBtn = document.getElementById('save-regional');
    
    if (saveRegionalBtn) {
      saveRegionalBtn.addEventListener('click', function() {
        this.disabled = true;
        this.textContent = 'Saving...';
        
        // Simulate API call
        setTimeout(() => {
          this.disabled = false;
          this.textContent = 'Save Preferences';
          
          // Show a temporary success message
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Language and region preferences saved!</span>
          `;
          
          this.insertAdjacentElement('afterend', successMessage);
          
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        }, 1500);
      });
    }
  });
</script>
{{< /rawhtml >}}