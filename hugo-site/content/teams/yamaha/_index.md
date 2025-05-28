---
title: "Yamaha Factory Racing"
description: "Yamaha's premier factory Supercross/Motocross team with Eli Tomac and Cooper Webb"
layout: "single"
---

<div class="team-profile">
  <div class="team-header" style="background: linear-gradient(135deg, #005eb8 0%, #004080 100%);">
    <img src="/img/teams/yamaha-logo.svg" alt="Yamaha Factory Racing" class="team-logo">
  </div>
  
  <div class="team-overview">
    <div class="team-intro">
      <h1 class="team-name">Yamaha Factory Racing</h1>
      <div class="team-meta">
        <span class="meta-item">
          <span class="meta-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </span>
          <span>Huntersville, North Carolina</span>
        </span>
        <span class="meta-item">
          <span class="meta-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <span>Team Manager: Jim Perry</span>
        </span>
        <span class="meta-item">
          <span class="meta-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </span>
          <span>Founded: 1974</span>
        </span>
      </div>
    </div>
    
    <div class="team-description">
      <p>Yamaha Factory Racing represents the pinnacle of Yamaha's competitive motorsports efforts in AMA Supercross and Pro Motocross. With their distinctive blue machines and commitment to technological excellence, Yamaha has consistently fielded championship-caliber teams and riders.</p>
      
      <p>The team's current lineup features veteran champion Eli Tomac and versatile competitor Cooper Webb, both bringing extensive experience and proven winning records to Yamaha's racing program. Operating from their state-of-the-art facility in North Carolina, the team continues Yamaha's proud racing heritage.</p>
    </div>
  </div>
  
  <div class="team-section">
    <h2 class="section-title">Current Riders</h2>
    
    <div class="riders-grid">
      <div class="rider-card">
        <div class="rider-image" style="background-image: url('/img/riders/eli-tomac.jpg')">
          <div class="rider-number">3</div>
          <div class="rider-class">450</div>
        </div>
        <div class="rider-info">
          <h3><a href="/riders/450/eli-tomac/">Eli Tomac</a></h3>
          <p class="rider-description">The 2022 Supercross champion and three-time Pro Motocross champion brings incredible speed and consistency to Yamaha.</p>
          <div class="rider-stats">
            <div class="stat">
              <span class="stat-value">2022</span>
              <span class="stat-label">450 SX Champion</span>
            </div>
            <div class="stat">
              <span class="stat-value">2017-2020</span>
              <span class="stat-label">450 MX Champion</span>
            </div>
            <div class="stat">
              <span class="stat-value">50+</span>
              <span class="stat-label">Career Wins</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="rider-card">
        <div class="rider-image" style="background-image: url('/img/riders/cooper-webb.jpg')">
          <div class="rider-number">2</div>
          <div class="rider-class">450</div>
        </div>
        <div class="rider-info">
          <h3><a href="/riders/450/cooper-webb/">Cooper Webb</a></h3>
          <p class="rider-description">The two-time Supercross champion known for his late-season surges and clutch performances in pressure situations.</p>
          <div class="rider-stats">
            <div class="stat">
              <span class="stat-value">2019-2021</span>
              <span class="stat-label">450 SX Champion</span>
            </div>
            <div class="stat">
              <span class="stat-value">2015</span>
              <span class="stat-label">250 West SX Champion</span>
            </div>
            <div class="stat">
              <span class="stat-value">25+</span>
              <span class="stat-label">Career Wins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .team-profile {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .team-header {
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 94, 184, 0.3);
  }
  
  .team-logo {
    max-width: 300px;
    max-height: 150px;
    filter: brightness(0) invert(1);
    transition: transform 0.3s ease;
  }
  
  .team-logo:hover {
    transform: scale(1.05);
  }
  
  .team-overview {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .team-name {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }
  
  .team-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .meta-item {
    display: flex;
    align-items: center;
    color: #666;
  }
  
  .meta-icon {
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
  }
  
  .team-description p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .team-section {
    margin-bottom: 4rem;
  }
  
  .section-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #005eb8;
  }
  
  .riders-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .rider-card {
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .rider-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
  
  .rider-image {
    height: 240px;
    background-size: cover;
    background-position: center;
    position: relative;
    background-color: #f5f5f5;
  }
  
  .rider-number {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background-color: #005eb8;
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .rider-class {
    position: absolute;
    bottom: 0.75rem;
    left: 0.75rem;
    background-color: rgba(0,0,0,0.75);
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
  }
  
  .rider-info {
    padding: 1.5rem;
    background-color: white;
  }
  
  .rider-info h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }
  
  .rider-info h3 a {
    color: #333;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .rider-info h3 a:hover {
    color: #005eb8;
  }
  
  .rider-description {
    color: #666;
    margin-bottom: 1.25rem;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .rider-stats {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
    background-color: #f8f8f8;
    padding: 1rem;
    border-radius: 0.25rem;
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .stat-value {
    font-weight: 700;
    font-size: 1.1rem;
    color: #005eb8;
    margin-bottom: 0.25rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
    color: #666;
    line-height: 1.3;
  }
  
  @media (min-width: 768px) {
    .team-overview {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  @media (max-width: 767px) {
    .team-meta {
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .team-name {
      font-size: 2rem;
    }
    
    .section-title {
      font-size: 1.5rem;
    }
  }
</style>