---
title: "Red Bull KTM Factory Racing"
description: "KTM's factory Supercross/Motocross team with Chase Sexton, Aaron Plessinger, and Tom Vialle"
layout: "single"
---

<div class="team-profile">
  <div class="team-header" style="background-color: #ff6600;">
    <img src="/img/teams/ktm-logo.svg" alt="Red Bull KTM Factory Racing" class="team-logo">
  </div>
  
  <div class="team-overview">
    <div class="team-intro">
      <h1 class="team-name">Red Bull KTM Factory Racing</h1>
      <div class="team-meta">
        <span class="meta-item">
          <span class="meta-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </span>
          <span>Murrieta, California</span>
        </span>
        <span class="meta-item">
          <span class="meta-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <span>Team Manager: Ian Harrison</span>
        </span>
        <span class="meta-item">
          <span class="meta-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </span>
          <span>Founded: 2000</span>
        </span>
      </div>
    </div>
    
    <div class="team-description">
      <p>Red Bull KTM Factory Racing represents KTM's official factory racing effort in AMA Supercross and Pro Motocross. The Austrian manufacturer has established itself as a major force in American motocross racing with multiple championships in both 450 and 250 classes.</p>
      
      <p>For the 2024 season, KTM has secured the talents of 2023 Supercross champion Chase Sexton alongside veteran Aaron Plessinger in the 450 class, while former MX2 World Champion Tom Vialle represents the brand in the 250 division. The team operates out of its state-of-the-art facility in Murrieta, California, where the riders train and work closely with the technical team to develop KTM's race machines.</p>
    </div>
  </div>
  
  <div class="team-section">
    <h2 class="section-title">Current Riders</h2>
    
    <div class="riders-grid">
      <div class="rider-card">
        <div class="rider-image" style="background-image: url('/img/riders/chase-sexton.jpg')">
          <div class="rider-number">1</div>
          <div class="rider-class">450</div>
        </div>
        <div class="rider-info">
          <h3><a href="/riders/450/chase-sexton/">Chase Sexton</a></h3>
          <p class="rider-description">The reigning AMA Supercross champion brings his precise riding style and determination to KTM for the 2024 season.</p>
          <div class="rider-stats">
            <div class="stat">
              <span class="stat-value">2023</span>
              <span class="stat-label">450 SX Champion</span>
            </div>
            <div class="stat">
              <span class="stat-value">2022</span>
              <span class="stat-label">450 MX Championship 2nd</span>
            </div>
            <div class="stat">
              <span class="stat-value">2020</span>
              <span class="stat-label">250 East SX Champion</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Content for other riders would be included here -->
    </div>
  </div>
  
  <!-- Additional team sections would be included here -->
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
  }
  
  .team-logo {
    max-width: 300px;
    max-height: 150px;
    filter: brightness(0) invert(1);
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
    border-bottom: 2px solid #ff6600;
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
  }
  
  .rider-number {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background-color: #ff6600;
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
    color: #ff6600;
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
    color: #ff6600;
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