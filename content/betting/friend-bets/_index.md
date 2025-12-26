---
title: "Friend Bets"
description: "Challenge your friends to head-to-head wagers on Supercross and Motocross races"
layout: "list"
---

# Friend Bets

Challenge your friends directly with custom head-to-head wagers. Create personalized bets on race outcomes, rider performance, or any other aspect of Supercross and Motocross racing. Settle bets automatically through our secure platform.

<div class="bg-primary/10 border border-primary/20 rounded-lg p-6 my-8">
  <h2 class="text-xl font-bold mb-4">Current Membership Status: <span class="text-neutral-500">Not Logged In</span></h2>
  <p class="mb-4">Sign in or create an account to start challenging friends.</p>
  <div class="flex space-x-4">
    <a href="/account/login/" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-700">Sign In</a>
    <a href="/account/register/" class="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded hover:bg-neutral-300 dark:hover:bg-neutral-600">Create Account</a>
  </div>
</div>

## How Friend Bets Work

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
  <div class="p-5 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-center">
    <div class="mb-4 flex justify-center">
      <div class="rounded-full bg-primary/10 p-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      </div>
    </div>
    <h3 class="text-lg font-bold mb-2">1. Create a Bet</h3>
    <p class="text-neutral-600 dark:text-neutral-400">Propose a wager with custom terms, stake amount, and select a friend to challenge.</p>
  </div>
  
  <div class="p-5 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-center">
    <div class="mb-4 flex justify-center">
      <div class="rounded-full bg-primary/10 p-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <polyline points="17 11 19 13 23 9"></polyline>
        </svg>
      </div>
    </div>
    <h3 class="text-lg font-bold mb-2">2. Friend Accepts</h3>
    <p class="text-neutral-600 dark:text-neutral-400">Your friend receives the challenge and can accept, decline, or counter-offer.</p>
  </div>
  
  <div class="p-5 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-center">
    <div class="mb-4 flex justify-center">
      <div class="rounded-full bg-primary/10 p-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      </div>
    </div>
    <h3 class="text-lg font-bold mb-2">3. Automatic Settlement</h3>
    <p class="text-neutral-600 dark:text-neutral-400">After the event, MXRaceHub automatically settles the bet and transfers winnings.</p>
  </div>
</div>

## Create a New Friend Bet

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6 my-8">
  <h3 class="text-xl font-bold mb-4">Challenge a Friend</h3>
  <p class="mb-6">Choose an event, specify your prediction, and select a friend to challenge. Customize your wager amount and terms.</p>
  
  <form id="friend-bet-form" data-form-type="friend-bet" class="form-autosave">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
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
          <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Bet Type</label>
          <div class="relative">
            <select id="bet-type" name="betType" class="w-full appearance-none bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2 pr-8">
              <option value="race-winner">Race Winner</option>
              <option value="head-to-head">Head-to-Head Rider Matchup</option>
              <option value="custom">Custom Proposition</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700 dark:text-neutral-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
        
        <div id="race-winner-prediction" class="mb-4">
          <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Your Prediction</label>
          <div class="relative">
            <select id="rider-prediction" name="selectedRiderId" class="w-full appearance-none bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2 pr-8">
              <option value="jett-lawrence">Jett Lawrence</option>
              <option value="chase-sexton">Chase Sexton</option>
              <option value="eli-tomac">Eli Tomac</option>
              <option value="cooper-webb">Cooper Webb</option>
              <option value="aaron-plessinger">Aaron Plessinger</option>
              <option value="justin-barcia">Justin Barcia</option>
              <option value="jason-anderson">Jason Anderson</option>
              <option value="malcolm-stewart">Malcolm Stewart</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700 dark:text-neutral-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
        
        <div id="head-to-head-prediction" class="mb-4 hidden">
          <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Rider Matchup</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">Rider 1</label>
              <div class="relative">
                <select id="rider1-select" name="riderOneId" class="w-full appearance-none bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2 pr-8">
                  <option value="jett-lawrence">Jett Lawrence</option>
                  <option value="chase-sexton">Chase Sexton</option>
                  <option value="eli-tomac">Eli Tomac</option>
                  <option value="cooper-webb">Cooper Webb</option>
                  <option value="aaron-plessinger">Aaron Plessinger</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700 dark:text-neutral-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">Rider 2</label>
              <div class="relative">
                <select id="rider2-select" name="riderTwoId" class="w-full appearance-none bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2 pr-8">
                  <option value="chase-sexton">Chase Sexton</option>
                  <option value="jett-lawrence">Jett Lawrence</option>
                  <option value="eli-tomac">Eli Tomac</option>
                  <option value="cooper-webb">Cooper Webb</option>
                  <option value="aaron-plessinger">Aaron Plessinger</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700 dark:text-neutral-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <label class="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">Your Pick</label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input type="radio" name="rider-pick" value="rider1" class="form-radio" checked>
                <span class="ml-2" id="rider1-name">Jett Lawrence</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" name="rider-pick" value="rider2" class="form-radio">
                <span class="ml-2" id="rider2-name">Chase Sexton</span>
              </label>
            </div>
          </div>
        </div>
        
        <div id="custom-prediction" class="mb-4 hidden">
          <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Custom Proposition</label>
          <textarea id="custom-prop" name="prediction" rows="3" class="w-full bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2" placeholder="e.g., Jett Lawrence will lead more than 10 laps"></textarea>
        </div>
      </div>
      
      <div>
        <div class="mb-4">
          <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Challenge Friend</label>
          <div class="relative">
            <select id="friend-select" name="friendId" class="w-full appearance-none bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2 pr-8">
              <option value="">Select a friend</option>
              <option value="john-doe">John Doe</option>
              <option value="jane-smith">Jane Smith</option>
              <option value="mike-johnson">Mike Johnson</option>
              <option value="sarah-williams">Sarah Williams</option>
              <option value="david-brown">David Brown</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700 dark:text-neutral-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Wager Amount</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">$</span>
            <input type="number" id="wager-amount" name="wagerAmount" min="5" step="5" value="50" class="w-full bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2 pl-8">
          </div>
          <div class="text-xs text-neutral-500 mt-1">* Non-premium members pay a 1% platform fee</div>
        </div>
        
        <div class="mb-4">
          <label class="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium">Custom Terms (Optional)</label>
          <textarea id="custom-terms" name="customTerms" placeholder="Add any additional terms or conditions here..." class="w-full bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded px-4 py-2 h-20"></textarea>
        </div>
        
        <div id="bet-summary" class="mb-4 p-4 bg-primary/10 border border-primary/20 rounded hidden">
          <h4 class="font-bold mb-2">Bet Summary</h4>
          <div id="summary-content"></div>
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
      <button id="preview-bet" type="button" class="px-6 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-4">Preview Bet</button>
      <button id="create-bet" type="submit" class="px-6 py-2 bg-primary text-white rounded hover:bg-primary-700">Create Bet</button>
    </div>
  </form>
  
  <div id="success-message" class="mt-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded hidden">
    <div class="flex items-start">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      <div>
        <p class="font-bold">Bet Created Successfully!</p>
        <p class="text-sm mt-1">Your friend will be notified about this bet. You can track its status in your active bets.</p>
      </div>
    </div>
  </div>
  
  <script src="/js/friend-bets.js"></script>
  <script src="/js/bet-forms-autosave.js"></script>
</div>

## Active Friend Bets

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6 my-8">
  <h3 class="text-xl font-bold mb-4">Your Active Bets</h3>
  <p class="text-neutral-600 dark:text-neutral-400 italic mb-6">Sign in to view your active friend bets.</p>
  
  <div class="flex flex-col items-center justify-center py-8">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-neutral-400 mb-4">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
    <p class="text-neutral-500">No active bets to display</p>
    <p class="text-sm text-neutral-500 mt-2">Sign in and challenge a friend to see your bets here</p>
  </div>
</div>

## Premium Benefits for Friend Bets

<div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg my-8">
  <div class="p-6">
    <h3 class="text-xl font-bold mb-3">MXRaceHub Premium Membership</h3>
    <p class="mb-4">Upgrade to a premium membership to enjoy enhanced friend betting features.</p>
    
    <div class="space-y-2 mb-6">
      <div class="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 mr-2 mt-1 flex-shrink-0">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>No 1% platform fee on friend bets</span>
      </div>
      <div class="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 mr-2 mt-1 flex-shrink-0">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Create unlimited custom proposition bets</span>
      </div>
      <div class="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 mr-2 mt-1 flex-shrink-0">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Access to detailed bet history and statistics</span>
      </div>
    </div>
    
    <div class="flex justify-between items-center border-t border-neutral-200 dark:border-neutral-700 pt-4">
      <div>
        <div class="text-2xl font-bold text-primary">$5<span class="text-sm text-neutral-500">/month</span></div>
        <div class="text-sm">or $50/year (save $10)</div>
      </div>
      <a href="/membership/premium/" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-700">Upgrade Now</a>
    </div>
  </div>
</div>

## Friend Bet FAQ

<div class="space-y-6 my-8">
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-5">
    <h3 class="font-bold mb-2">How are friend bets settled?</h3>
    <p class="text-neutral-600 dark:text-neutral-400">Friend bets are automatically settled by our system after official race results are posted. For custom proposition bets, both parties must confirm the outcome.</p>
  </div>
  
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-5">
    <h3 class="font-bold mb-2">Is there a fee for friend bets?</h3>
    <p class="text-neutral-600 dark:text-neutral-400">Standard accounts incur a 1% platform fee on all friend bets. Premium members have this fee waived entirely.</p>
  </div>
  
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-5">
    <h3 class="font-bold mb-2">Can I create custom bets on any outcome?</h3>
    <p class="text-neutral-600 dark:text-neutral-400">Yes! Friend bets allow for complete customization. Create wagers on race winners, rider matchups, lap times, or any other verifiable outcome.</p>
  </div>
  
  <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-5">
    <h3 class="font-bold mb-2">How do I add friends?</h3>
    <p class="text-neutral-600 dark:text-neutral-400">You can search for friends by username in the account settings or send them an invite link. Once connected, you can challenge them to bets.</p>
  </div>
</div>

<div class="text-center my-8">
  <a href="/account/register/" class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 font-medium">Create Account to Start Betting</a>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get form elements
  const betTypeSelect = document.getElementById('bet-type');
  const raceWinnerPrediction = document.getElementById('race-winner-prediction');
  const headToHeadPrediction = document.getElementById('head-to-head-prediction');
  const customPrediction = document.getElementById('custom-prediction');
  const previewButton = document.getElementById('preview-bet');
  const createButton = document.getElementById('create-bet');
  const betSummary = document.getElementById('bet-summary');
  const summaryContent = document.getElementById('summary-content');
  const successMessage = document.getElementById('success-message');
  
  // Rider selection elements for head-to-head
  const rider1Select = document.getElementById('rider1-select');
  const rider2Select = document.getElementById('rider2-select');
  const rider1Name = document.getElementById('rider1-name');
  const rider2Name = document.getElementById('rider2-name');
  
  // Event handlers for bet type selection
  if (betTypeSelect) {
    betTypeSelect.addEventListener('change', function() {
      // Hide all prediction types first
      raceWinnerPrediction.classList.add('hidden');
      headToHeadPrediction.classList.add('hidden');
      customPrediction.classList.add('hidden');
      
      // Show the selected prediction type
      const selectedType = this.value;
      if (selectedType === 'race-winner') {
        raceWinnerPrediction.classList.remove('hidden');
      } else if (selectedType === 'head-to-head') {
        headToHeadPrediction.classList.remove('hidden');
      } else if (selectedType === 'custom') {
        customPrediction.classList.remove('hidden');
      }
    });
  }
  
  // Update rider names in head-to-head selection
  if (rider1Select && rider2Select) {
    rider1Select.addEventListener('change', function() {
      rider1Name.textContent = this.options[this.selectedIndex].text;
    });
    
    rider2Select.addEventListener('change', function() {
      rider2Name.textContent = this.options[this.selectedIndex].text;
    });
  }
  
  // Preview bet
  if (previewButton) {
    previewButton.addEventListener('click', function() {
      // Get form values
      const eventSelect = document.getElementById('event-select');
      const eventName = eventSelect.options[eventSelect.selectedIndex].text;
      const betType = betTypeSelect.value;
      const friendSelect = document.getElementById('friend-select');
      const friendName = friendSelect.options[friendSelect.selectedIndex].text;
      const wagerAmount = document.getElementById('wager-amount').value;
      const customTerms = document.getElementById('custom-terms').value;
      
      // Validate form
      if (!friendName || friendSelect.value === '') {
        alert('Please select a friend to challenge.');
        return;
      }
      
      if (!wagerAmount || wagerAmount < 5) {
        alert('Please enter a valid wager amount (minimum $5).');
        return;
      }
      
      // Generate prediction text based on bet type
      let predictionText = '';
      if (betType === 'race-winner') {
        const riderSelect = document.getElementById('rider-prediction');
        const riderName = riderSelect.options[riderSelect.selectedIndex].text;
        predictionText = `${riderName} will win the race`;
      } else if (betType === 'head-to-head') {
        const selectedRider = document.querySelector('input[name="rider-pick"]:checked').value;
        const rider1 = rider1Select.options[rider1Select.selectedIndex].text;
        const rider2 = rider2Select.options[rider2Select.selectedIndex].text;
        const pickedRider = selectedRider === 'rider1' ? rider1 : rider2;
        predictionText = `${pickedRider} will finish ahead of ${selectedRider === 'rider1' ? rider2 : rider1}`;
      } else if (betType === 'custom') {
        const customProp = document.getElementById('custom-prop').value;
        if (!customProp) {
          alert('Please enter a custom proposition.');
          return;
        }
        predictionText = customProp;
      }
      
      // Display bet summary
      let summaryHTML = `
        <div class="space-y-2">
          <div><strong>Event:</strong> ${eventName}</div>
          <div><strong>Your Prediction:</strong> ${predictionText}</div>
          <div><strong>Challenged Friend:</strong> ${friendName}</div>
          <div><strong>Wager Amount:</strong> $${parseFloat(wagerAmount).toFixed(2)}</div>
      `;
      
      if (customTerms) {
        summaryHTML += `<div><strong>Additional Terms:</strong> ${customTerms}</div>`;
      }
      
      summaryHTML += `</div>`;
      
      summaryContent.innerHTML = summaryHTML;
      betSummary.classList.remove('hidden');
      
      // Scroll to summary
      betSummary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  
  // Create bet
  if (createButton) {
    createButton.addEventListener('click', function() {
      // First trigger preview if summary is hidden
      if (betSummary.classList.contains('hidden')) {
        previewButton.click();
        return;
      }
      
      // Show loading state
      createButton.disabled = true;
      createButton.textContent = 'Creating Bet...';
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Show success message
        successMessage.classList.remove('hidden');
        
        // Reset form
        const eventSelect = document.getElementById('event-select');
        const betType = document.getElementById('bet-type');
        const friendSelect = document.getElementById('friend-select');
        const wagerAmount = document.getElementById('wager-amount');
        const customTerms = document.getElementById('custom-terms');
        
        eventSelect.selectedIndex = 0;
        betType.selectedIndex = 0;
        friendSelect.selectedIndex = 0;
        wagerAmount.value = '50';
        customTerms.value = '';
        
        // Hide bet summary
        betSummary.classList.add('hidden');
        
        // Restore button state
        createButton.disabled = false;
        createButton.textContent = 'Create Bet';
        
        // Show only race winner prediction (default)
        raceWinnerPrediction.classList.remove('hidden');
        headToHeadPrediction.classList.add('hidden');
        customPrediction.classList.add('hidden');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 5000);
      }, 1500);
    });
  }
});
</script>