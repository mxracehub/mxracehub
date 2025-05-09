---
title: "MXRaceHub"
description: "The Ultimate Supercross and Motocross Fan Platform"
layout: "home"
---

{{< rawhtml >}}
<link rel="stylesheet" href="/css/homepage.css">
<script src="/js/countdown.js"></script>
<script src="/js/race-updater.js"></script>

<!-- Hide the Live Now banner initially, it will be shown when an event is happening -->
<style>
  .live-now-banner {
    display: none;
  }
</style>
<!-- Main Hero Banner -->
{{< tailwind-carousel 
  height="600px" 
  mobileHeight="400px" 
  interval="5000" 
  images="{/img/tracks/gallery/daytona-1.jpg,/img/tracks/gallery/daytona-2.jpg,/img/riders/gallery/jett-lawrence-1.jpg,/img/riders/gallery/cooper-webb-1.jpg,/img/riders/gallery/haiden-deegan-1.jpg}" 
  captions="[Daytona International Speedway,Supercross Racing at Daytona,Jett Lawrence - Team Honda HRC,Cooper Webb - Monster Energy Yamaha,Haiden Deegan - Monster Energy Yamaha Star Racing]"
  caption=true
  fullWidth=true
  controls=true
  indicators=true
>}}

<!-- Hero Banner Overlay -->
<div class="hero-overlay">
  <div class="hero-content">
    <h1 class="hero-title">MONSTER ENERGY SUPERCROSS</h1>
    <div class="hero-tagline">THE MOST COMPETITIVE STADIUM RACING ON THE PLANET</div>
    <div class="hero-cta-container">
      <a href="/races/" class="hero-cta-primary">VIEW SCHEDULE</a>
      <a href="/tickets/" class="hero-cta-secondary">BUY TICKETS</a>
      <a href="/live-stream/" class="hero-cta-accent">WATCH LIVE</a>
    </div>
  </div>
</div>

<!-- Live Now Banner (if race is active) -->
<div class="live-now-banner">
  <div class="live-indicator">
    <span class="live-dot"></span>
    <span>LIVE NOW</span>
  </div>
  <div class="live-race-info">Denver Supercross - 450SX Main Event</div>
  <a href="/live-stream/" class="watch-live-button">WATCH NOW</a>
</div>

<!-- Race Weekend Countdown -->
<div class="countdown-section">
  <div class="countdown-container">
    <div class="next-race-info">
      <div class="next-race-label">NEXT RACE</div>
      <h2 class="next-race-title">DENVER SUPERCROSS</h2>
      <div class="next-race-date">APRIL 27, 2025</div>
    </div>
    <div class="countdown-timer">
      <div class="countdown-item">
        <div class="countdown-value" id="countdown-days">00</div>
        <div class="countdown-label">DAYS</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value" id="countdown-hours">00</div>
        <div class="countdown-label">HOURS</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value" id="countdown-minutes">00</div>
        <div class="countdown-label">MINUTES</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value" id="countdown-seconds">00</div>
        <div class="countdown-label">SECONDS</div>
      </div>
    </div>
    <div class="countdown-cta">
      <a href="/races/denver-2025/" class="countdown-button">EVENT DETAILS</a>
      <a href="/tickets/denver-2025/" class="countdown-button">BUY TICKETS</a>
    </div>
  </div>
</div>

<!-- News & Featured Content -->
<div class="featured-news-section">
  <div class="section-header">
    <h2 class="section-title">LATEST NEWS</h2>
    <a href="/news/" class="section-link">VIEW ALL</a>
  </div>
  
  <div class="featured-news-grid">
    <div class="main-news-card">
      <div class="news-card-image">
        <img src="/img/news/jett-lawrence-winner.jpg" alt="Jett Lawrence Wins in Anaheim">
      </div>
      <div class="news-card-content">
        <div class="news-category">RACE RECAP</div>
        <h3 class="news-title">Jett Lawrence Dominates Anaheim Season Opener</h3>
        <p class="news-excerpt">Team Honda HRC's Jett Lawrence started the 2025 Supercross season with a commanding win at the opening round in Anaheim.</p>
        <div class="news-date">January 5, 2025</div>
        <a href="/news/jett-lawrence-wins-anaheim/" class="news-read-more">READ MORE</a>
      </div>
    </div>
    
    <div class="news-card-small">
      <div class="news-card-image">
        <img src="/img/news/cooper-webb-interview.jpg" alt="Cooper Webb Interview">
      </div>
      <div class="news-card-content">
        <div class="news-category">INTERVIEW</div>
        <h3 class="news-title">Cooper Webb: "I'm Ready for the Challenge"</h3>
        <div class="news-date">January 3, 2025</div>
      </div>
    </div>
    
    <div class="news-card-small">
      <div class="news-card-image">
        <img src="/img/news/track-design-2025.jpg" alt="2025 Track Designs">
      </div>
      <div class="news-card-content">
        <div class="news-category">TRACKS</div>
        <h3 class="news-title">New Track Designs for 2025 Season Revealed</h3>
        <div class="news-date">December 15, 2024</div>
      </div>
    </div>
  </div>
</div>

<!-- Upcoming Races with Betting -->
<div class="races-section">
  <div class="section-header">
    <h2 class="section-title">UPCOMING RACES</h2>
    <a href="/races/" class="section-link">VIEW FULL SCHEDULE</a>
  </div>
  
  <div class="race-cards">
    <div class="race-card">
      <div class="race-date">APR 27, 2025</div>
      <h3 class="race-title">Denver Supercross</h3>
      <p class="race-venue">Empower Field at Mile High - Denver, CO</p>
      <div class="race-series">Round 16 - Monster Energy Supercross</div>
      <div class="race-odds">
        <h4 class="odds-title">BETTING ODDS</h4>
        <ul class="race-odds-list">
          <li class="race-odds-item"><span class="rider-name">Eli Tomac</span> <span class="rider-odds">1.5</span></li>
          <li class="race-odds-item"><span class="rider-name">Cooper Webb</span> <span class="rider-odds">2.8</span></li>
          <li class="race-odds-item"><span class="rider-name">Jett Lawrence</span> <span class="rider-odds">3.0</span></li>
        </ul>
      </div>
      <div class="race-actions">
        <a href="/races/denver-2025/" class="race-link">RACE DETAILS</a>
        <a href="/betting/races/denver-2025/" class="race-betting-button">PLACE BET</a>
      </div>
    </div>
    
    <div class="race-card">
      <div class="race-date">MAY 4, 2025</div>
      <h3 class="race-title">Salt Lake City Supercross</h3>
      <p class="race-venue">Rice-Eccles Stadium - Salt Lake City, UT</p>
      <div class="race-series">Round 17 - Monster Energy Supercross</div>
      <div class="race-odds">
        <h4 class="odds-title">BETTING ODDS</h4>
        <ul class="race-odds-list">
          <li class="race-odds-item"><span class="rider-name">Cooper Webb</span> <span class="rider-odds">2.0</span></li>
          <li class="race-odds-item"><span class="rider-name">Jett Lawrence</span> <span class="rider-odds">2.2</span></li>
          <li class="race-odds-item"><span class="rider-name">Eli Tomac</span> <span class="rider-odds">3.0</span></li>
        </ul>
      </div>
      <div class="race-actions">
        <a href="/races/salt-lake-city-2025/" class="race-link">RACE DETAILS</a>
        <a href="/betting/races/salt-lake-city-2025/" class="race-betting-button">PLACE BET</a>
      </div>
    </div>
    
    <div class="race-card">
      <div class="race-date">MAY 25, 2025</div>
      <h3 class="race-title">Fox Raceway National</h3>
      <p class="race-venue">Fox Raceway - Pala, CA</p>
      <div class="race-series">Round 1 - Pro Motocross Championship</div>
      <div class="race-odds">
        <h4 class="odds-title">BETTING ODDS</h4>
        <ul class="race-odds-list">
          <li class="race-odds-item"><span class="rider-name">Jett Lawrence</span> <span class="rider-odds">1.5</span></li>
          <li class="race-odds-item"><span class="rider-name">Chase Sexton</span> <span class="rider-odds">3.0</span></li>
          <li class="race-odds-item"><span class="rider-name">Cooper Webb</span> <span class="rider-odds">4.0</span></li>
        </ul>
      </div>
      <div class="race-actions">
        <a href="/races/fox-raceway-2025/" class="race-link">RACE DETAILS</a>
        <a href="/betting/races/fox-raceway-2025/" class="race-betting-button">PLACE BET</a>
      </div>
    </div>
  </div>
</div>

<!-- Featured Riders -->
<div class="featured-riders-section">
  <div class="section-header">
    <h2 class="section-title">TOP RIDERS</h2>
    <a href="/riders/" class="section-link">VIEW ALL RIDERS</a>
  </div>
  
  <div class="rider-grid">
    <a href="/riders/450/eli-tomac/" class="rider-card">
      <div class="rider-card-image">
        <img src="/img/riders/eli-tomac.svg" alt="Eli Tomac" class="rider-image">
        <div class="rider-number-overlay">#1</div>
      </div>
      <div class="rider-info">
        <h3 class="rider-name">Eli Tomac</h3>
        <div class="rider-details">
          <span class="rider-team">Monster Energy Yamaha</span>
          <span class="rider-points">223 pts</span>
        </div>
      </div>
    </a>
    
    <a href="/riders/450/jett-lawrence/" class="rider-card">
      <div class="rider-card-image">
        <img src="/img/riders/jett-lawrence.svg" alt="Jett Lawrence" class="rider-image">
        <div class="rider-number-overlay">#18</div>
      </div>
      <div class="rider-info">
        <h3 class="rider-name">Jett Lawrence</h3>
        <div class="rider-details">
          <span class="rider-team">Team Honda HRC</span>
          <span class="rider-points">219 pts</span>
        </div>
      </div>
    </a>
    
    <a href="/riders/450/cooper-webb/" class="rider-card">
      <div class="rider-card-image">
        <img src="/img/riders/cooper-webb.svg" alt="Cooper Webb" class="rider-image">
        <div class="rider-number-overlay">#2</div>
      </div>
      <div class="rider-info">
        <h3 class="rider-name">Cooper Webb</h3>
        <div class="rider-details">
          <span class="rider-team">Monster Energy Yamaha</span>
          <span class="rider-points">217 pts</span>
        </div>
      </div>
    </a>
    
    <a href="/riders/450/chase-sexton/" class="rider-card">
      <div class="rider-card-image">
        <img src="/img/riders/chase-sexton.svg" alt="Chase Sexton" class="rider-image">
        <div class="rider-number-overlay">#1</div>
      </div>
      <div class="rider-info">
        <h3 class="rider-name">Chase Sexton</h3>
        <div class="rider-details">
          <span class="rider-team">Red Bull KTM</span>
          <span class="rider-points">201 pts</span>
        </div>
      </div>
    </a>
  </div>
</div>

<!-- Featured Tracks -->
<div class="featured-tracks-section">
  <div class="section-header">
    <h2 class="section-title">ICONIC TRACKS</h2>
    <a href="/tracks/" class="section-link">VIEW ALL TRACKS</a>
  </div>
  
  {{< tailwind-carousel 
    height="400px" 
    mobileHeight="250px" 
    interval="4000" 
    images="{/img/tracks/gallery/daytona-1.jpg,/img/tracks/gallery/daytona-2.jpg,/img/riders/gallery/jett-lawrence-2.jpg}" 
    captions="[Daytona International Speedway - The Most Prestigious Supercross Track,Daytona's Unique Beach Sand Terrain,Upcoming Races at Iconic Venues]"
    caption=true
    indicators=true
    controls=true
  >}}
  
  <div class="tracks-grid">
    <a href="/tracks/daytona/" class="track-card">
      <div class="track-card-image">
        <img src="/img/tracks/daytona.svg" alt="Daytona International Speedway" class="track-image">
      </div>
      <div class="track-info">
        <h3 class="track-name">Daytona</h3>
        <div class="track-location">Daytona Beach, FL</div>
      </div>
    </a>
    
    <a href="/tracks/anaheim/" class="track-card">
      <div class="track-card-image">
        <img src="/img/tracks/anaheim.svg" alt="Angel Stadium" class="track-image">
      </div>
      <div class="track-info">
        <h3 class="track-name">Anaheim</h3>
        <div class="track-location">Anaheim, CA</div>
      </div>
    </a>
    
    <a href="/tracks/arlington/" class="track-card">
      <div class="track-card-image">
        <img src="/img/tracks/arlington.svg" alt="AT&T Stadium" class="track-image">
      </div>
      <div class="track-info">
        <h3 class="track-name">Arlington</h3>
        <div class="track-location">Arlington, TX</div>
      </div>
    </a>
  </div>
</div>

<!-- Betting Promotion -->
<div class="betting-promo-section">
  <div class="betting-promo-container">
    <div class="betting-promo-content">
      <h2 class="betting-promo-title">MAKE RACE DAY MORE EXCITING</h2>
      <p class="betting-promo-text">Join betting groups with friends and other fans, or place bets on your favorite riders. No fees for premium members!</p>
      <div class="betting-promo-cta">
        <a href="/betting/groups/" class="betting-promo-button">JOIN A GROUP</a>
        <a href="/betting/upcoming/" class="betting-promo-button">PLACE A BET</a>
      </div>
    </div>
    <div class="betting-promo-image">
      <img src="/img/betting/betting-promo.svg" alt="Betting Promotion">
    </div>
  </div>
</div>

<!-- Membership Promotion -->
<div class="membership-section">
  <div class="membership-container">
    <div class="membership-content">
      <h2 class="membership-title">BECOME A PREMIUM MEMBER</h2>
      <ul class="membership-benefits">
        <li>No fees on bets</li>
        <li>Exclusive content and track analysis</li>
        <li>Early access to race predictions</li>
        <li>Live rider stats during races</li>
      </ul>
      <div class="membership-pricing">
        <div class="price-option">
          <span class="price-amount">$5</span>
          <span class="price-period">per month</span>
        </div>
        <div class="price-option popular">
          <span class="popular-tag">BEST VALUE</span>
          <span class="price-amount">$50</span>
          <span class="price-period">per year</span>
        </div>
      </div>
      <a href="/membership/signup/" class="membership-button">JOIN NOW</a>
    </div>
  </div>
</div>

<style>
  /* Homepage Styles */
  
  /* Top Navigation Bar */
  .top-nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .logo-container {
    flex: 0 0 auto;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: 800;
    color: #E2001A;
    text-decoration: none;
    letter-spacing: 0.5px;
  }
  
  .main-nav {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
  
  .nav-item {
    color: #333;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0.5rem;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
  }
  
  .nav-item:hover {
    color: #E2001A;
    border-bottom: 2px solid #E2001A;
  }
  
  .account-nav {
    flex: 0 0 auto;
  }
  
  .account-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #0057b8;
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-weight: 600;
    transition: all 0.2s ease;
  }
  
  .account-button:hover {
    background-color: #003d82;
    transform: translateY(-2px);
  }
  
  .account-icon {
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    .top-nav-bar {
      flex-direction: column;
      padding: 1rem;
      gap: 1rem;
    }
    
    .main-nav {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .nav-item {
      font-size: 1rem;
      padding: 0.3rem;
    }
    
    .account-button {
      width: 100%;
      justify-content: center;
    }
  }
  
  .home-hero {
    position: relative;
    background-color: #222;
    background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/img/hero/motocross-action.svg');
    background-size: cover;
    background-position: center;
    color: white;
    padding: 6rem 2rem;
    text-align: center;
    margin-bottom: 4rem;
  }
  
  .hero-content {
    max-width: 800px;
    margin: -100px auto 0;
    position: relative;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  .hero-title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: 800;
  }
  
  .hero-subtitle {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-weight: 400;
  }
  
  .hero-description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6;
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
  
  .cta-button.primary {
    background-color: #E2001A;
    color: white;
  }
  
  .cta-button.secondary {
    background-color: transparent;
    color: white;
    border: 2px solid white;
  }
  
  .cta-button.accent {
    background-color: #0057b8;
    color: white;
  }
  
  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
  
  .section-title {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 2.5rem;
  }
  
  .feature-section {
    padding: 4rem 2rem;
    margin-bottom: 4rem;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .feature-card {
    background-color: #f8f9fa;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
  }
  
  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .feature-card h3 {
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
  }
  
  .feature-card p {
    font-size: 1rem;
    color: #666;
    line-height: 1.6;
  }
  
  .races-section {
    padding: 4rem 2rem;
    background-color: #f8f9fa;
    margin-bottom: 4rem;
  }
  
  .race-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto 2rem auto;
  }
  
  .race-card {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
  }
  
  .race-card:hover {
    transform: translateY(-5px);
  }
  
  .race-date {
    font-size: 0.9rem;
    font-weight: bold;
    color: #E2001A;
    margin-bottom: 0.5rem;
  }
  
  .race-title {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
  
  .race-venue {
    font-size: 1rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  .race-series {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 1.5rem;
  }
  
  .race-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #E2001A;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .race-link:hover {
    background-color: #c1001e;
  }
  
  .featured-riders {
    padding: 4rem 2rem;
    margin-bottom: 4rem;
  }
  
  .rider-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto 2rem auto;
  }
  
  .rider-card {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease;
    background-color: #f8f9fa;
  }
  
  .rider-card:hover {
    transform: translateY(-5px);
  }
  
  .rider-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  
  .rider-info {
    padding: 1.5rem;
  }
  
  .rider-name {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
  
  .rider-details {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .rider-number {
    font-weight: bold;
    color: #E2001A;
  }
  
  .rider-team {
    font-size: 0.9rem;
    color: #666;
  }
  
  .view-all {
    text-align: center;
  }
  
  .view-all-link {
    display: inline-block;
    padding: 0.7rem 1.5rem;
    background-color: #333;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .view-all-link:hover {
    background-color: #555;
  }
  
  /* Track Highlights Section */
  .track-highlights-section {
    padding: 0 0 4rem 0;
    margin-bottom: 4rem;
    background-color: #f8f9fa;
  }
  
  .track-highlights-content {
    max-width: 800px;
    margin: 2rem auto 0;
    padding: 0 2rem;
    text-align: center;
  }
  
  .track-highlights-description {
    font-size: 1.1rem;
    color: #333;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  
  .track-cta {
    text-align: center;
  }
  
  .track-cta-link {
    display: inline-block;
    padding: 0.8rem 1.8rem;
    background-color: #E2001A;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-size: 1.1rem;
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  .track-cta-link:hover {
    transform: translateY(-3px);
    background-color: #c1001e;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    .hero-content {
      margin-top: -50px;
      padding: 1.5rem;
    }
    
    .hero-title {
      font-size: 2rem;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
    }
    
    .hero-description {
      font-size: 1rem;
    }
    
    .cta-buttons {
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
    }
    
    .cta-button {
      width: 100%;
      max-width: 250px;
      font-size: 0.9rem;
      padding: 0.6rem 1.2rem;
    }
    
    .track-highlights-description {
      font-size: 1rem;
    }
    
    .track-cta-link {
      width: 100%;
      max-width: 250px;
      font-size: 0.9rem;
      padding: 0.6rem 1.2rem;
    }
  }
</style>

{{< /rawhtml >}}