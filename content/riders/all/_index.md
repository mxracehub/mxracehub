---
title: "All Riders"
description: "Search and filter all professional Supercross and Motocross riders"
layout: "single"
---

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h1 class="text-3xl font-bold mb-8">All MX/SX Riders</h1>

  <div class="bg-white dark:bg-neutral-800 shadow rounded-lg p-6 mb-8">
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-4">Search & Filter</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label for="rider-search" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Search Rider</label>
          <div class="relative">
            <input type="text" id="rider-search" placeholder="Enter rider name..." 
              class="block w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary dark:bg-neutral-700">
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <!-- Dropdown Menu for Autocomplete -->
            <div id="search-dropdown" class="absolute z-10 mt-1 w-full bg-white dark:bg-neutral-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 hidden max-h-60 overflow-auto">
              <!-- Results will appear here -->
            </div>
          </div>
        </div>
        
        <div>
          <label for="class-filter" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Class</label>
          <select id="class-filter" 
            class="block w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-neutral-700">
            <option value="all" selected>All Classes</option>
            <option value="450">450 Class</option>
            <option value="250-east">250 East</option>
            <option value="250-west">250 West</option>
          </select>
        </div>
        
        <div>
          <label for="team-filter" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Team</label>
          <select id="team-filter" 
            class="block w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-neutral-700">
            <option value="all" selected>All Teams</option>
            <option value="honda">Honda HRC</option>
            <option value="ktm">Red Bull KTM</option>
            <option value="yamaha">Monster Energy Yamaha</option>
            <option value="kawasaki">Monster Energy Kawasaki</option>
            <option value="husqvarna">Rockstar Energy Husqvarna</option>
            <option value="suzuki">H.E.P. Suzuki</option>
            <option value="gasgas">Troy Lee Designs GASGAS</option>
            <option value="privateer">Privateers</option>
          </select>
        </div>
        
        <div>
          <label for="nationality-filter" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nationality</label>
          <select id="nationality-filter" 
            class="block w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-neutral-700">
            <option value="all" selected>All Nationalities</option>
            <option value="usa">USA</option>
            <option value="australia">Australia</option>
            <option value="france">France</option>
            <option value="germany">Germany</option>
            <option value="japan">Japan</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div class="mt-4 flex flex-wrap gap-2" id="active-filters">
        <!-- Active filters will appear here -->
      </div>
    </div>
    
    <div class="flex justify-end">
      <button type="button" id="reset-filters" class="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded hover:bg-neutral-300 dark:hover:bg-neutral-600">
        Reset Filters
      </button>
    </div>
  </div>

  <div class="relative mb-4">
    <div class="border-b border-neutral-200 dark:border-neutral-700">
      <nav class="-mb-px flex space-x-8">
        <button class="tab-button active whitespace-nowrap py-4 px-1 border-b-2 border-primary font-medium text-primary" data-tab="all">
          All Riders
        </button>
        <button class="tab-button whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-neutral-500 hover:text-neutral-700 hover:border-neutral-300" data-tab="450">
          450 Class
        </button>
        <button class="tab-button whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-neutral-500 hover:text-neutral-700 hover:border-neutral-300" data-tab="250-east">
          250 East
        </button>
        <button class="tab-button whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-neutral-500 hover:text-neutral-700 hover:border-neutral-300" data-tab="250-west">
          250 West
        </button>
      </nav>
    </div>
  </div>

  <div class="text-sm text-neutral-500 mb-4">
    <span id="rider-count">50</span> riders found
  </div>
  
  <div class="tab-content" id="all-tab">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <!-- 450 Class Riders -->
      <div class="rider-card bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden" data-class="450" data-team="honda" data-nationality="australia">
        <div class="relative">
          <img src="/img/sample/default-rider.svg" alt="Jett Lawrence" class="w-full h-40 object-cover">
          <div class="absolute top-0 left-0 bg-black/70 text-white font-bold text-2xl m-2 w-10 h-10 flex items-center justify-center rounded-full">18</div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <span class="text-white text-xs font-bold uppercase">450 Class</span>
          </div>
        </div>
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-bold">Jett Lawrence</h3>
            <span class="text-xs bg-red-100 text-red-800 py-1 px-2 rounded">Honda</span>
          </div>
          <div class="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
            <span>Australia</span>
            <span>21 yrs</span>
          </div>
          <div class="mt-3">
            <a href="/riders/450/jett-lawrence/" class="text-primary hover:underline text-sm">View Profile</a>
          </div>
        </div>
      </div>
      
      <div class="rider-card bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden" data-class="450" data-team="yamaha" data-nationality="usa">
        <div class="relative">
          <img src="/img/sample/default-rider.svg" alt="Cooper Webb" class="w-full h-40 object-cover">
          <div class="absolute top-0 left-0 bg-black/70 text-white font-bold text-2xl m-2 w-10 h-10 flex items-center justify-center rounded-full">2</div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <span class="text-white text-xs font-bold uppercase">450 Class</span>
          </div>
        </div>
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-bold">Cooper Webb</h3>
            <span class="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded">Yamaha</span>
          </div>
          <div class="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
            <span>USA</span>
            <span>28 yrs</span>
          </div>
          <div class="mt-3">
            <a href="/riders/450/cooper-webb/" class="text-primary hover:underline text-sm">View Profile</a>
          </div>
        </div>
      </div>
      
      <div class="rider-card bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden" data-class="450" data-team="ktm" data-nationality="usa">
        <div class="relative">
          <img src="/img/sample/default-rider.svg" alt="Chase Sexton" class="w-full h-40 object-cover">
          <div class="absolute top-0 left-0 bg-black/70 text-white font-bold text-2xl m-2 w-10 h-10 flex items-center justify-center rounded-full">1</div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <span class="text-white text-xs font-bold uppercase">450 Class</span>
          </div>
        </div>
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-bold">Chase Sexton</h3>
            <span class="text-xs bg-orange-100 text-orange-800 py-1 px-2 rounded">KTM</span>
          </div>
          <div class="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
            <span>USA</span>
            <span>25 yrs</span>
          </div>
          <div class="mt-3">
            <a href="/riders/450/chase-sexton/" class="text-primary hover:underline text-sm">View Profile</a>
          </div>
        </div>
      </div>
      
      <!-- 250 East Riders -->
      <div class="rider-card bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden" data-class="250-east" data-team="yamaha" data-nationality="usa">
        <div class="relative">
          <img src="/img/sample/default-rider.svg" alt="Haiden Deegan" class="w-full h-40 object-cover">
          <div class="absolute top-0 left-0 bg-black/70 text-white font-bold text-2xl m-2 w-10 h-10 flex items-center justify-center rounded-full">23</div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <span class="text-white text-xs font-bold uppercase">250 East</span>
          </div>
        </div>
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-bold">Haiden Deegan</h3>
            <span class="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded">Yamaha</span>
          </div>
          <div class="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
            <span>USA</span>
            <span>18 yrs</span>
          </div>
          <div class="mt-3">
            <a href="/riders/250/haiden-deegan/" class="text-primary hover:underline text-sm">View Profile</a>
          </div>
        </div>
      </div>
      
      <div class="rider-card bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden" data-class="250-east" data-team="ktm" data-nationality="france">
        <div class="relative">
          <img src="/img/sample/default-rider.svg" alt="Tom Vialle" class="w-full h-40 object-cover">
          <div class="absolute top-0 left-0 bg-black/70 text-white font-bold text-2xl m-2 w-10 h-10 flex items-center justify-center rounded-full">1</div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <span class="text-white text-xs font-bold uppercase">250 East</span>
          </div>
        </div>
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-bold">Tom Vialle</h3>
            <span class="text-xs bg-orange-100 text-orange-800 py-1 px-2 rounded">KTM</span>
          </div>
          <div class="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
            <span>France</span>
            <span>23 yrs</span>
          </div>
          <div class="mt-3">
            <a href="/riders/250/tom-vialle/" class="text-primary hover:underline text-sm">View Profile</a>
          </div>
        </div>
      </div>
      
      <!-- 250 West Riders -->
      <div class="rider-card bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden" data-class="250-west" data-team="kawasaki" data-nationality="usa">
        <div class="relative">
          <img src="/img/sample/default-rider.svg" alt="Levi Kitchen" class="w-full h-40 object-cover">
          <div class="absolute top-0 left-0 bg-black/70 text-white font-bold text-2xl m-2 w-10 h-10 flex items-center justify-center rounded-full">47</div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <span class="text-white text-xs font-bold uppercase">250 West</span>
          </div>
        </div>
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-bold">Levi Kitchen</h3>
            <span class="text-xs bg-green-100 text-green-800 py-1 px-2 rounded">Kawasaki</span>
          </div>
          <div class="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
            <span>USA</span>
            <span>23 yrs</span>
          </div>
          <div class="mt-3">
            <a href="/riders/250/levi-kitchen/" class="text-primary hover:underline text-sm">View Profile</a>
          </div>
        </div>
      </div>
      
      <!-- Additional Riders -->
      <!-- Add more rider cards as needed -->
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('rider-search');
  const searchDropdown = document.getElementById('search-dropdown');
  const classFilter = document.getElementById('class-filter');
  const teamFilter = document.getElementById('team-filter');
  const nationalityFilter = document.getElementById('nationality-filter');
  const resetButton = document.getElementById('reset-filters');
  const riderCount = document.getElementById('rider-count');
  const tabButtons = document.querySelectorAll('.tab-button');
  const activeFilters = document.getElementById('active-filters');
  const riderCards = document.querySelectorAll('.rider-card');
  
  // Create a list of all rider names for the autocomplete dropdown
  const riderNames = Array.from(riderCards).map(card => {
    return {
      name: card.querySelector('h3').textContent.trim(),
      class: card.dataset.class,
      team: card.dataset.team,
      nationality: card.dataset.nationality
    };
  });
  
  // Function to update rider count
  function updateRiderCount() {
    const visibleRiders = document.querySelectorAll('.rider-card:not(.hidden)');
    riderCount.textContent = visibleRiders.length;
  }
  
  // Function to generate dropdown suggestions
  function generateSuggestions(searchTerm) {
    if (!searchTerm) {
      searchDropdown.classList.add('hidden');
      return;
    }
    
    const filteredRiders = riderNames.filter(rider => 
      rider.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredRiders.length === 0) {
      searchDropdown.classList.add('hidden');
      return;
    }
    
    // Clear and populate dropdown
    searchDropdown.innerHTML = '';
    filteredRiders.slice(0, 8).forEach(rider => {
      const option = document.createElement('div');
      option.className = 'px-4 py-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200';
      option.textContent = rider.name;
      
      // Add class and team info
      const classLabel = rider.class === '450' ? '450 Class' : 
                         rider.class === '250-east' ? '250 East' : 
                         rider.class === '250-west' ? '250 West' : '';
      
      const infoSpan = document.createElement('span');
      infoSpan.className = 'ml-2 text-xs text-neutral-500 dark:text-neutral-400';
      infoSpan.textContent = `${classLabel}`;
      option.appendChild(infoSpan);
      
      // Add click event to select the rider
      option.addEventListener('click', () => {
        searchInput.value = rider.name;
        searchDropdown.classList.add('hidden');
        applyFilters();
      });
      
      searchDropdown.appendChild(option);
    });
    
    searchDropdown.classList.remove('hidden');
  }
  
  // Function to apply filters
  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const classValue = classFilter.value;
    const teamValue = teamFilter.value;
    const nationalityValue = nationalityFilter.value;
    
    // Clear active filters
    activeFilters.innerHTML = '';
    
    // Add active filters badges
    if (searchTerm) {
      const filterBadge = document.createElement('span');
      filterBadge.className = 'px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium flex items-center';
      filterBadge.innerHTML = `Search: ${searchTerm} <button class="ml-1 text-primary" data-filter="search">×</button>`;
      activeFilters.appendChild(filterBadge);
    }
    
    if (classValue !== 'all') {
      const filterBadge = document.createElement('span');
      filterBadge.className = 'px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium flex items-center';
      
      let displayClass = classValue;
      if (classValue === '250-east') displayClass = '250 East';
      if (classValue === '250-west') displayClass = '250 West';
      
      filterBadge.innerHTML = `Class: ${displayClass} <button class="ml-1 text-primary" data-filter="class">×</button>`;
      activeFilters.appendChild(filterBadge);
    }
    
    if (teamValue !== 'all') {
      const filterBadge = document.createElement('span');
      filterBadge.className = 'px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium flex items-center';
      
      let displayTeam = teamValue.charAt(0).toUpperCase() + teamValue.slice(1);
      filterBadge.innerHTML = `Team: ${displayTeam} <button class="ml-1 text-primary" data-filter="team">×</button>`;
      activeFilters.appendChild(filterBadge);
    }
    
    if (nationalityValue !== 'all') {
      const filterBadge = document.createElement('span');
      filterBadge.className = 'px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium flex items-center';
      
      let displayNationality = nationalityValue.toUpperCase();
      if (nationalityValue !== 'usa') {
        displayNationality = nationalityValue.charAt(0).toUpperCase() + nationalityValue.slice(1);
      }
      
      filterBadge.innerHTML = `Nationality: ${displayNationality} <button class="ml-1 text-primary" data-filter="nationality">×</button>`;
      activeFilters.appendChild(filterBadge);
    }
    
    // Filter rider cards
    riderCards.forEach(card => {
      const riderName = card.querySelector('h3').textContent.toLowerCase();
      const riderClass = card.dataset.class;
      const riderTeam = card.dataset.team;
      const riderNationality = card.dataset.nationality;
      
      const matchesSearch = !searchTerm || riderName.includes(searchTerm);
      const matchesClass = classValue === 'all' || riderClass === classValue;
      const matchesTeam = teamValue === 'all' || riderTeam === teamValue;
      const matchesNationality = nationalityValue === 'all' || riderNationality === nationalityValue;
      
      if (matchesSearch && matchesClass && matchesTeam && matchesNationality) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
    
    updateRiderCount();
  }
  
  // Initial count
  updateRiderCount();
  
  // Event listeners for filter controls
  searchInput.addEventListener('input', function(e) {
    generateSuggestions(e.target.value);
    applyFilters();
  });

  // Add event listener for keyboard navigation in dropdown
  searchInput.addEventListener('keydown', function(e) {
    const options = searchDropdown.querySelectorAll('div');
    if (!options.length) return;
    
    // Navigate dropdown with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = Array.from(options).findIndex(option => option.classList.contains('bg-neutral-100') || option.classList.contains('bg-neutral-700'));
      let nextIndex;
      
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % options.length;
      } else {
        nextIndex = currentIndex < 0 ? options.length - 1 : (currentIndex - 1 + options.length) % options.length;
      }
      
      options.forEach((option, i) => {
        if (i === nextIndex) {
          option.classList.add('bg-neutral-100', 'dark:bg-neutral-700');
        } else {
          option.classList.remove('bg-neutral-100', 'dark:bg-neutral-700');
        }
      });
    }
    
    // Select highlighted option with Enter key
    if (e.key === 'Enter') {
      const highlightedOption = searchDropdown.querySelector('.bg-neutral-100, .bg-neutral-700');
      if (highlightedOption) {
        e.preventDefault();
        highlightedOption.click();
      }
    }
    
    // Hide dropdown with Escape key
    if (e.key === 'Escape') {
      searchDropdown.classList.add('hidden');
    }
  });
  
  // Hide dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.classList.add('hidden');
    }
  });
  
  classFilter.addEventListener('change', applyFilters);
  teamFilter.addEventListener('change', applyFilters);
  nationalityFilter.addEventListener('change', applyFilters);
  
  // Reset filters
  resetButton.addEventListener('click', function() {
    searchInput.value = '';
    classFilter.value = 'all';
    teamFilter.value = 'all';
    nationalityFilter.value = 'all';
    
    // Reset active tab
    tabButtons.forEach(button => {
      button.classList.remove('active', 'border-primary', 'text-primary');
      button.classList.add('border-transparent', 'text-neutral-500');
    });
    
    const allTab = document.querySelector('[data-tab="all"]');
    allTab.classList.add('active', 'border-primary', 'text-primary');
    allTab.classList.remove('border-transparent', 'text-neutral-500');
    
    // Show all riders
    riderCards.forEach(card => {
      card.classList.remove('hidden');
    });
    
    // Clear active filters
    activeFilters.innerHTML = '';
    
    updateRiderCount();
  });
  
  // Tab switching
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.dataset.tab;
      
      // Update active tab styling
      tabButtons.forEach(btn => {
        btn.classList.remove('active', 'border-primary', 'text-primary');
        btn.classList.add('border-transparent', 'text-neutral-500');
      });
      
      this.classList.add('active', 'border-primary', 'text-primary');
      this.classList.remove('border-transparent', 'text-neutral-500');
      
      // Update the class filter to match the tab
      if (tabName === 'all') {
        classFilter.value = 'all';
      } else {
        classFilter.value = tabName;
      }
      
      // Apply filters
      applyFilters();
    });
  });
  
  // Remove individual filters
  activeFilters.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
      const filterType = e.target.dataset.filter;
      
      if (filterType === 'search') {
        searchInput.value = '';
      } else if (filterType === 'class') {
        classFilter.value = 'all';
        
        // Reset active tab
        tabButtons.forEach(button => {
          button.classList.remove('active', 'border-primary', 'text-primary');
          button.classList.add('border-transparent', 'text-neutral-500');
        });
        
        const allTab = document.querySelector('[data-tab="all"]');
        allTab.classList.add('active', 'border-primary', 'text-primary');
        allTab.classList.remove('border-transparent', 'text-neutral-500');
      } else if (filterType === 'team') {
        teamFilter.value = 'all';
      } else if (filterType === 'nationality') {
        nationalityFilter.value = 'all';
      }
      
      applyFilters();
    }
  });
});
</script>