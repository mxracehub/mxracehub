/**
 * MXRaceHub Race Betting Form
 * 
 * This script handles the race betting form functionality, including:
 * - Loading race data from query parameters
 * - Populating rider odds
 * - Calculating potential winnings
 * - Form submission and validation
 */

// Race Bet Form Functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // DOM Elements
  const raceTitle = document.getElementById('race-title');
  const raceVenue = document.getElementById('race-venue').querySelector('.detail-value');
  const raceDate = document.getElementById('race-date').querySelector('.detail-value');
  const raceSeries = document.getElementById('race-series').querySelector('.detail-value');
  const ridersList = document.getElementById('riders-list');
  const betForm = document.getElementById('bet-form');
  const betAmount = document.getElementById('bet-amount');
  const betType = document.getElementById('bet-type');
  const friendSelect = document.getElementById('friend-select');
  const friendDetails = document.querySelector('.friend-bet-details');
  const potentialWinnings = document.getElementById('potential-winnings');
  const feeAmount = document.getElementById('fee-amount');
  
  // Modal Elements
  const confirmationModal = document.getElementById('confirmation-modal');
  const closeBtn = document.querySelector('.close-btn');
  const cancelBet = document.getElementById('cancel-bet');
  const confirmBet = document.getElementById('confirm-bet');
  const confirmRace = document.getElementById('confirm-race');
  const confirmRider = document.getElementById('confirm-rider');
  const confirmBetType = document.getElementById('confirm-bet-type');
  const confirmAmount = document.getElementById('confirm-amount');
  const confirmWinnings = document.getElementById('confirm-winnings');
  const confirmFee = document.getElementById('confirm-fee');
  const confirmFriendSection = document.getElementById('confirm-friend-section');
  const confirmFriend = document.getElementById('confirm-friend');
  const confirmMessage = document.getElementById('confirm-message');
  
  // Success Message Elements
  const successMessage = document.getElementById('success-message');
  const placeAnother = document.getElementById('place-another');
  
  // Variables
  let currentRace = null;
  let selectedRider = null;
  let selectedOdds = 0;
  
  // Initialize
  init();
  
  function init() {
    // Get race ID from query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const raceId = urlParams.get('race');
    
    if (raceId) {
      loadRaceData(raceId);
    } else {
      // Load the next upcoming race
      loadUpcomingRace();
    }

    const form = document.getElementById('bet-form');
    const betAmount = document.getElementById('bet-amount');
    const betType = document.getElementById('bet-type');
    const friendSelect = document.getElementById('friend-select');
    const potentialWinnings = document.getElementById('potential-winnings');
  
    // Auto-save functionality
    let saveTimeout;
    const autoSave = (formData) => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        localStorage.setItem('race-bet-draft', JSON.stringify(formData));
      }, 1000);
    };
  
    // Load saved draft
    const loadDraft = () => {
      const saved = localStorage.getItem('race-bet-draft');
      if (saved) {
        const data = JSON.parse(saved);
        Object.entries(data).forEach(([key, value]) => {
          const element = form.elements[key];
          if (element) element.value = value;
        });
      }
    };
  
    // Calculate potential winnings
    const calculateWinnings = () => {
      const amount = parseFloat(betAmount.value) || 0;
      const odds = parseFloat(form.querySelector('input[name="rider-selection"]:checked')?.dataset.odds || 0);
      potentialWinnings.textContent = `$${(amount * odds).toFixed(2)}`;
    };
  
    // Event listeners
    form.addEventListener('change', (e) => {
      const formData = Object.fromEntries(new FormData(form));
      autoSave(formData);
      calculateWinnings();
    });
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      formData.append('race', currentRace.url);
      formData.append('rider', form.querySelector('input[name="rider-selection"]:checked')?.value);
      formData.append('odds', form.querySelector('input[name="rider-selection"]:checked')?.dataset.odds);
      formData.append('bet_type', betType.value);
      formData.append('bet_amount', betAmount.value);

      if (friendSelect.value) {
          formData.append('friend', friendSelect.value);
          formData.append('message', document.getElementById('friend-message').value);
      }
  
      try {
        const response = await fetch('/api/bets/race', {
          method: 'POST',
          body: formData
        });
  
        if (!response.ok) throw new Error('Failed to place bet');
  
        // Clear draft after successful submission
        localStorage.removeItem('race-bet-draft');
  
        // Show success message
        document.getElementById('success-message').style.display = 'block';
      } catch (error) {
        console.error('Error placing bet:', error);
        alert('Failed to place bet. Please try again.');
      }
    });
  
    // Initialize
    loadDraft();
    
    // Modal event listeners (these are replaced by the new form submission logic, but keeping them in case needed)
    closeBtn.addEventListener('click', closeModal);
    cancelBet.addEventListener('click', closeModal);
    confirmBet.addEventListener('click', submitBet);
    placeAnother.addEventListener('click', resetForm);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === confirmationModal) {
        closeModal();
      }
      if (event.target === successMessage) {
        resetForm();
      }
    });
  }
  
  function loadRaceData(raceSlug) {
    // In a real implementation, this would fetch the race data from an API
    // For now, we'll use the race-updater.js data
    
    // Find the race data from our existing races
    const races = window.races || getDefaultRaces();
    
    // Find race by URL slug
    const race = races.find(race => {
      const url = race.url;
      return url.includes(raceSlug);
    });
    
    if (race) {
      displayRaceData(race);
    } else {
      // If race not found, load the first upcoming race
      loadUpcomingRace();
    }
  }
  
  function loadUpcomingRace() {
    // Get the next upcoming race
    const today = new Date();
    const races = window.races || getDefaultRaces();
    
    // Filter for upcoming races
    let upcomingRaces = races.filter(race => new Date(race.date) >= today);
    
    // If no upcoming races, use the first race in the array
    if (upcomingRaces.length === 0) {
      upcomingRaces = [races[0]];
    }
    
    // Sort by date and get the next race
    upcomingRaces.sort((a, b) => new Date(a.date) - new Date(b.date));
    const nextRace = upcomingRaces[0];
    
    if (nextRace) {
      displayRaceData(nextRace);
    } else {
      displayError("No race data available");
    }
  }
  
  function displayRaceData(race) {
    currentRace = race;
    
    // Update race info
    raceTitle.textContent = race.title;
    raceVenue.textContent = race.venue;
    
    // Format date
    const raceDateTime = new Date(race.date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    raceDate.textContent = raceDateTime.toLocaleDateString('en-US', options);
    
    raceSeries.textContent = race.series;
    
    // Populate riders and odds
    populateRiders(race.odds);
  }
  
  function populateRiders(odds) {
    ridersList.innerHTML = '';
    
    // Create rider rows
    Object.entries(odds).forEach(([rider, odd]) => {
      const riderRow = document.createElement('div');
      riderRow.className = 'rider-row';
      
      riderRow.innerHTML = `
        <div class="rider-col">${rider}</div>
        <div class="odds-col">${odd.toFixed(1)}</div>
        <div class="select-col">
          <input type="radio" name="rider-selection" value="${rider}" data-odds="${odd}" required>
        </div>
      `;
      
      ridersList.appendChild(riderRow);
      
      // Add event listener to radio button
      const radioBtn = riderRow.querySelector('input[type="radio"]');
      radioBtn.addEventListener('change', function() {
        selectedRider = rider;
        selectedOdds = odd;
        calculateWinnings();
      });
    });
  }
  
  function toggleFriendDetails() {
    if (friendSelect.value) {
      friendDetails.style.display = 'block';
    } else {
      friendDetails.style.display = 'none';
    }
  }
  
  function showConfirmationModal() {
    // Populate confirmation details
    confirmRace.textContent = currentRace.title;
    confirmRider.textContent = selectedRider;
    
    let betTypeText = '';
    switch (betType.value) {
      case 'win':
        betTypeText = 'Win (1st Place)';
        break;
      case 'podium':
        betTypeText = 'Podium (Top 3)';
        break;
      case 'top5':
        betTypeText = 'Top 5 Finish';
        break;
    }
    
    confirmBetType.textContent = betTypeText;
    confirmAmount.textContent = betAmount.value;
    
    const amount = parseFloat(betAmount.value) || 0;
    let multiplier = selectedOdds;
    
    // Adjust odds based on bet type (same logic as calculateWinnings)
    switch (betType.value) {
      case 'podium':
        multiplier = selectedOdds * 0.5;
        break;
      case 'top5':
        multiplier = selectedOdds * 0.3;
        break;
    }
    
    const winnings = amount * multiplier;
    confirmWinnings.textContent = winnings.toFixed(2);
    
    // Calculate fee
    const fee = amount * 0.01;
    confirmFee.textContent = fee.toFixed(2);
    
    // Friend bet details
    if (friendSelect.value) {
      confirmFriendSection.style.display = 'block';
      confirmFriend.textContent = friendSelect.options[friendSelect.selectedIndex].text;
      confirmMessage.textContent = document.getElementById('friend-message').value || '(No message)';
    } else {
      confirmFriendSection.style.display = 'none';
    }
    
    // Show modal
    confirmationModal.style.display = 'block';
  }
  
  function closeModal() {
    confirmationModal.style.display = 'none';
  }
  
  function submitBet() {
    // In a real implementation, this would submit the bet to an API
    // For now, we'll just simulate success
    
    // Close confirmation modal
    closeModal();
    
    // Show success message
    successMessage.style.display = 'block';
    
    // In a real implementation, we would save the bet to the user's account here
  }
  
  function resetForm() {
    // Hide success message
    successMessage.style.display = 'none';
    
    // Reset form
    betForm.reset();
    selectedRider = null;
    selectedOdds = 0;
    potentialWinnings.textContent = '$0.00';
    friendDetails.style.display = 'none';
    
    // Uncheck all rider selections
    const riderRadios = document.querySelectorAll('input[name="rider-selection"]');
    riderRadios.forEach(radio => {
      radio.checked = false;
    });
  }
  
  function displayError(message) {
    raceTitle.textContent = 'Error Loading Race Data';
    raceVenue.textContent = '--';
    raceDate.textContent = '--';
    raceSeries.textContent = '--';
    ridersList.innerHTML = `<div class="error-message">${message}</div>`;
  }
  
  // Fallback race data if race-updater.js isn't loaded
  function getDefaultRaces() {
    return [
      {
        date: new Date(2025, 3, 26), // Apr 26, 2025
        title: 'Denver Supercross',
        venue: 'Empower Field at Mile High - Denver, CO',
        series: 'Round 16 - Monster Energy Supercross',
        url: '/races/denver-2025/',
        odds: {
          "Eli Tomac": 1.5,
          "Cooper Webb": 2.8,
          "Jett Lawrence": 3.0,
          "Chase Sexton": 4.5,
          "Aaron Plessinger": 7.5
        }
      },
      {
        date: new Date(2025, 4, 3), // May 3, 2025
        title: 'Salt Lake City Supercross',
        venue: 'Rice-Eccles Stadium - Salt Lake City, UT',
        series: 'Round 17 - Monster Energy Supercross',
        url: '/races/salt-lake-city-2025/',
        odds: {
          "Cooper Webb": 2.0,
          "Jett Lawrence": 2.2,
          "Eli Tomac": 3.0,
          "Chase Sexton": 4.5,
          "Malcolm Stewart": 8.0
        }
      },
      {
        date: new Date(2025, 4, 24), // May 24, 2025
        title: 'Fox Raceway National',
        venue: 'Fox Raceway - Pala, CA',
        series: 'Round 1 - Pro Motocross Championship',
        url: '/races/fox-raceway-2025/',
        odds: {
          "Jett Lawrence": 1.5,
          "Chase Sexton": 3.0,
          "Cooper Webb": 4.0,
          "Eli Tomac": 4.2,
          "Justin Barcia": 7.5
        }
      }
    ];
  }
});