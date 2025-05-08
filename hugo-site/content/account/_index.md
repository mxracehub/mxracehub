---
title: "Account"
description: "Manage your MXRaceHub account, bets, and profile"
layout: "single"
---

<div class="bg-primary/10 border border-primary/20 rounded-lg p-6 my-8">
  <h2 class="text-xl font-bold mb-4">Current Account Status: <span class="text-neutral-500">Not Logged In</span></h2>
  <p class="mb-4">Sign in or create an account to access your profile and manage your bets.</p>
  <div class="flex space-x-4">
    <a href="/account/login/" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-700">Sign In</a>
    <a href="/account/register/" class="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded hover:bg-neutral-300 dark:hover:bg-neutral-600">Create Account</a>
  </div>
</div>

<div class="max-w-7xl mx-auto py-8">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white dark:bg-neutral-800 rounded-lg shadow p-6 text-center">
      <div class="rounded-full bg-primary/10 p-3 inline-block mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <h3 class="text-lg font-bold mb-2">Profile</h3>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">Manage your personal information, preferences, and payment methods.</p>
      <a href="/account/profile/" class="text-primary hover:text-primary-700 font-medium">View Profile</a>
    </div>
    
    <div class="bg-white dark:bg-neutral-800 rounded-lg shadow p-6 text-center">
      <div class="rounded-full bg-primary/10 p-3 inline-block mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
          <path d="M18 12H9"></path>
          <path d="M14 16h-5"></path>
        </svg>
      </div>
      <h3 class="text-lg font-bold mb-2">Betting History</h3>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">View your past bets, current active wagers, and betting performance.</p>
      <a href="/account/betting-history/" class="text-primary hover:text-primary-700 font-medium">View History</a>
    </div>
    
    <div class="bg-white dark:bg-neutral-800 rounded-lg shadow p-6 text-center">
      <div class="rounded-full bg-primary/10 p-3 inline-block mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="20" y1="8" x2="20" y2="14"></line>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
      </div>
      <h3 class="text-lg font-bold mb-2">Friends</h3>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">Manage your connections and send betting challenges to friends.</p>
      <a href="/account/friends/" class="text-primary hover:text-primary-700 font-medium">View Friends</a>
    </div>
  </div>
</div>

<div class="max-w-7xl mx-auto py-8">
  <div class="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden">
    <div class="px-6 py-5 border-b border-neutral-200 dark:border-neutral-700">
      <h3 class="text-lg font-bold">Account Features</h3>
    </div>
    <div class="p-6">
      <ul class="space-y-4">
        <li class="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 class="font-medium">Secure Betting Platform</h4>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm">Place wagers confidently with our SSL-secured platform and encrypted payment processing.</p>
          </div>
        </li>
        <li class="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 class="font-medium">Multiple Payment Options</h4>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm">Deposit and withdraw funds using credit cards, cryptocurrency, or direct bank transfers.</p>
          </div>
        </li>
        <li class="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 class="font-medium">Social Betting</h4>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm">Challenge friends directly or join betting groups for a more interactive experience.</p>
          </div>
        </li>
        <li class="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary flex-shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 class="font-medium">Betting Statistics</h4>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm">Track your betting performance with detailed analytics and historical results.</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="bg-neutral-100 dark:bg-neutral-800 py-12 my-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold">Upgrade to Premium</h2>
      <p class="text-neutral-600 dark:text-neutral-400 mt-2">Enhance your betting experience with premium features</p>
    </div>
    
    <div class="bg-white dark:bg-neutral-700 rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
      <div class="flex flex-col md:flex-row">
        <div class="p-6 md:w-3/5">
          <h3 class="text-xl font-bold mb-4">Premium Membership</h3>
          <ul class="space-y-2 mb-6">
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm">No betting fees (save 1%)</span>
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm">Advanced betting statistics</span>
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm">Unlimited betting groups</span>
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm">Expert predictions and insights</span>
            </li>
          </ul>
          <a href="/membership/premium/" class="text-primary hover:text-primary-700 text-sm font-medium">Learn more</a>
        </div>
        <div class="bg-primary/10 p-6 md:w-2/5 flex flex-col justify-center">
          <div class="text-center">
            <div class="text-2xl font-bold text-primary">$5<span class="text-sm text-neutral-500 dark:text-neutral-400">/month</span></div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-4">or $50/year (save $10)</p>
            <a href="/membership/premium/" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-700 inline-block">Upgrade Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="max-w-7xl mx-auto py-8">
  <div class="text-center">
    <h2 class="text-2xl font-bold mb-6">Need Help?</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <a href="/support/faq/" class="block bg-white dark:bg-neutral-800 rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-3 text-primary">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <h3 class="font-bold mb-1">FAQ</h3>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">Find answers to common questions</p>
      </a>
      
      <a href="/support/contact/" class="block bg-white dark:bg-neutral-800 rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-3 text-primary">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        <h3 class="font-bold mb-1">Contact Support</h3>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">Get help from our team</p>
      </a>
      
      <a href="/responsible-gambling/" class="block bg-white dark:bg-neutral-800 rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-3 text-primary">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <h3 class="font-bold mb-1">Responsible Gambling</h3>
        <p class="text-sm text-neutral-600 dark:text-neutral-400">Learn about safe betting practices</p>
      </a>
    </div>
  </div>
</div>