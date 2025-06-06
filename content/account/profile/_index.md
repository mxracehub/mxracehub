---
title: "My Profile"
description: "Edit your MXRaceHub profile information"
layout: "single"
---

{{< rawhtml >}}
<div class="profile-container">
  <div class="profile-header">
    <h1 class="text-3xl font-bold mb-2">My Profile</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">Manage your personal information and preferences</p>
  </div>

  <div class="profile-content">
    <div class="profile-sidebar">
      <div class="profile-avatar">
        <div class="avatar-placeholder">
          <span id="profile-initials">JS</span>
        </div>
        <button id="change-avatar" class="change-avatar-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
          Change
        </button>
      </div>
      
      <div class="profile-stats">
        <div class="stat-item">
          <span class="stat-label">Member Since</span>
          <span class="stat-value" id="member-since">April 2025</span>
        </div>
        
        <div class="stat-item">
          <span class="stat-label">Membership Type</span>
          <span class="stat-value" id="membership-type">Free</span>
        </div>
        
        <div class="stat-item">
          <span class="stat-label">Total Bets</span>
          <span class="stat-value" id="total-bets">12</span>
        </div>
        
        <div class="stat-item">
          <span class="stat-label">Win Rate</span>
          <span class="stat-value" id="win-rate">68%</span>
        </div>
      </div>
      
      <div class="profile-actions">
        <a href="/account/wallet/" class="profile-action-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
          My Wallet
        </a>
        
        <a href="/account/settings/" class="profile-action-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Account Settings
        </a>
        
        <a href="/betting/friend-bets/" class="profile-action-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Friend Bets
        </a>
        
        <a href="/betting/groups/" class="profile-action-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          </svg>
          My Groups
        </a>
      </div>
    </div>
    
    <div class="profile-form-container">
      <h2 class="text-xl font-semibold mb-4">Profile Information</h2>
      
      <form id="profile-form" class="profile-form">
        <div class="form-section">
          <h3 class="text-lg font-medium mb-4">Personal Details</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" name="firstName" required>
              <div class="error-message" id="first-name-error"></div>
            </div>
            
            <div class="form-group">
              <label for="last-name">Last Name</label>
              <input type="text" id="last-name" name="lastName" required>
              <div class="error-message" id="last-name-error"></div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" disabled>
            </div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" required>
              <div class="error-message" id="email-error"></div>
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <h3 class="text-lg font-medium mb-4">Contact & Location</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone">
            </div>
            
            <div class="form-group">
              <label for="country">Country</label>
              <select id="country" name="country">
                <option value="">Select a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="UK">United Kingdom</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
                <option value="JP">Japan</option>
                <option value="BR">Brazil</option>
                <option value="MX">Mexico</option>
                <option value="ES">Spain</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" id="address" name="address">
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" name="city">
            </div>
            
            <div class="form-group">
              <label for="state">State/Province</label>
              <input type="text" id="state" name="state">
            </div>
            
            <div class="form-group">
              <label for="zip">Zip/Postal Code</label>
              <input type="text" id="zip" name="zip">
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <h3 class="text-lg font-medium mb-4">Preferences</h3>
          
          <div class="form-group">
            <label for="favorite-rider">Favorite Rider</label>
            <select id="favorite-rider" name="favoriteRider">
              <option value="">Select a rider</option>
              <option value="1">Jett Lawrence (#18)</option>
              <option value="2">Chase Sexton (#1)</option>
              <option value="3">Cooper Webb (#2)</option>
              <option value="4">Eli Tomac (#3)</option>
              <option value="5">Justin Barcia (#51)</option>
              <option value="6">Aaron Plessinger (#7)</option>
              <option value="7">Jason Anderson (#21)</option>
              <option value="8">Hunter Lawrence (#96)</option>
              <option value="9">Malcolm Stewart (#27)</option>
              <option value="10">Justin Cooper (#32)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="favorite-team">Favorite Team</label>
            <select id="favorite-team" name="favoriteTeam">
              <option value="">Select a team</option>
              <option value="1">Team Honda HRC</option>
              <option value="2">Red Bull KTM Factory Racing</option>
              <option value="3">Monster Energy Yamaha Star Racing</option>
              <option value="4">Monster Energy Kawasaki</option>
              <option value="5">Rockstar Energy Husqvarna Factory Racing</option>
              <option value="6">Troy Lee Designs Red Bull GASGAS Factory Racing</option>
              <option value="7">Monster Energy Pro Circuit Kawasaki</option>
              <option value="8">Twisted Tea Suzuki Progressive Insurance</option>
              <option value="9">Fire Power Honda</option>
              <option value="10">Muc-Off FXR ClubMX Yamaha</option>
            </select>
          </div>
          
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" id="email-notifications" name="emailNotifications">
              <span>Email me about race updates and betting opportunities</span>
            </label>
          </div>
          
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" id="app-notifications" name="appNotifications">
              <span>Receive app notifications for new races and bets</span>
            </label>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="submit" id="save-profile" class="save-profile-btn">Save Changes</button>
        </div>
        
        <div id="profile-success" class="success-message hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>Profile updated successfully!</span>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  .profile-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .profile-header {
    margin-bottom: 2rem;
  }
  
  .profile-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    .profile-content {
      grid-template-columns: 1fr;
    }
  }
  
  .profile-sidebar {
    background-color: var(--card-background, #f9f9f9);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .profile-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .avatar-placeholder {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: var(--primary-color, #0066cc);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }
  
  .change-avatar-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: none;
    border: 1px solid var(--border-color, #e0e0e0);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .change-avatar-btn:hover {
    background-color: var(--hover-color, #f0f0f0);
  }
  
  .profile-stats {
    margin-bottom: 1.5rem;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color, #e0e0e0);
  }
  
  .stat-item:last-child {
    border-bottom: none;
  }
  
  .stat-label {
    color: var(--text-muted, #666);
  }
  
  .stat-value {
    font-weight: 600;
    color: var(--text-color, #333);
  }
  
  .profile-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .profile-action-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background-color: var(--background-color, #fff);
    border: 1px solid var(--border-color, #e0e0e0);
    border-radius: 4px;
    transition: all 0.2s;
    text-decoration: none;
    color: var(--text-color, #333);
  }
  
  .profile-action-btn:hover {
    background-color: var(--hover-color, #f0f0f0);
    text-decoration: none;
  }
  
  .profile-form-container {
    background-color: var(--card-background, #f9f9f9);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .profile-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .form-section {
    border-bottom: 1px solid var(--border-color, #e0e0e0);
    padding-bottom: 1.5rem;
  }
  
  .form-section:last-child {
    border-bottom: none;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group:last-child {
    margin-bottom: 0;
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
  
  input:disabled {
    background-color: var(--disabled-background, #f5f5f5);
    cursor: not-allowed;
  }
  
  .checkbox-group {
    margin-top: 0.5rem;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .checkbox-label input {
    width: auto;
  }
  
  .error-message {
    font-size: 0.85rem;
    color: #e53e3e;
    margin-top: 0.25rem;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
  }
  
  .save-profile-btn {
    padding: 0.75rem 2rem;
    background-color: var(--primary-color, #0066cc);
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .save-profile-btn:hover {
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
  
  .hidden {
    display: none;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Get user data from the API
    fetchUserData();
    
    // Profile form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateProfileForm()) {
          saveProfileData();
        }
      });
    }
    
    // Generate initials for avatar
    function updateInitials(firstName, lastName) {
      const initialsElement = document.getElementById('profile-initials');
      if (initialsElement) {
        const firstInitial = firstName ? firstName.charAt(0) : '';
        const lastInitial = lastName ? lastName.charAt(0) : '';
        initialsElement.textContent = (firstInitial + lastInitial).toUpperCase();
      }
    }
    
    // Fetch user data from API
    function fetchUserData() {
      // For now, we'll simulate an API call with a delay
      setTimeout(function() {
        // This is simulated data - in production, this would come from an API call
        const userData = {
          id: 1,
          username: 'johndoe',
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '555-123-4567',
          country: 'US',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
          favoriteRider: '4',
          favoriteTeam: '1',
          emailNotifications: true,
          appNotifications: true,
          memberSince: 'April 2025',
          membershipType: 'Premium',
          totalBets: 12,
          winRate: '68%'
        };
        
        // Populate the form with user data
        populateProfileForm(userData);
        
        // Update stats section
        document.getElementById('member-since').textContent = userData.memberSince;
        document.getElementById('membership-type').textContent = userData.membershipType;
        document.getElementById('total-bets').textContent = userData.totalBets;
        document.getElementById('win-rate').textContent = userData.winRate;
        
        // Update initials
        updateInitials(userData.firstName, userData.lastName);
      }, 500);
    }
    
    // Populate form with user data
    function populateProfileForm(userData) {
      // Personal details
      document.getElementById('first-name').value = userData.firstName || '';
      document.getElementById('last-name').value = userData.lastName || '';
      document.getElementById('username').value = userData.username || '';
      document.getElementById('email').value = userData.email || '';
      
      // Contact & Location
      document.getElementById('phone').value = userData.phone || '';
      document.getElementById('country').value = userData.country || '';
      document.getElementById('address').value = userData.address || '';
      document.getElementById('city').value = userData.city || '';
      document.getElementById('state').value = userData.state || '';
      document.getElementById('zip').value = userData.zip || '';
      
      // Preferences
      document.getElementById('favorite-rider').value = userData.favoriteRider || '';
      document.getElementById('favorite-team').value = userData.favoriteTeam || '';
      document.getElementById('email-notifications').checked = userData.emailNotifications || false;
      document.getElementById('app-notifications').checked = userData.appNotifications || false;
    }
    
    // Validate profile form
    function validateProfileForm() {
      let isValid = true;
      
      // Reset errors
      document.getElementById('first-name-error').textContent = '';
      document.getElementById('last-name-error').textContent = '';
      document.getElementById('email-error').textContent = '';
      
      // Validate first name
      const firstName = document.getElementById('first-name').value.trim();
      if (!firstName) {
        document.getElementById('first-name-error').textContent = 'Please enter your first name';
        isValid = false;
      }
      
      // Validate last name
      const lastName = document.getElementById('last-name').value.trim();
      if (!lastName) {
        document.getElementById('last-name-error').textContent = 'Please enter your last name';
        isValid = false;
      }
      
      // Validate email
      const email = document.getElementById('email').value.trim();
      if (!email) {
        document.getElementById('email-error').textContent = 'Please enter your email address';
        isValid = false;
      } else if (!isValidEmail(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
      }
      
      return isValid;
    }
    
    // Email validation helper
    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
    
    // Save profile data
    function saveProfileData() {
      // Get form data
      const formData = {
        firstName: document.getElementById('first-name').value.trim(),
        lastName: document.getElementById('last-name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        country: document.getElementById('country').value,
        address: document.getElementById('address').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim(),
        zip: document.getElementById('zip').value.trim(),
        favoriteRider: document.getElementById('favorite-rider').value,
        favoriteTeam: document.getElementById('favorite-team').value,
        emailNotifications: document.getElementById('email-notifications').checked,
        appNotifications: document.getElementById('app-notifications').checked
      };
      
      // In a real application, you would send this data to the server
      // For now, just simulate a successful save with a delay
      document.getElementById('save-profile').disabled = true;
      document.getElementById('save-profile').textContent = 'Saving...';
      
      setTimeout(function() {
        // Show success message
        document.getElementById('profile-success').classList.remove('hidden');
        
        // Update initials if name changed
        updateInitials(formData.firstName, formData.lastName);
        
        // Reset button
        document.getElementById('save-profile').disabled = false;
        document.getElementById('save-profile').textContent = 'Save Changes';
        
        // Hide success message after a delay
        setTimeout(function() {
          document.getElementById('profile-success').classList.add('hidden');
        }, 5000);
      }, 1500);
      
      // In a real application, you would use fetch API to send the data:
      /*
      fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        // Handle success
        document.getElementById('profile-success').classList.remove('hidden');
        updateInitials(formData.firstName, formData.lastName);
        
        document.getElementById('save-profile').disabled = false;
        document.getElementById('save-profile').textContent = 'Save Changes';
        
        setTimeout(function() {
          document.getElementById('profile-success').classList.add('hidden');
        }, 5000);
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
        document.getElementById('save-profile').disabled = false;
        document.getElementById('save-profile').textContent = 'Save Changes';
      });
      */
    }
  });
</script>
{{< /rawhtml >}}