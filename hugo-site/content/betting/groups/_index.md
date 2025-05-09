---
title: "Betting Groups"
description: "Join or create betting groups with friends to place friendly wagers on races"
---

<div class="betting-groups-container">
  <div class="hero-section">
    <h1>MX Betting Groups</h1>
    <p class="subtitle">Race together. Bet together. Win together.</p>
    <div class="cta-buttons">
      <a href="#create-group" class="cta-button create">Create a Group</a>
      <a href="#join-group" class="cta-button join">Join a Group</a>
    </div>
  </div>
  
  <div class="features-section">
    <div class="feature-card">
      <div class="feature-icon">🏁</div>
      <h3>Private Competitions</h3>
      <p>Create exclusive betting pools for friends and family with custom entry fees and prize distributions.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">📊</div>
      <h3>Real-time Leaderboards</h3>
      <p>Track your performance against friends with live updating rankings and season-long championship tables.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">💰</div>
      <h3>Flexible Betting</h3>
      <p>Place bets using real money, virtual currency, or just for bragging rights - you decide how your group plays.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">📱</div>
      <h3>Mobile Friendly</h3>
      <p>Bet from anywhere with our responsive mobile design. Perfect for making last-minute picks at the track.</p>
    </div>
  </div>
  
  <div id="create-group" class="create-group-section">
    <h2>Create a New Betting Group</h2>
    <p class="section-desc">Start your own private betting circle with friends, family, or fellow race fans.</p>
    
    <form id="create-group-form" class="group-form">
      <div class="form-group">
        <label for="group-name">Group Name</label>
        <input type="text" id="group-name" placeholder="The Moto Maniacs" minlength="3" maxlength="50" required>
        <div id="group-name-error" class="error-message"></div>
      </div>
      
      <div class="form-group">
        <label for="group-type">Group Type</label>
        <select id="group-type" required>
          <option value="">Select Type</option>
          <option value="friendly">Friendly (No Money)</option>
          <option value="low-stakes">Low Stakes ($1-$25)</option>
          <option value="medium-stakes">Medium Stakes ($25-$100)</option>
          <option value="high-stakes">High Stakes ($100+)</option>
        </select>
        <div id="group-type-error" class="error-message"></div>
      </div>
      
      <div class="form-group">
        <label for="series">Championship Series</label>
        <select id="series" required>
          <option value="">Select Series</option>
          <option value="sx">Supercross</option>
          <option value="mx">Pro Motocross</option>
          <option value="smx">SuperMotocross</option>
          <option value="mxgp">MXGP</option>
          <option value="all">All Series</option>
        </select>
        <div id="series-error" class="error-message"></div>
      </div>
      
      <div class="form-group">
        <label for="privacy">Privacy Setting</label>
        <select id="privacy" required>
          <option value="">Select Privacy</option>
          <option value="public">Public (Anyone can join)</option>
          <option value="invite">Invite Only (Require code)</option>
          <option value="private">Private (Admin approval)</option>
        </select>
        <div id="privacy-error" class="error-message"></div>
      </div>
      
      <div class="form-group full-width">
        <label for="description">Group Description</label>
        <textarea id="description" placeholder="Tell potential members about your group..." rows="3" maxlength="500"></textarea>
        <div class="hint-text">Maximum 500 characters. <span id="chars-left">500</span> characters left.</div>
      </div>
      
      <div id="invite-code-section" class="form-group full-width hidden">
        <label>Group Invite Code</label>
        <div class="invite-code-display">
          <span id="generated-code">-----</span>
          <button type="button" id="regenerate-code" class="code-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
          </button>
          <button type="button" id="copy-code" class="code-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
        <div class="hint-text">Share this code with friends you want to invite to your group.</div>
      </div>
      
      <div class="form-actions">
        <button type="submit" id="submit-group" class="submit-btn">Create Group</button>
      </div>
    </form>
    
    <div id="group-success" class="success-message hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <div class="success-content">
        <h3>Group Created Successfully!</h3>
        <p>Your group "<span id="created-group-name"></span>" has been created and is ready for members to join.</p>
        <div class="success-actions">
          <a href="#" id="view-group-link" class="view-group-btn">View Group</a>
          <button type="button" id="create-another" class="create-another-btn">Create Another Group</button>
        </div>
      </div>
    </div>
  </div>
  
  <div id="join-group" class="join-group-section">
    <h2>Join an Existing Group</h2>
    <p class="section-desc">Enter an invite code to join a private group or browse public betting groups.</p>
    
    <div class="invite-code-form">
      <input type="text" placeholder="Enter group invite code" class="invite-code-input">
      <button type="button" class="join-btn">Join Group</button>
    </div>
    
    <h3 class="public-groups-heading">Popular Public Groups</h3>
    
    <div class="groups-list">
      <div class="group-item">
        <div class="group-info">
          <h4>The Official MXRaceHub Community</h4>
          <p class="group-meta">
            <span class="meta-item"><strong>145</strong> members</span>
            <span class="meta-item"><strong>Supercross</strong></span>
            <span class="meta-item"><strong>Friendly</strong></span>
          </p>
          <p class="group-desc">The largest betting group on MXRaceHub! Join fellow motocross fans and test your prediction skills.</p>
        </div>
        <a href="#" class="join-link">Join</a>
      </div>
      
      <div class="group-item">
        <div class="group-info">
          <h4>Pro Picks Challenge</h4>
          <p class="group-meta">
            <span class="meta-item"><strong>78</strong> members</span>
            <span class="meta-item"><strong>All Series</strong></span>
            <span class="meta-item"><strong>Low Stakes</strong></span>
          </p>
          <p class="group-desc">Think you know better than the pros? Join our weekly challenge and put your knowledge to the test!</p>
        </div>
        <a href="#" class="join-link">Join</a>
      </div>
      
      <div class="group-item">
        <div class="group-info">
          <h4>MX Fantasy Experts</h4>
          <p class="group-meta">
            <span class="meta-item"><strong>42</strong> members</span>
            <span class="meta-item"><strong>Pro Motocross</strong></span>
            <span class="meta-item"><strong>Medium Stakes</strong></span>
          </p>
          <p class="group-desc">A competitive group for serious MX fans. Weekly payouts and season-long competition.</p>
        </div>
        <a href="#" class="join-link">Join</a>
      </div>
    </div>
  </div>
  
  <div class="faq-section">
    <h2>Frequently Asked Questions</h2>
    
    <div class="faq-item">
      <h3 class="faq-question">How do betting groups work?</h3>
      <div class="faq-answer">
        <p>Betting groups allow you to create private competitions among friends. Group administrators can set custom rules, entry fees, and prize structures. Members place bets on upcoming races and earn points based on the accuracy of their predictions.</p>
      </div>
    </div>
    
    <div class="faq-item">
      <h3 class="faq-question">Is betting with real money allowed?</h3>
      <div class="faq-answer">
        <p>Yes, groups can choose to bet with real money, however all financial transactions occur outside of the MXRaceHub platform. We simply provide the infrastructure for tracking bets and results. Be sure to check local gambling laws in your jurisdiction before participating in any money-based betting.</p>
      </div>
    </div>
    
    <div class="faq-item">
      <h3 class="faq-question">How are winners determined?</h3>
      <div class="faq-answer">
        <p>Winners are determined based on the rules set by each group. Typically, members earn points for correctly predicting race outcomes such as podium finishers, holeshot winners, or fastest qualifiers. Some groups operate on a per-race basis, while others maintain season-long competitions.</p>
      </div>
    </div>
    
    <div class="faq-item">
      <h3 class="faq-question">Can I be in multiple betting groups?</h3>
      <div class="faq-answer">
        <p>Absolutely! You can join as many betting groups as you'd like. This allows you to participate in different types of competitions simultaneously, from casual friendly bets to more serious competitions.</p>
      </div>
    </div>
  </div>

  <div class="create-bet-section">
    <h2>Create Group Bet</h2>
    <p class="section-desc">Create a custom bet for your group. Set up multiple options and invite members to participate.</p>
    
    <form id="group-bet-form" data-form-type="group-bet" class="form-autosave">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div class="mb-4">
            <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Select Group</label>
            <div class="relative">
              <select id="group-select" name="groupId" class="w-full appearance-none bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2 pr-8">
                <option value="mx-squad">MX Squad</option>
                <option value="weekend-warriors">Weekend Warriors</option>
                <option value="team-tomac">Team Tomac</option>
                <option value="450-fanatics">450 Fanatics</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700 dark:text-neutral-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Select Event</label>
            <div class="relative">
              <select id="event-select" name="eventId" class="w-full appearance-none bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2 pr-8">
                <option value="seattle-2025">Seattle Supercross - March 8, 2025</option>
                <option value="indianapolis-2025">Indianapolis Supercross - March 1, 2025</option>
                <option value="daytona-2025">Daytona Supercross - February 22, 2025</option>
                <option value="arlington-2025">Arlington Supercross - February 15, 2025</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700 dark:text-neutral-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Bet Title</label>
            <input id="bet-title" name="title" type="text" placeholder="e.g., Who will lead the most laps?" class="w-full bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2">
          </div>
          
          <div class="mb-4">
            <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Description (Optional)</label>
            <textarea id="bet-description" name="description" rows="3" placeholder="Provide additional details about this bet..." class="w-full bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2"></textarea>
          </div>
          
          <div class="mb-4">
            <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Entry Deadline</label>
            <input id="deadline-date" name="deadlineDate" type="datetime-local" class="w-full bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2">
          </div>
        </div>
        
        <div>
          <div class="mb-4">
            <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Betting Options</label>
            <div id="options-list" class="options-container">
              <div class="mb-3 p-3 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded option-item">
                <div class="flex items-center mb-2">
                  <span class="font-medium">Option 1</span>
                  <button type="button" class="ml-auto text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 remove-option">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <input type="text" name="options[0][title]" placeholder="Option title" class="w-full mb-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-1.5 option-title">
                <input type="text" name="options[0][description]" placeholder="Option description (optional)" class="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-1.5 option-description">
              </div>
              
              <div class="mb-3 p-3 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded option-item">
                <div class="flex items-center mb-2">
                  <span class="font-medium">Option 2</span>
                  <button type="button" class="ml-auto text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 remove-option">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <input type="text" name="options[1][title]" placeholder="Option title" class="w-full mb-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-1.5 option-title">
                <input type="text" name="options[1][description]" placeholder="Option description (optional)" class="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-1.5 option-description">
              </div>
            </div>
            
            <button type="button" id="add-option" class="mt-2 flex items-center text-primary hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Another Option
            </button>
          </div>

          <div class="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 p-3 rounded mt-4 mb-4">
            <p class="text-sm font-medium">Important Notes:</p>
            <ul class="text-xs mt-1 list-disc list-inside">
              <li>All group members can participate in this bet</li>
              <li>Each member can only select one option and place one wager</li>
              <li>Non-premium members pay a 1% platform fee on winnings</li>
              <li>You'll determine the winning option after the event</li>
            </ul>
          </div>
          
          <div class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 p-3 rounded mt-4 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm">Your form progress is automatically saved to your account</span>
          </div>
        </div>
      </div>
      
      <div class="mt-6 text-center">
        <button id="create-group-bet" type="submit" class="px-6 py-2 bg-primary text-white rounded hover:bg-primary-700">Create Group Bet</button>
      </div>
    </form>
    
    <div id="success-message" class="mt-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded hidden">
      <div class="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <div>
          <p class="font-bold">Group Bet Created Successfully!</p>
          <p class="text-sm mt-1">All group members have been notified. They can now participate by placing their bets.</p>
        </div>
      </div>
    </div>
    
    <script src="/js/group-bets.js"></script>
    <script src="/js/bet-forms-autosave.js"></script>
  </div>
</div>

<style>
  .betting-groups-container {
    max-width: 1200px;
    margin: 0 auto;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .hero-section {
    text-align: center;
    padding: 3rem 1rem;
    margin-bottom: 3rem;
    background-color: #f8f9fa;
    border-radius: 12px;
  }
  
  .hero-section h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  .subtitle {
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 2rem;
  }
  
  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .cta-button {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.3s ease;
  }
  
  .cta-button.create {
    background-color: #E2001A;
    color: white;
  }
  
  .cta-button.join {
    background-color: #333;
    color: white;
  }
  
  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
  
  .features-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }
  
  .feature-card {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    text-align: center;
  }
  
  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .feature-card h3 {
    margin-bottom: 1rem;
    color: #333;
  }
  
  .feature-card p {
    color: #666;
    line-height: 1.6;
  }
  
  .create-group-section, .join-group-section {
    margin-bottom: 4rem;
    padding: 2rem;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  }
  
  .section-desc {
    margin-bottom: 2rem;
    color: #666;
  }
  
  .group-form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .full-width {
    grid-column: span 2;
  }
  
  label {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, select, textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .form-actions {
    grid-column: span 2;
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  
  .submit-btn {
    padding: 0.75rem 2rem;
    background-color: #E2001A;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-btn:hover {
    background-color: #c1001e;
  }
  
  .success-message {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background-color: #f0fff4;
    border: 1px solid #68d391;
    border-radius: 8px;
    margin-top: 2rem;
  }
  
  .success-message svg {
    color: #38a169;
    flex-shrink: 0;
  }
  
  .success-content {
    flex-grow: 1;
  }
  
  .success-content h3 {
    color: #276749;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  .success-content p {
    color: #2f855a;
    margin-bottom: 1rem;
  }
  
  .success-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .view-group-btn, .create-another-btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
  }
  
  .view-group-btn {
    background-color: #38a169;
    color: white;
    text-decoration: none;
  }
  
  .create-another-btn {
    background-color: #e2e8f0;
    color: #4a5568;
    border: none;
  }
  
  .view-group-btn:hover {
    background-color: #2f855a;
  }
  
  .create-another-btn:hover {
    background-color: #cbd5e0;
  }
  
  .error-message {
    color: #e53e3e;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  
  .hint-text {
    color: #718096;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  
  .invite-code-display {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  #generated-code {
    font-family: monospace;
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
    flex-grow: 1;
    letter-spacing: 0.1em;
  }
  
  .code-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    background-color: #edf2f7;
    color: #4a5568;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .code-button:hover {
    background-color: #e2e8f0;
    color: #2d3748;
  }
  
  .invite-code-form {
    display: flex;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
  
  .invite-code-input {
    flex: 1;
  }
  
  .join-btn {
    padding: 0.75rem 1.5rem;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .join-btn:hover {
    background-color: #555;
  }
  
  .public-groups-heading {
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .groups-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 5px solid #E2001A;
  }
  
  .group-info h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  
  .group-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #666;
  }
  
  .group-desc {
    margin: 0;
    color: #666;
    max-width: 700px;
  }
  
  .join-link {
    padding: 0.5rem 1.5rem;
    background-color: #333;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .join-link:hover {
    background-color: #555;
  }
  
  .faq-section {
    margin-bottom: 4rem;
  }
  
  .faq-item {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1.5rem;
  }
  
  .faq-question {
    margin-bottom: 0.75rem;
    color: #333;
    cursor: pointer;
  }
  
  .faq-answer {
    color: #666;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .group-form {
      grid-template-columns: 1fr;
    }
    
    .full-width {
      grid-column: span 1;
    }
    
    .invite-code-form {
      flex-direction: column;
    }
    
    .group-item {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .join-link {
      margin-top: 1rem;
      align-self: flex-start;
    }
  }
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Form elements
  const groupForm = document.getElementById('create-group-form');
  const groupName = document.getElementById('group-name');
  const groupType = document.getElementById('group-type');
  const series = document.getElementById('series');
  const privacy = document.getElementById('privacy');
  const description = document.getElementById('description');
  const charsLeft = document.getElementById('chars-left');
  const inviteCodeSection = document.getElementById('invite-code-section');
  const generatedCode = document.getElementById('generated-code');
  const regenerateCodeBtn = document.getElementById('regenerate-code');
  const copyCodeBtn = document.getElementById('copy-code');
  const groupSuccess = document.getElementById('group-success');
  const createdGroupName = document.getElementById('created-group-name');
  const createAnotherBtn = document.getElementById('create-another');
  
  // Error elements
  const groupNameError = document.getElementById('group-name-error');
  const groupTypeError = document.getElementById('group-type-error');
  const seriesError = document.getElementById('series-error');
  const privacyError = document.getElementById('privacy-error');
  
  // Character counter for description
  if (description && charsLeft) {
    description.addEventListener('input', function() {
      const remaining = this.maxLength - this.value.length;
      charsLeft.textContent = remaining;
      
      // Change color if getting low on characters
      if (remaining < 50) {
        charsLeft.style.color = '#e53e3e';
      } else {
        charsLeft.style.color = '#718096';
      }
    });
  }
  
  // Show/hide invite code section based on privacy setting
  if (privacy && inviteCodeSection) {
    privacy.addEventListener('change', function() {
      if (this.value === 'invite') {
        inviteCodeSection.classList.remove('hidden');
        generateInviteCode();
      } else {
        inviteCodeSection.classList.add('hidden');
      }
    });
  }
  
  // Generate random invite code
  function generateInviteCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    generatedCode.textContent = code;
    return code;
  }
  
  // Regenerate invite code
  if (regenerateCodeBtn) {
    regenerateCodeBtn.addEventListener('click', function() {
      generateInviteCode();
    });
  }
  
  // Copy invite code
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', function() {
      const code = generatedCode.textContent;
      navigator.clipboard.writeText(code).then(function() {
        // Show temporary copied confirmation
        const originalText = copyCodeBtn.innerHTML;
        copyCodeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        copyCodeBtn.style.backgroundColor = '#68d391';
        copyCodeBtn.style.color = 'white';
        
        setTimeout(function() {
          copyCodeBtn.innerHTML = originalText;
          copyCodeBtn.style.backgroundColor = '';
          copyCodeBtn.style.color = '';
        }, 2000);
      });
    });
  }
  
  // Form validation
  function validateForm() {
    let isValid = true;
    
    // Reset error messages
    groupNameError.textContent = '';
    groupTypeError.textContent = '';
    seriesError.textContent = '';
    privacyError.textContent = '';
    
    // Validate group name
    if (!groupName.value.trim()) {
      groupNameError.textContent = 'Group name is required';
      isValid = false;
    } else if (groupName.value.length < 3) {
      groupNameError.textContent = 'Group name must be at least 3 characters';
      isValid = false;
    }
    
    // Validate group type
    if (!groupType.value) {
      groupTypeError.textContent = 'Please select a group type';
      isValid = false;
    }
    
    // Validate series
    if (!series.value) {
      seriesError.textContent = 'Please select a championship series';
      isValid = false;
    }
    
    // Validate privacy
    if (!privacy.value) {
      privacyError.textContent = 'Please select a privacy setting';
      isValid = false;
    }
    
    return isValid;
  }
  
  // Form submission
  if (groupForm) {
    groupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm()) {
        // Show loading state
        const submitBtn = document.getElementById('submit-group');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Group...';
        
        // Simulate API call with timeout
        setTimeout(function() {
          // Show success message
          groupForm.classList.add('hidden');
          groupSuccess.classList.remove('hidden');
          
          // Set created group name
          createdGroupName.textContent = groupName.value;
          
          // Set view group link
          document.getElementById('view-group-link').href = '#group-' + groupName.value.toLowerCase().replace(/\s+/g, '-');
          
          // Scroll to success message
          groupSuccess.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
      }
    });
  }
  
  // Create another group button
  if (createAnotherBtn) {
    createAnotherBtn.addEventListener('click', function() {
      // Reset form
      groupForm.reset();
      
      // Hide success message and show form
      groupSuccess.classList.add('hidden');
      groupForm.classList.remove('hidden');
      
      // Reset character counter
      if (charsLeft) {
        charsLeft.textContent = '500';
        charsLeft.style.color = '#718096';
      }
      
      // Hide invite code section
      if (inviteCodeSection) {
        inviteCodeSection.classList.add('hidden');
      }
    });
  }
  
  // Join group functionality
  const joinGroupForm = document.querySelector('.invite-code-form');
  const joinGroupBtn = document.querySelector('.join-btn');
  const joinGroupInput = document.querySelector('.invite-code-input');
  
  if (joinGroupForm && joinGroupBtn && joinGroupInput) {
    joinGroupBtn.addEventListener('click', function() {
      const code = joinGroupInput.value.trim();
      
      if (!code) {
        alert('Please enter an invite code');
        return;
      }
      
      // Show loading state
      joinGroupBtn.disabled = true;
      joinGroupBtn.textContent = 'Joining...';
      
      // Simulate API call with timeout
      setTimeout(function() {
        // Display success message
        alert('Successfully joined the group!');
        
        // Reset input
        joinGroupInput.value = '';
        
        // Restore button state
        joinGroupBtn.disabled = false;
        joinGroupBtn.textContent = 'Join Group';
      }, 1500);
    });
  }
  
  // Public group join buttons
  const joinLinks = document.querySelectorAll('.join-link');
  
  joinLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get group name
      const groupName = this.closest('.group-item').querySelector('h4').textContent;
      
      // Show loading state
      this.textContent = 'Joining...';
      this.style.backgroundColor = '#718096';
      
      // Simulate API call with timeout
      const self = this;
      setTimeout(function() {
        // Display success message
        alert(`Successfully joined "${groupName}"!`);
        
        // Change text and style to indicate joined
        self.textContent = 'Joined';
        self.style.backgroundColor = '#68d391';
        self.style.cursor = 'default';
      }, 1500);
    });
  });
  
  // Accordion functionality for FAQ
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      
      // Toggle display of answer
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});
</script>