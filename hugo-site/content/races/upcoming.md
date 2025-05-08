---
title: "Upcoming Races"
description: "Schedule of upcoming Supercross and Motocross events"
layout: "single"
---

{{< rawhtml >}}
<div class="races-page">
  
  <div class="series-tabs">
    <button class="series-tab active" data-series="supercross">Supercross</button>
    <button class="series-tab" data-series="motocross">Pro Motocross</button>
  </div>
  
  <div class="series-content">
    <!-- Supercross Series -->
    <div class="series-schedule active" id="supercross-schedule">
      <div class="schedule-grid">
        <div class="race-card upcoming">
          <div class="race-date">May 4, 2024</div>
          <div class="race-round">Round 17</div>
          <div class="race-details">
            <h3>Salt Lake City</h3>
            <div class="venue">Rice-Eccles Stadium</div>
            <div class="track-type"><span class="badge">Stadium</span></div>
            <div class="broadcast">Live on NBC & Peacock at 8:00 PM ET</div>
          </div>
          <div class="race-actions">
            <a href="/tracks/rice-eccles-stadium" class="action-btn">Track Info</a>
            <a href="/betting/friend-bets?race=17" class="action-btn primary">Place Bets</a>
            <a href="/watch/livestream?race=17" class="action-btn highlight">Watch Live</a>
          </div>
        </div>
        
        <div class="race-card past">
          <div class="race-date">April 27, 2024</div>
          <div class="race-round">Round 16</div>
          <div class="race-details">
            <h3>Denver</h3>
            <div class="venue">Empower Field at Mile High</div>
            <div class="track-type"><span class="badge">Stadium</span></div>
            <div class="broadcast">NBC & Peacock</div>
          </div>
          <div class="race-actions">
            <a href="/tracks/empower-field" class="action-btn">Track Info</a>
            <a href="/races/results/2024/denver" class="action-btn">Results</a>
            <a href="/watch/replay?race=16" class="action-btn highlight">Watch Replay</a>
          </div>
        </div>
        
        <div class="race-card past">
          <div class="race-date">April 13, 2024</div>
          <div class="race-round">Round 15</div>
          <div class="race-details">
            <h3>Philadelphia</h3>
            <div class="venue">Lincoln Financial Field</div>
            <div class="track-type"><span class="badge">Stadium</span></div>
            <div class="broadcast">NBC & Peacock</div>
          </div>
          <div class="race-actions">
            <a href="/tracks/lincoln-financial-field" class="action-btn">Track Info</a>
            <a href="/races/results/2024/philadelphia" class="action-btn">Results</a>
            <a href="/watch/replay?race=15" class="action-btn highlight">Watch Replay</a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pro Motocross Series -->
    <div class="series-schedule" id="motocross-schedule">
      <div class="schedule-grid">
        <div class="race-card upcoming">
          <div class="race-date">May 25, 2024</div>
          <div class="race-round">Round 1</div>
          <div class="race-details">
            <h3>Fox Raceway National</h3>
            <div class="venue">Fox Raceway at Pala</div>
            <div class="track-type"><span class="badge outdoor">Outdoor</span></div>
            <div class="broadcast">Live on MAVTV & Peacock at 4:00 PM ET</div>
          </div>
          <div class="race-actions">
            <a href="/tracks/fox-raceway" class="action-btn">Track Info</a>
            <a href="/betting/friend-bets?race=mx1" class="action-btn primary">Place Bets</a>
            <a href="/watch/livestream?race=mx1" class="action-btn highlight">Watch Live</a>
          </div>
        </div>
        
        <div class="race-card upcoming">
          <div class="race-date">June 1, 2024</div>
          <div class="race-round">Round 2</div>
          <div class="race-details">
            <h3>Hangtown Motocross Classic</h3>
            <div class="venue">Prairie City SVRA</div>
            <div class="track-type"><span class="badge outdoor">Outdoor</span></div>
            <div class="broadcast">Live on MAVTV & Peacock at 4:00 PM ET</div>
          </div>
          <div class="race-actions">
            <a href="/tracks/hangtown" class="action-btn">Track Info</a>
            <a href="/betting/friend-bets?race=mx2" class="action-btn primary">Place Bets</a>
          </div>
        </div>
        
        <div class="race-card upcoming">
          <div class="race-date">June 8, 2024</div>
          <div class="race-round">Round 3</div>
          <div class="race-details">
            <h3>Thunder Valley National</h3>
            <div class="venue">Thunder Valley Motocross Park</div>
            <div class="track-type"><span class="badge outdoor">Outdoor</span></div>
            <div class="broadcast">Live on MAVTV & Peacock at 3:00 PM ET</div>
          </div>
          <div class="race-actions">
            <a href="/tracks/thunder-valley" class="action-btn">Track Info</a>
            <a href="/betting/friend-bets?race=mx3" class="action-btn primary">Place Bets</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="betting-promo">
    <div class="promo-content">
      <h2>Bet With Friends</h2>
      <p>Place friendly bets on upcoming races with other MX fans!</p>
      <ul>
        <li>Challenge friends directly</li>
        <li>Join betting groups</li>
        <li>Track your betting history</li>
        <li><a href="/betting/membership" class="promo-link">Upgrade to Premium</a> to avoid the 1% fee</li>
      </ul>
      <a href="/betting/friend-bets" class="promo-btn">Start Betting</a>
    </div>
    <div class="promo-image">
      <div class="image-placeholder">🏆</div>
    </div>
  </div>
  
  <div class="live-events">
    <h2>Watch Live Now</h2>
    <div id="live-content">
      <div class="loading">Checking for live events...</div>
    </div>
  </div>
</div>

<style>
  .races-page {
    max-width: 1200px;
    margin: 0 auto;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  

  
  .series-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .series-tab {
    background: none;
    border: 2px solid #0066cc;
    color: #0066cc;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .series-tab.active, .series-tab:hover {
    background-color: #0066cc;
    color: white;
  }
  
  .series-schedule {
    display: none;
  }
  
  .series-schedule.active {
    display: block;
  }
  
  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  @media (max-width: 768px) {
    .schedule-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .race-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: transform 0.2s;
    position: relative;
  }
  
  .race-card:hover {
    transform: translateY(-5px);
  }
  
  .race-card.upcoming {
    border-left: 4px solid #0066cc;
  }
  
  .race-card.past {
    opacity: 0.8;
  }
  
  .race-date {
    background-color: #f9f9f9;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
    display: flex;
    justify-content: space-between;
  }
  
  .race-round {
    font-weight: normal;
    color: #666;
  }
  
  .race-details {
    padding: 1.5rem;
  }
  
  .race-details h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  
  .venue {
    margin-bottom: 0.5rem;
    color: #666;
  }
  
  .track-type {
    margin-bottom: 0.5rem;
  }
  
  .badge {
    display: inline-block;
    background-color: #e6f2ff;
    color: #0066cc;
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
  }
  
  .badge.outdoor {
    background-color: #e6fff2;
    color: #00cc66;
  }
  
  .broadcast {
    font-size: 0.9rem;
    color: #333;
    margin-top: 0.5rem;
  }
  
  .race-actions {
    display: flex;
    gap: 0.5rem;
    padding: 0 1.5rem 1.5rem;
  }
  
  .action-btn {
    flex: 1;
    display: inline-block;
    padding: 0.5rem 0;
    text-align: center;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    background-color: #f0f0f0;
    color: #333;
    transition: all 0.2s;
  }
  
  .action-btn:hover {
    background-color: #e0e0e0;
  }
  
  .action-btn.primary {
    background-color: #0066cc;
    color: white;
  }
  
  .action-btn.primary:hover {
    background-color: #0052a3;
  }
  
  .action-btn.highlight {
    background-color: #cc0000;
    color: white;
  }
  
  .action-btn.highlight:hover {
    background-color: #a30000;
  }
  
  .betting-promo {
    display: flex;
    background-color: #f9f9f9;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 3rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  @media (max-width: 768px) {
    .betting-promo {
      flex-direction: column;
    }
  }
  
  .promo-content {
    flex: 2;
    padding: 2rem;
  }
  
  .promo-content h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  .promo-content p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .promo-content ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .promo-content li {
    margin-bottom: 0.5rem;
  }
  
  .promo-link {
    color: #0066cc;
    text-decoration: none;
    font-weight: 600;
  }
  
  .promo-link:hover {
    text-decoration: underline;
  }
  
  .promo-btn {
    display: inline-block;
    background-color: #0066cc;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s;
  }
  
  .promo-btn:hover {
    background-color: #0052a3;
  }
  
  .promo-image {
    flex: 1;
    background-color: #0066cc;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .image-placeholder {
    font-size: 5rem;
    color: white;
  }
  
  .live-events {
    margin-bottom: 3rem;
  }
  
  .live-events h2 {
    margin-bottom: 1.5rem;
  }
  
  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Series tabs
  const tabs = document.querySelectorAll('.series-tab');
  const schedules = document.querySelectorAll('.series-schedule');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs and schedules
      tabs.forEach(t => t.classList.remove('active'));
      schedules.forEach(s => s.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Show corresponding schedule
      const series = this.getAttribute('data-series');
      document.getElementById(`${series}-schedule`).classList.add('active');
    });
  });
  
  // Check for live events (in a real app, this would call an API)
  setTimeout(() => {
    checkLiveEvents();
  }, 1000);
  
  function checkLiveEvents() {
    const liveContentDiv = document.getElementById('live-content');
    
    // Simulate API response with no live events
    const isLive = false;
    
    if (isLive) {
      liveContentDiv.innerHTML = `
        <div class="live-event-card">
          <div class="live-badge">LIVE NOW</div>
          <h3>Salt Lake City Supercross</h3>
          <p>450 Main Event starting now!</p>
          <a href="/watch/livestream" class="watch-live-btn">Watch Now</a>
        </div>
      `;
    } else {
      liveContentDiv.innerHTML = `
        <div class="no-live-events">
          <p>There are no live events right now.</p>
          <p>The next live broadcast will be Salt Lake City Supercross on May 4, 2024.</p>
          <a href="/watch/schedule" class="view-schedule-btn">View Full Broadcast Schedule</a>
        </div>
      `;
    }
  }
});
</script>

{{< /rawhtml >}}