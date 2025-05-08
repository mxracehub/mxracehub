---
title: "Login"
description: "Sign in to your MXRaceHub account"
layout: "single"
---

{{< rawhtml >}}
<div class="flex min-h-[calc(100vh-200px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    <div class="text-center">
      <h2 class="mt-6 text-3xl font-bold tracking-tight">Sign in to your account</h2>
      <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Or
        <a href="/account/register/" class="font-medium text-primary hover:text-primary-700">
          create a new account
        </a>
      </p>
    </div>
    
    <div class="mt-8">
      <div class="bg-white dark:bg-neutral-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div id="login-error" class="error-message hidden">
          <div class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700 dark:text-red-400" id="login-error-message">Invalid username or password. Please try again.</p>
              </div>
            </div>
          </div>
        </div>

        <form id="login-form" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Username
            </label>
            <div class="mt-1">
              <input id="username" name="username" type="text" required
                class="block w-full appearance-none rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:bg-neutral-700 sm:text-sm">
            </div>
            <div id="username-error" class="text-xs text-red-500 mt-1 hidden"></div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <div class="mt-1">
              <input id="password" name="password" type="password" required
                class="block w-full appearance-none rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-2 placeholder-neutral-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:bg-neutral-700 sm:text-sm">
            </div>
            <div id="password-error" class="text-xs text-red-500 mt-1 hidden"></div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox"
                class="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary dark:border-neutral-700">
              <label for="remember-me" class="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="/account/forgot-password/" class="font-medium text-primary hover:text-primary-700">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" id="login-button"
              class="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Sign in
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white dark:bg-neutral-800 px-2 text-neutral-500">
                Or continue with
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-3">
            <a href="#" id="google-signin"
              class="inline-flex w-full justify-center rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-700">
              <span class="sr-only">Sign in with Google</span>
              <svg class="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                  fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="text-center text-sm text-neutral-600 dark:text-neutral-400">
      By signing in, you agree to our 
      <a href="/terms-of-service/" class="font-medium text-primary hover:text-primary-700">Terms of Service</a> 
      and 
      <a href="/privacy-policy/" class="font-medium text-primary hover:text-primary-700">Privacy Policy</a>.
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');
    const loginError = document.getElementById('login-error');
    const loginErrorMessage = document.getElementById('login-error-message');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        loginError.classList.add('hidden');
        usernameError.classList.add('hidden');
        passwordError.classList.add('hidden');
        
        // Get form data
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Validate form
        let isValid = true;
        
        if (!username) {
          usernameError.textContent = 'Please enter your username';
          usernameError.classList.remove('hidden');
          isValid = false;
        }
        
        if (!password) {
          passwordError.textContent = 'Please enter your password';
          passwordError.classList.remove('hidden');
          isValid = false;
        }
        
        if (!isValid) {
          return;
        }
        
        // Disable button and show loading state
        loginButton.disabled = true;
        loginButton.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Signing in...
        `;
        
        // Send login request
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
            rememberMe
          }),
          credentials: 'include'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Invalid username or password');
          }
          return response.json();
        })
        .then(data => {
          // Login successful, redirect to dashboard or home
          window.location.href = '/account/profile/';
        })
        .catch(error => {
          // Reset button
          loginButton.disabled = false;
          loginButton.innerHTML = 'Sign in';
          
          // Show error message
          loginErrorMessage.textContent = error.message;
          loginError.classList.remove('hidden');
        });
      });
    }
    
    // Google Sign In
    const googleSignInButton = document.getElementById('google-signin');
    if (googleSignInButton) {
      googleSignInButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // In a real implementation, this would redirect to Google OAuth
        alert('Google sign-in integration would be implemented here');
      });
    }
    
    // Check if user is already logged in
    function checkLoginStatus() {
      fetch('/api/user', {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          // User is already logged in, redirect to profile
          window.location.href = '/account/profile/';
        }
      })
      .catch(error => {
        // Not logged in, stay on login page
        console.log('Not logged in');
      });
    }
    
    // Check login status when the page loads
    checkLoginStatus();
  });
</script>
{{< /rawhtml >}}