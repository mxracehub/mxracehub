---
title: "2025 Race Schedule"
description: "Complete 2025 schedule for AMA Supercross and Pro Motocross with official ticket links"
---

<style>
.schedule-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.schedule-header {
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #e20613, #ff4757);
  color: white;
  padding: 2rem;
  border-radius: 8px;
}

.schedule-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.nav-button {
  background: #003366;
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background: #e20613;
  color: white;
}

.series-section {
  margin-bottom: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

.series-header {
  background: #003366;
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.series-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
}

.series-subtitle {
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
}

.race-grid {
  display: grid;
  gap: 1px;
  background: #e0e0e0;
}

.race-card {
  background: white;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 80px 1fr 120px 150px 180px;
  align-items: center;
  gap: 1rem;
  transition: background-color 0.2s;
}

.race-card:hover {
  background: #f8f9fa;
}

.race-card.next-race {
  background: #fff3cd;
  border-left: 4px solid #e20613;
}

.race-card.completed {
  opacity: 0.7;
}

.round-number {
  font-weight: bold;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

.race-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: #333;
}

.race-date {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.race-location {
  color: #666;
  font-size: 0.85rem;
  margin: 0;
}

.race-classes {
  font-size: 0.85rem;
  color: #666;
  text-align: center;
}

.race-status {
  text-align: center;
  font-weight: 600;
}

.status-completed {
  color: #28a745;
}

.status-next {
  color: #e20613;
  animation: pulse 2s infinite;
}

.status-upcoming {
  color: #ffc107;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

.ticket-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
}

.ticket-btn {
  background: #e20613;
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  transition: background-color 0.3s;
}

.ticket-btn:hover {
  background: #c5050f;
  color: white;
}

.ticket-btn.secondary {
  background: #6c757d;
}

.ticket-btn.secondary:hover {
  background: #545b62;
}

.ticket-btn.disabled {
  background: #dee2e6;
  color: #6c757d;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .race-card {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.75rem;
  }
  
  .race-info h3 {
    font-size: 1rem;
  }
  
  .ticket-actions {
    flex-direction: row;
    justify-content: center;
  }
}
</style>

<div class="schedule-container">
  <div class="schedule-header">
    <h1>2025 Race Schedule</h1>
    <p>Complete schedule for AMA Supercross and Pro Motocross Championships</p>
  </div>

  <div class="schedule-nav">
    <a href="#supercross" class="nav-button">Supercross</a>
    <a href="#motocross" class="nav-button">Pro Motocross</a>
    <a href="/tickets/" class="nav-button">Get Tickets</a>
    <a href="/betting/" class="nav-button">Betting</a>
  </div>

  <div id="supercross" class="series-section">
    <div class="series-header">
      <h2 class="series-title">AMA Supercross Championship</h2>
      <p class="series-subtitle">17 Rounds • January - May 2025 • 450SX & 250SX</p>
    </div>
    <div class="race-grid">
      <div class="race-card completed">
        <div class="round-number">R1</div>
        <div class="race-info">
          <h3>Angel Stadium</h3>
          <p class="race-date">January 04, 2025</p>
          <p class="race-location">Anaheim, CA</p>
        </div>
        <div class="race-classes">450SX, 250SX West</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R2</div>
        <div class="race-info">
          <h3>Snapdragon Stadium</h3>
          <p class="race-date">January 11, 2025</p>
          <p class="race-location">San Diego, CA</p>
        </div>
        <div class="race-classes">450SX, 250SX West</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R3</div>
        <div class="race-info">
          <h3>Angel Stadium</h3>
          <p class="race-date">January 18, 2025</p>
          <p class="race-location">Anaheim, CA</p>
        </div>
        <div class="race-classes">450SX, 250SX West</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R4</div>
        <div class="race-info">
          <h3>State Farm Stadium</h3>
          <p class="race-date">January 25, 2025</p>
          <p class="race-location">Glendale, AZ</p>
        </div>
        <div class="race-classes">450SX, 250SX West</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R5</div>
        <div class="race-info">
          <h3>Ford Field</h3>
          <p class="race-date">February 01, 2025</p>
          <p class="race-location">Detroit, MI</p>
        </div>
        <div class="race-classes">450SX, 250SX East</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R6</div>
        <div class="race-info">
          <h3>Raymond James Stadium</h3>
          <p class="race-date">February 08, 2025</p>
          <p class="race-location">Tampa, FL</p>
        </div>
        <div class="race-classes">450SX, 250SX East</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R7</div>
        <div class="race-info">
          <h3>AT&T Stadium</h3>
          <p class="race-date">February 15, 2025</p>
          <p class="race-location">Arlington, TX</p>
        </div>
        <div class="race-classes">450SX, 250SX East</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R8</div>
        <div class="race-info">
          <h3>Daytona International Speedway</h3>
          <p class="race-date">February 22, 2025</p>
          <p class="race-location">Daytona Beach, FL</p>
        </div>
        <div class="race-classes">450SX, 250SX East</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R9</div>
        <div class="race-info">
          <h3>Lucas Oil Stadium</h3>
          <p class="race-date">March 01, 2025</p>
          <p class="race-location">Indianapolis, IN</p>
        </div>
        <div class="race-classes">450SX, 250SX East</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R10</div>
        <div class="race-info">
          <h3>Lumen Field</h3>
          <p class="race-date">March 08, 2025</p>
          <p class="race-location">Seattle, WA</p>
        </div>
        <div class="race-classes">450SX, 250SX West</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R11</div>
        <div class="race-info">
          <h3>Empower Field</h3>
          <p class="race-date">March 15, 2025</p>
          <p class="race-location">Denver, CO</p>
        </div>
        <div class="race-classes">450SX, 250SX West</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R12</div>
        <div class="race-info">
          <h3>NRG Stadium</h3>
          <p class="race-date">March 29, 2025</p>
          <p class="race-location">Houston, TX</p>
        </div>
        <div class="race-classes">450SX, 250SX East</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R13</div>
        <div class="race-info">
          <h3>Mercedes-Benz Stadium</h3>
          <p class="race-date">April 05, 2025</p>
          <p class="race-location">Atlanta, GA</p>
        </div>
        <div class="race-classes">450SX, 250SX East</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R14</div>
        <div class="race-info">
          <h3>Nissan Stadium</h3>
          <p class="race-date">April 12, 2025</p>
          <p class="race-location">Nashville, TN</p>
        </div>
        <div class="race-classes">450SX, 250SX East</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R15</div>
        <div class="race-info">
          <h3>Gillette Stadium</h3>
          <p class="race-date">April 19, 2025</p>
          <p class="race-location">Foxborough, MA</p>
        </div>
        <div class="race-classes">450SX, 250SX East</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R16</div>
        <div class="race-info">
          <h3>MetLife Stadium</h3>
          <p class="race-date">April 26, 2025</p>
          <p class="race-location">East Rutherford, NJ</p>
        </div>
        <div class="race-classes">450SX, 250SX East</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card completed">
        <div class="round-number">R17</div>
        <div class="race-info">
          <h3>Rice-Eccles Stadium</h3>
          <p class="race-date">May 03, 2025</p>
          <p class="race-location">Salt Lake City, UT</p>
        </div>
        <div class="race-classes">450SX, 250SX West</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
    </div>
  </div>

  <div id="motocross" class="series-section">
    <div class="series-header">
      <h2 class="series-title">Pro Motocross Championship</h2>
      <p class="series-subtitle">12 Rounds • May - August 2025 • 450MX & 250MX</p>
    </div>
    <div class="race-grid">
      <div class="race-card completed">
        <div class="round-number">R1</div>
        <div class="race-info">
          <h3>Fox Raceway</h3>
          <p class="race-date">May 24, 2025</p>
          <p class="race-location">Pala, CA</p>
        </div>
        <div class="race-classes">450MX, 250MX</div>
        <div class="race-status status-completed">✅ Completed</div>
        
              <div class="ticket-actions">
                <span class="ticket-btn disabled">Race Complete</span>
                <a href="/results/" class="ticket-btn secondary">View Results</a>
              </div>
      </div>
      <div class="race-card next-race">
        <div class="round-number">R2</div>
        <div class="race-info">
          <h3>Thunder Valley Motocross Park</h3>
          <p class="race-date">May 31, 2025</p>
          <p class="race-location">Lakewood, CO</p>
        </div>
        <div class="race-classes">450MX, 250MX</div>
        <div class="race-status status-next">🔴 Next Race</div>
        
              <div class="ticket-actions">
                <a href="https://www.promotocross.com/schedule" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>
      </div>
      <div class="race-card upcoming">
        <div class="round-number">R3</div>
        <div class="race-info">
          <h3>Southwick Motocross Park</h3>
          <p class="race-date">June 07, 2025</p>
          <p class="race-location">Southwick, MA</p>
        </div>
        <div class="race-classes">450MX, 250MX</div>
        <div class="race-status status-upcoming">🟡 Upcoming</div>
        
              <div class="ticket-actions">
                <a href="https://www.promotocross.com/schedule" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>
      </div>
      <div class="race-card upcoming">
        <div class="round-number">R4</div>
        <div class="race-info">
          <h3>High Point Raceway</h3>
          <p class="race-date">June 14, 2025</p>
          <p class="race-location">Mt. Morris, PA</p>
        </div>
        <div class="race-classes">450MX, 250MX</div>
        <div class="race-status status-upcoming">🟡 Upcoming</div>
        
              <div class="ticket-actions">
                <a href="https://www.promotocross.com/schedule" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>
      </div>
      <div class="race-card upcoming">
        <div class="round-number">R5</div>
        <div class="race-info">
          <h3>Muddy Creek Raceway</h3>
          <p class="race-date">June 21, 2025</p>
          <p class="race-location">Blountville, TN</p>
        </div>
        <div class="race-classes">450MX, 250MX</div>
        <div class="race-status status-upcoming">🟡 Upcoming</div>
        
              <div class="ticket-actions">
                <a href="https://www.promotocross.com/schedule" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>
      </div>
      <div class="race-card upcoming">
        <div class="round-number">R6</div>
        <div class="race-info">
          <h3>RedBud MX</h3>
          <p class="race-date">June 28, 2025</p>
          <p class="race-location">Buchanan, MI</p>
        </div>
        <div class="race-classes">450MX, 250MX</div>
        <div class="race-status status-upcoming">🟡 Upcoming</div>
        
              <div class="ticket-actions">
                <a href="https://www.promotocross.com/schedule" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>
      </div>
      <div class="race-card upcoming">
        <div class="round-number">R7</div>
        <div class="race-info">
          <h3>Spring Creek Motocross</h3>
          <p class="race-date">July 05, 2025</p>
          <p class="race-location">Millville, MN</p>
        </div>
        <div class="race-classes">450MX, 250MX</div>
        <div class="race-status status-upcoming">🟡 Upcoming</div>
        
              <div class="ticket-actions">
                <a href="https://www.promotocross.com/schedule" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>
      </div>
      <div class="race-card upcoming">
        <div class="round-number">R8</div>
        <div class="race-info">
          <h3>Washougal Motocross Park</h3>
          <p class="race-date">July 19, 2025</p>
          <p class="race-location">Washougal, WA</p>
        </div>
        <div class="race-classes">450MX, 250MX</div>
        <div class="race-status status-upcoming">🟡 Upcoming</div>
        
              <div class="ticket-actions">
                <a href="https://www.promotocross.com/schedule" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>
      </div>
      <div class="race-card upcoming">
        <div class="round-number">R9</div>
        <div class="race-info">
          <h3>Unadilla MX</h3>
          <p class="race-date">August 02, 2025</p>
          <p class="race-location">New Berlin, NY</p>
        </div>
        <div class="race-classes">450MX, 250MX</div>
        <div class="race-status status-upcoming">🟡 Upcoming</div>
        
              <div class="ticket-actions">
                <a href="https://www.promotocross.com/schedule" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>
      </div>
      <div class="race-card upcoming">
        <div class="round-number">R10</div>
        <div class="race-info">
          <h3>WW Ranch Motocross Park</h3>
          <p class="race-date">August 09, 2025</p>
          <p class="race-location">Jacksonville, FL</p>
        </div>
        <div class="race-classes">450MX, 250MX</div>
        <div class="race-status status-upcoming">🟡 Upcoming</div>
        
              <div class="ticket-actions">
                <a href="https://www.promotocross.com/schedule" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>
      </div>
      <div class="race-card upcoming">
        <div class="round-number">R11</div>
        <div class="race-info">
          <h3>Budds Creek Motocross</h3>
          <p class="race-date">August 16, 2025</p>
          <p class="race-location">Mechanicsville, MD</p>
        </div>
        <div class="race-classes">450MX, 250MX</div>
        <div class="race-status status-upcoming">🟡 Upcoming</div>
        
              <div class="ticket-actions">
                <a href="https://www.promotocross.com/schedule" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>
      </div>
      <div class="race-card upcoming">
        <div class="round-number">R12</div>
        <div class="race-info">
          <h3>Fox Raceway</h3>
          <p class="race-date">August 30, 2025</p>
          <p class="race-location">Pala, CA</p>
        </div>
        <div class="race-classes">450MX, 250MX</div>
        <div class="race-status status-upcoming">🟡 Upcoming</div>
        
              <div class="ticket-actions">
                <a href="https://www.promotocross.com/schedule" class="ticket-btn">Official Tickets</a>
                <a href="/betting/odds/" class="ticket-btn secondary">Betting Odds</a>
              </div>
      </div>
    </div>
  </div>

  <div class="series-section">
    <div class="series-header">
      <h2 class="series-title">Official Ticket Information</h2>
    </div>
    <div style="padding: 2rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
        <div>
          <h3 style="color: #e20613; margin-bottom: 1rem;">🏟️ Supercross Tickets</h3>
          <p><strong>Official Source:</strong> <a href="https://www.supercrosslive.com/tickets/" style="color: #e20613;">SupercrossLive.com</a></p>
          <p>Get authentic tickets directly from AMA Supercross for all stadium events.</p>
        </div>
        <div>
          <h3 style="color: #e20613; margin-bottom: 1rem;">🏁 Pro Motocross Tickets</h3>
          <p><strong>Official Source:</strong> <a href="https://www.promotocross.com/schedule" style="color: #e20613;">ProMotocross.com</a></p>
          <p>Purchase tickets for outdoor nationals directly from official sources.</p>
        </div>
      </div>
    </div>
  </div>
</div>