---
title: "Tracks"
description: "Explore Supercross and Motocross tracks from across the country featuring detailed information and specifications"
---

{{< rawhtml >}}
<div class="tracks-header">
  <h1>Supercross and Motocross Tracks</h1>
  <p class="tracks-intro">
    Discover detailed information about every track on the Supercross and Pro Motocross calendar. From stadium floor configurations to natural terrain courses, we provide comprehensive details about each venue.
  </p>

  <!-- Searchable Track Filter Section -->
  <div class="search-filter-container">
    <div class="search-box">
      <input type="text" id="trackSearch" class="search-input" placeholder="Search tracks by name, location, or features..." />
      <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    
    <div class="filter-options">
      <div class="filter-group">
        <label for="typeFilter">Track Type</label>
        <select id="typeFilter" class="select-input">
          <option value="all">All Types</option>
          <option value="supercross">Supercross</option>
          <option value="motocross">Motocross</option>
          <option value="smx">SMX (SuperMotocross)</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="regionFilter">Region</label>
        <select id="regionFilter" class="select-input">
          <option value="all">All Regions</option>
          <option value="west">West Coast</option>
          <option value="midwest">Midwest</option>
          <option value="south">South</option>
          <option value="east">East Coast</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="sortFilter">Sort By</label>
        <select id="sortFilter" class="select-input">
          <option value="name">Track Name</option>
          <option value="date">Upcoming Event Date</option>
          <option value="location">Location</option>
        </select>
      </div>
    </div>
  </div>
</div>

<div class="track-type-tabs">
  <button id="allTab" class="track-tab active" data-type="all">All Tracks</button>
  <button id="sxTab" class="track-tab" data-type="supercross">Supercross</button>
  <button id="mxTab" class="track-tab" data-type="motocross">Motocross</button>
</div>

<div class="track-types">
  <div class="track-type supercross">
    <h2>Supercross</h2>
    <p>Indoor stadium tracks featuring technical obstacles, tight corners, and spectacular jumps.</p>
  </div>
  
  <div class="track-type motocross">
    <h2>Motocross</h2>
    <p>Outdoor natural terrain tracks with varying soil conditions, elevation changes, and high-speed sections.</p>
  </div>
</div>

{{< card-carousel title="Featured Tracks" type="track" itemsPerSlide="3" itemsPerSlideMobile="1" itemsPerSlideTablet="2" interval="6000" >}}
  <div class="card-carousel-item">
    {{< track-card name="Daytona International Speedway" location="Daytona Beach, FL" type="supercross" date="March 8, 2025" image="/img/tracks/daytona.svg" url="/tracks/daytona-international-speedway/" />}}
  </div>
  <div class="card-carousel-item">
    {{< track-card name="RedBud MX" location="Buchanan, MI" type="motocross" date="July 5, 2025" image="/img/tracks/redbud.svg" url="/tracks/redbud/" />}}
  </div>
  <div class="card-carousel-item">
    {{< track-card name="Angel Stadium" location="Anaheim, CA" type="supercross" date="January 11, 2025" image="/img/tracks/anaheim.svg" url="/tracks/angel-stadium/" />}}
  </div>
  <div class="card-carousel-item">
    {{< track-card name="High Point Raceway" location="Mt. Morris, PA" type="motocross" date="June 14, 2025" image="/img/tracks/high-point.svg" url="/tracks/high-point/" />}}
  </div>
  <div class="card-carousel-item">
    {{< track-card name="AT&T Stadium" location="Arlington, TX" type="supercross" date="February 22, 2025" image="/img/tracks/arlington.svg" url="/tracks/att-stadium/" />}}
  </div>
{{< /card-carousel >}}

<div id="searchResults" class="search-results-container hidden">
  <h2>Search Results <span id="resultCount">(0)</span></h2>
  <div id="noResults" class="no-results hidden">
    <p>No tracks found matching your search criteria.</p>
  </div>
  <div class="track-grid search-results-grid" id="searchResultsGrid">
    <!-- Search results will be dynamically added here -->
  </div>
</div>

<h2>Browse All Tracks</h2>

<div class="interactive-track-grid hidden">
  <div class="tracks-grid">
    <div class="tracks-list">
      <h3>Supercross</h3>
      <ul class="track-links" id="sxTrackList">
        <li><a href="/tracks/angel-stadium/" data-region="west">Angel Stadium (Anaheim, CA)</a></li>
        <li><a href="/tracks/at-t-stadium/" data-region="south">AT&T Stadium (Arlington, TX)</a></li>
        <li><a href="/tracks/daytona-international-speedway/" data-region="south">Daytona International Speedway (Daytona Beach, FL)</a></li>
        <li><a href="/tracks/empower-field/" data-region="west">Empower Field at Mile High (Denver, CO)</a></li>
        <li><a href="/tracks/ford-field/" data-region="midwest">Ford Field (Detroit, MI)</a></li>
        <li><a href="/tracks/lincoln-financial-field/" data-region="east">Lincoln Financial Field (Philadelphia, PA)</a></li>
        <li><a href="/tracks/metlife-stadium/" data-region="east">MetLife Stadium (East Rutherford, NJ)</a></li>
        <li><a href="/tracks/nissan-stadium/" data-region="south">Nissan Stadium (Nashville, TN)</a></li>
        <li><a href="/tracks/petco-park/" data-region="west">Petco Park (San Diego, CA)</a></li>
        <li><a href="/tracks/raymond-james-stadium/" data-region="south">Raymond James Stadium (Tampa, FL)</a></li>
        <li><a href="/tracks/rice-eccles-stadium/" data-region="west">Rice-Eccles Stadium (Salt Lake City, UT)</a></li>
        <li><a href="/tracks/state-farm-stadium/" data-region="west">State Farm Stadium (Glendale, AZ)</a></li>
      </ul>
    </div>
    
    <div class="tracks-list">
      <h3>Motocross</h3>
      <ul class="track-links" id="mxTrackList">
        <li><a href="/tracks/fox-raceway/" data-region="west">Fox Raceway (Pala, CA)</a></li>
        <li><a href="/tracks/hangtown/" data-region="west">Hangtown (Prairie City, CA)</a></li>
        <li><a href="/tracks/high-point/" data-region="east">High Point Raceway (Mt. Morris, PA)</a></li>
        <li><a href="/tracks/ironman/" data-region="midwest">Ironman Raceway (Crawfordsville, IN)</a></li>
        <li><a href="/tracks/millville/" data-region="midwest">Spring Creek MX Park (Millville, MN)</a></li>
        <li><a href="/tracks/muddy-creek/" data-region="south">Muddy Creek Raceway (Blountville, TN)</a></li>
        <li><a href="/tracks/redbud/" data-region="midwest">RedBud MX (Buchanan, MI)</a></li>
        <li><a href="/tracks/southwick/" data-region="east">The Wick 338 (Southwick, MA)</a></li>
        <li><a href="/tracks/thunder-valley/" data-region="west">Thunder Valley Motocross Park (Lakewood, CO)</a></li>
        <li><a href="/tracks/unadilla/" data-region="east">Unadilla MX (New Berlin, NY)</a></li>
        <li><a href="/tracks/washougal/" data-region="west">Washougal MX Park (Washougal, WA)</a></li>
        <li><a href="/tracks/budds-creek/" data-region="east">Budds Creek Motocross Park (Mechanicsville, MD)</a></li>
      </ul>
    </div>
  </div>
</div>

<h2>Track Information</h2>

<div class="tracks-info">
  <p>Our detailed track profiles include:</p>
  
  <ul class="feature-list">
    <li>
      <span class="feature-icon">📏</span>
      <span class="feature-text">Complete track specifications</span>
    </li>
    <li>
      <span class="feature-icon">📜</span>
      <span class="feature-text">Track history and records</span>
    </li>
    <li>
      <span class="feature-icon">📅</span>
      <span class="feature-text">Upcoming events and broadcast information</span>
    </li>
    <li>
      <span class="feature-icon">🖼️</span>
      <span class="feature-text">Photo galleries and video content</span>
    </li>
    <li>
      <span class="feature-icon">🏆</span>
      <span class="feature-text">Previous winners and memorable moments</span>
    </li>
    <li>
      <span class="feature-icon">🚗</span>
      <span class="feature-text">Directions and accommodation information</span>
    </li>
  </ul>
  
  <p class="track-conclusion">Whether you're planning to attend an event or just want to learn more about where the action takes place, our track guides provide the essential information for every venue on the professional circuit.</p>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('trackSearch');
    const typeFilter = document.getElementById('typeFilter');
    const regionFilter = document.getElementById('regionFilter');
    const sortFilter = document.getElementById('sortFilter');
    const searchResults = document.getElementById('searchResults');
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const resultCount = document.getElementById('resultCount');
    const noResults = document.getElementById('noResults');
    const trackTabs = document.querySelectorAll('.track-tab');
    const sxTrackLinks = document.querySelectorAll('#sxTrackList li a');
    const mxTrackLinks = document.querySelectorAll('#mxTrackList li a');
    
    // Sample track data (this would ideally be loaded from your site data)
    // In a real implementation, you would use Hugo to generate this data
    const tracks = [
      { name: "Angel Stadium", location: "Anaheim, CA", type: "supercross", region: "west", date: "January 11, 2025", image: "/img/tracks/angel-stadium.svg", url: "/tracks/angel-stadium/" },
      { name: "AT&T Stadium", location: "Arlington, TX", type: "supercross", region: "south", date: "February 22, 2025", image: "/img/tracks/att-stadium.svg", url: "/tracks/at-t-stadium/" },
      { name: "Daytona International Speedway", location: "Daytona Beach, FL", type: "supercross", region: "south", date: "March 8, 2025", image: "/img/tracks/daytona.svg", url: "/tracks/daytona-international-speedway/" },
      { name: "Fox Raceway", location: "Pala, CA", type: "motocross", region: "west", date: "May 25, 2025", image: "/img/tracks/fox-raceway.svg", url: "/tracks/fox-raceway/" },
      { name: "RedBud MX", location: "Buchanan, MI", type: "motocross", region: "midwest", date: "July 5, 2025", image: "/img/tracks/redbud.svg", url: "/tracks/redbud/" },
      { name: "Unadilla MX", location: "New Berlin, NY", type: "motocross", region: "east", date: "August 16, 2025", image: "/img/tracks/track-template.svg", url: "/tracks/unadilla/" }
    ];
    
    function filterTracks() {
      const searchTerm = searchInput.value.toLowerCase();
      const typeValue = typeFilter.value;
      const regionValue = regionFilter.value;
      const sortValue = sortFilter.value;
      
      let filteredTracks = tracks.filter(track => {
        const nameMatch = track.name.toLowerCase().includes(searchTerm);
        const locationMatch = track.location.toLowerCase().includes(searchTerm);
        const typeMatch = typeValue === 'all' || track.type === typeValue;
        const regionMatch = regionValue === 'all' || track.region === regionValue;
        
        return (nameMatch || locationMatch) && typeMatch && regionMatch;
      });
      
      // Sort the filtered tracks
      filteredTracks.sort((a, b) => {
        if (sortValue === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortValue === 'date') {
          // This is a simplified sort - in real implementation, you'd use Date objects
          return a.date.localeCompare(b.date);
        } else if (sortValue === 'location') {
          return a.location.localeCompare(b.location);
        }
      });
      
      displayResults(filteredTracks);
    }
    
    function displayResults(filteredTracks) {
      searchResultsGrid.innerHTML = '';
      
      if (filteredTracks.length === 0) {
        noResults.classList.remove('hidden');
        searchResults.classList.remove('hidden');
        resultCount.textContent = '(0)';
        return;
      }
      
      noResults.classList.add('hidden');
      searchResults.classList.remove('hidden');
      resultCount.textContent = `(${filteredTracks.length})`;
      
      filteredTracks.forEach(track => {
        const trackCard = document.createElement('div');
        trackCard.className = 'track-grid-item';
        trackCard.innerHTML = `
          <div class="track-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="relative">
              <img src="${track.image}" alt="${track.name}" class="w-full h-60 object-cover" />
              
              <div class="absolute top-3 right-3 px-3 py-1 rounded-full text-white font-bold text-sm shadow-md track-type-badge ${track.type}-type">
                ${track.type}
              </div>
              
              <div class="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white font-bold px-3 py-1 rounded-md">
                ${track.date}
              </div>
            </div>
            
            <div class="p-4 bg-white dark:bg-neutral-800">
              <h3 class="text-xl font-bold mb-1 text-neutral-800 dark:text-neutral-100">${track.name}</h3>
              
              <div class="mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1 text-neutral-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span class="text-sm text-neutral-600 dark:text-neutral-400">${track.location}</span>
              </div>
              
              <div class="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 flex justify-center">
                <a href="${track.url}" class="view-track-btn flex items-center">
                  <span>View Details</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        `;
        
        searchResultsGrid.appendChild(trackCard);
      });
    }
    
    // Filter tracks from the sxTrackList and mxTrackList based on region
    function filterTrackLists() {
      const selectedRegion = regionFilter.value;
      
      if (selectedRegion === 'all') {
        // Show all tracks
        sxTrackLinks.forEach(link => {
          link.parentElement.style.display = 'block';
        });
        
        mxTrackLinks.forEach(link => {
          link.parentElement.style.display = 'block';
        });
        return;
      }
      
      // Filter SX tracks
      sxTrackLinks.forEach(link => {
        const trackRegion = link.getAttribute('data-region');
        if (trackRegion === selectedRegion) {
          link.parentElement.style.display = 'block';
        } else {
          link.parentElement.style.display = 'none';
        }
      });
      
      // Filter MX tracks
      mxTrackLinks.forEach(link => {
        const trackRegion = link.getAttribute('data-region');
        if (trackRegion === selectedRegion) {
          link.parentElement.style.display = 'block';
        } else {
          link.parentElement.style.display = 'none';
        }
      });
    }
    
    // Event listeners
    searchInput.addEventListener('input', filterTracks);
    typeFilter.addEventListener('change', function() {
      filterTracks();
      // Update active tab
      trackTabs.forEach(tab => {
        if (tab.getAttribute('data-type') === typeFilter.value) {
          trackTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
        }
      });
    });
    
    regionFilter.addEventListener('change', function() {
      filterTracks();
      filterTrackLists();
    });
    
    sortFilter.addEventListener('change', filterTracks);
    
    // Track tabs functionality
    trackTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const selectedType = this.getAttribute('data-type');
        
        // Update active tab
        trackTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Update type filter
        typeFilter.value = selectedType;
        filterTracks();
      });
    });
  });
</script>

<style>
  /* Tracks Header Styling */
  .tracks-header {
    margin-bottom: 2rem;
  }
  
  .tracks-intro {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 2rem;
    max-width: 900px;
  }
  
  /* Search and Filter Styling */
  .search-filter-container {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
  
  .search-box {
    position: relative;
    margin-bottom: 1rem;
  }
  
  .search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s ease;
  }
  
  .search-input:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0,102,204,0.2);
    outline: none;
  }
  
  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: #777;
  }
  
  .filter-options {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media (min-width: 640px) {
    .filter-options {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 768px) {
    .filter-options {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
  }
  
  .filter-group label {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #555;
  }
  
  .select-input {
    padding: 0.6rem 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
    background-color: white;
    transition: all 0.2s ease;
  }
  
  .select-input:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0,102,204,0.2);
    outline: none;
  }
  
  /* Track Type Tabs Styling */
  .track-type-tabs {
    display: flex;
    margin-bottom: 2rem;
    border-bottom: 2px solid #eee;
  }
  
  .track-tab {
    padding: 0.75rem 1.5rem;
    background: none;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    color: #555;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .track-tab:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: transparent;
    transition: background-color 0.2s ease;
  }
  
  .track-tab.active {
    color: #0066cc;
  }
  
  .track-tab.active:after {
    background-color: #0066cc;
  }
  
  .track-tab:hover {
    color: #0066cc;
  }
  
  /* Track Types Styling */
  .track-types {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  @media (min-width: 768px) {
    .track-types {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .track-type {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    padding: 1.5rem;
    text-align: center;
  }
  
  .supercross {
    background: linear-gradient(135deg, #d4a017, #f1c232);
    color: #333;
  }
  
  .motocross {
    background: linear-gradient(135deg, #228b22, #38b638);
    color: white;
  }
  
  .track-type h2 {
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 0.75rem;
  }
  
  .track-type p {
    margin-bottom: 0;
    opacity: 0.9;
  }
  
  /* Featured Tracks Styling */
  .featured-tracks {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  /* Search Results Styling */
  .search-results-container {
    margin-bottom: 3rem;
  }
  
  .search-results-container.hidden {
    display: none;
  }
  
  .no-results {
    padding: 2rem;
    text-align: center;
    background-color: #f8f9fa;
    border-radius: 8px;
    color: #666;
  }
  
  .no-results.hidden {
    display: none;
  }
  
  .search-results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  /* Tracks Grid Styling */
  .interactive-track-grid {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 1.5rem;
    margin: 2rem 0;
  }
  
  .tracks-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .tracks-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .tracks-list h3 {
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #ddd;
    font-size: 1.4rem;
    color: #333;
  }
  
  .track-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .track-links li {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  
  .track-links li:hover {
    background-color: #eee;
  }
  
  .track-links a {
    text-decoration: none;
    color: var(--primary-color, #0066cc);
    transition: color 0.2s ease;
    display: block;
  }
  
  .track-links a:hover {
    color: var(--primary-color-dark, #004c99);
  }
  
  /* Feature List Styling */
  .feature-list {
    list-style-type: none;
    padding: 0;
    margin: 1.5rem 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media (min-width: 640px) {
    .feature-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .feature-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .feature-list li {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .feature-icon {
    font-size: 1.5rem;
    margin-right: 0.75rem;
  }
  
  .feature-text {
    font-size: 0.95rem;
    color: #444;
  }
  
  .track-conclusion {
    font-size: 1.05rem;
    color: #444;
    margin-top: 1.5rem;
    line-height: 1.6;
  }
  
  /* Styling for track type badges */
  .track-type-badge {
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .supercross-type {
    background-color: #d4a017;
  }
  
  .motocross-type {
    background-color: #228b22;
  }
  
  .smx-type {
    background-color: #9932cc;
  }
  
  /* View Track Button Styling */
  .view-track-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0.8rem;
    background-color: #f8f9fa;
    color: var(--primary-color, #0066cc);
    font-size: 0.85rem;
    font-weight: 600;
    border: 1px solid var(--primary-color, #0066cc);
    border-radius: 50px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    transition: all 0.2s ease;
    text-decoration: none;
  }
  
  .view-track-btn:hover {
    background-color: var(--primary-color, #0066cc);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .view-track-btn:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }
  
  /* Dark mode adjustments */
  @media (prefers-color-scheme: dark) {
    .tracks-intro {
      color: #aaa;
    }
    
    .search-filter-container, 
    .interactive-track-grid,
    .feature-list li {
      background-color: #1f2937;
    }
    
    .filter-group label {
      color: #ccc;
    }
    
    .select-input {
      background-color: #111827;
      border-color: #374151;
      color: #e5e7eb;
    }
    
    .track-type-tabs {
      border-bottom-color: #374151;
    }
    
    .tracks-list h3 {
      border-bottom-color: #374151;
      color: #e5e7eb;
    }
    
    .track-links li:hover {
      background-color: #2d3748;
    }
    
    .track-links a {
      color: var(--primary-color-light, #38bdf8);
    }
    
    .track-links a:hover {
      color: var(--primary-color-lighter, #7dd3fc);
    }
    
    .feature-text {
      color: #d1d5db;
    }
    
    .track-conclusion {
      color: #d1d5db;
    }
    
    .track-tab {
      color: #d1d5db;
    }
    
    .track-tab.active {
      color: #38bdf8;
    }
    
    .track-tab.active:after {
      background-color: #38bdf8;
    }
    
    .view-track-btn {
      background-color: rgba(30, 41, 59, 0.7);
      color: var(--primary-color-light, #38bdf8);
      border-color: var(--primary-color-light, #38bdf8);
    }
    
    .view-track-btn:hover {
      background-color: var(--primary-color-light, #38bdf8);
      color: #0f172a;
    }
  }
</style>
{{< /rawhtml >}}