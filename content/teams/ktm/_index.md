
---
title: "Red Bull KTM Factory Racing"
description: "KTM's factory Supercross/Motocross team with Chase Sexton, Aaron Plessinger, and Tom Vialle"
layout: "single"
---

<div class="team-profile ktm-theme" style="background: var(--ktm-light);">
  <div class="team-header" style="background: linear-gradient(135deg, #ff6600 0%, #cc5200 100%);">
    <img src="/img/teams/ktm-logo.svg" alt="Red Bull KTM Factory Racing" class="team-logo animate-fade-in">
  </div>
  
  <div class="team-overview">
    <div class="team-intro">
      <h1 class="team-name">Red Bull KTM Factory Racing</h1>
      <div class="team-meta">
        <span class="meta-item">
          <span class="meta-icon">📍</span>
          <span>Murrieta, California</span>
        </span>
        <span class="meta-item">
          <span class="meta-icon">👤</span>
          <span>Team Manager: Ian Harrison</span>
        </span>
        <span class="meta-item">
          <span class="meta-icon">📅</span>
          <span>Founded: 2000</span>
        </span>
      </div>
    </div>
    
    <div class="team-description">
      <p>Red Bull KTM Factory Racing represents KTM's official factory racing effort in AMA Supercross and Pro Motocross. The Austrian manufacturer has established itself as a major force in American motocross racing with multiple championships in both 450 and 250 classes.</p>
      
      <p>For the 2024 season, KTM has secured the talents of 2023 Supercross champion Chase Sexton alongside veteran Aaron Plessinger in the 450 class, while former MX2 World Champion Tom Vialle represents the brand in the 250 division. The team operates out of its state-of-the-art facility in Murrieta, California.</p>
    </div>
  </div>
  
  <div class="team-section">
    <h2 class="section-title">Current Riders</h2>
    
    <div class="riders-grid">
      <div class="rider-card">
        <div class="rider-image-wrapper">
          <div class="rider-image" style="background-image: url('/img/riders/chase-sexton.jpg')"></div>
          <div class="rider-number">1</div>
          <div class="rider-class">450</div>
        </div>
        <div class="rider-info">
          <h3><a href="/riders/450/chase-sexton/">Chase Sexton</a></h3>
          <p class="rider-description">2023 AMA Supercross Champion bringing his precision riding style to KTM.</p>
          <div class="rider-stats">
            <div class="stat">
              <span class="stat-value">2023</span>
              <span class="stat-label">450 SX Champion</span>
            </div>
            <div class="stat">
              <span class="stat-value">2022</span>
              <span class="stat-label">450 MX Runner-up</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="rider-card">
        <div class="rider-image-wrapper">
          <div class="rider-image" style="background-image: url('/img/riders/aaron-plessinger.jpg')"></div>
          <div class="rider-number">7</div>
          <div class="rider-class">450</div>
        </div>
        <div class="rider-info">
          <h3><a href="/riders/450/aaron-plessinger/">Aaron Plessinger</a></h3>
          <p class="rider-description">Veteran rider known for his smooth style and technical prowess.</p>
          <div class="rider-stats">
            <div class="stat">
              <span class="stat-value">2018</span>
              <span class="stat-label">250 MX Champion</span>
            </div>
            <div class="stat">
              <span class="stat-value">2018</span>
              <span class="stat-label">250 SX West Champion</span>
            </div>
          </div>
        </div>
      </div>

      <div class="rider-card">
        <div class="rider-image-wrapper">
          <div class="rider-image" style="background-image: url('/img/riders/tom-vialle.jpg')"></div>
          <div class="rider-number">1</div>
          <div class="rider-class">250</div>
        </div>
        <div class="rider-info">
          <h3><a href="/riders/250/tom-vialle/">Tom Vialle</a></h3>
          <p class="rider-description">Former MX2 World Champion making his mark in American racing.</p>
          <div class="rider-stats">
            <div class="stat">
              <span class="stat-value">2022</span>
              <span class="stat-label">MX2 World Champion</span>
            </div>
            <div class="stat">
              <span class="stat-value">2020</span>
              <span class="stat-label">MX2 World Champion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.ktm-theme {
  --ktm-orange: #ff6600;
  --ktm-dark: #1a1a1a;
  --ktm-light: #ffffff;
}

.team-profile {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--ktm-light);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.team-header {
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.team-logo {
  max-width: 300px;
  height: auto;
  filter: brightness(0) invert(1);
  transition: transform 0.3s ease;
}

.team-logo:hover {
  transform: scale(1.05);
}

.team-overview {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.team-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--ktm-dark);
  margin-bottom: 1rem;
  border-bottom: 3px solid var(--ktm-orange);
  padding-bottom: 0.5rem;
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
  gap: 0.5rem;
  color: #666;
  font-size: 1.1rem;
}

.meta-icon {
  color: var(--ktm-orange);
}

.team-description p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
}

.team-section {
  padding: 2rem;
  background: #f8f8f8;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--ktm-dark);
  margin-bottom: 2rem;
  position: relative;
  padding-left: 1rem;
  border-left: 4px solid var(--ktm-orange);
}

.riders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.rider-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.rider-card:hover {
  transform: translateY(-5px);
}

.rider-image-wrapper {
  position: relative;
  padding-top: 75%;
}

.rider-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.rider-number {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--ktm-orange);
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.rider-class {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(0,0,0,0.8);
  color: white;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
}

.rider-info {
  padding: 1.5rem;
}

.rider-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.rider-info h3 a {
  color: var(--ktm-dark);
  text-decoration: none;
  transition: color 0.2s ease;
}

.rider-info h3 a:hover {
  color: var(--ktm-orange);
}

.rider-description {
  color: #666;
  margin-bottom: 1.25rem;
  line-height: 1.5;
}

.rider-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 8px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--ktm-orange);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
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
    font-size: 1.75rem;
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
