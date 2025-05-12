
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const betTypeSelect = document.getElementById('bet-type');
  const riderSelect = document.querySelector('.rider-select');
  const friendSelect = document.getElementById('friend-select');
  const headToHeadSection = document.getElementById('head-to-head-section');

  // Sample riders data (replace with API call)
  const riders = [
    { id: 1, name: 'Jett Lawrence' },
    { id: 2, name: 'Cooper Webb' },
    { id: 3, name: 'Eli Tomac' },
    { id: 4, name: 'Chase Sexton' },
    { id: 5, name: 'Ken Roczen' }
  ];

  // Populate rider dropdowns
  function populateRiders(selectElement) {
    riders.forEach(rider => {
      const option = document.createElement('option');
      option.value = rider.id;
      option.textContent = rider.name;
      selectElement.appendChild(option);
    });
  }

  populateRiders(riderSelect);

  // Handle bet type changes
  betTypeSelect.addEventListener('change', function() {
    if (this.value === 'head_to_head') {
      headToHeadSection.style.display = 'block';
    } else {
      headToHeadSection.style.display = 'none';
    }
  });

  // Create searchable friend dropdown
  friendSelect.insertAdjacentHTML('beforebegin', `
    <div class="friend-search-container">
      <input type="text" id="friend-search" placeholder="Search friends..." class="friend-search-input">
      <div id="friend-search-results" class="friend-search-results"></div>
    </div>
  `);

  const friendSearch = document.getElementById('friend-search');
  const friendSearchResults = document.getElementById('friend-search-results');
  
  // Sample friends data - in real app, fetch from API
  const friends = [
    { id: 1, username: 'johndoe', firstName: 'John', lastName: 'Doe' },
    { id: 2, username: 'janedoe', firstName: 'Jane', lastName: 'Doe' },
    { id: 3, username: 'rider42', firstName: 'Mike', lastName: 'Johnson' },
    { id: 4, username: 'mxfan99', firstName: 'Sarah', lastName: 'Williams' },
    { id: 5, username: 'race_lover', firstName: 'Tom', lastName: 'Taylor' }
  ];

  let selectedFriend = null;

  friendSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    friendSearchResults.innerHTML = '';
    
    if (searchTerm.length < 2) {
      friendSearchResults.style.display = 'none';
      return;
    }

    const matches = friends.filter(friend => 
      friend.username.toLowerCase().includes(searchTerm) ||
      friend.firstName.toLowerCase().includes(searchTerm) ||
      friend.lastName.toLowerCase().includes(searchTerm)
    );

    if (matches.length > 0) {
      matches.forEach(friend => {
        const div = document.createElement('div');
        div.className = 'friend-search-item';
        div.innerHTML = `
          <span class="friend-name">${friend.firstName} ${friend.lastName}</span>
          <span class="friend-username">@${friend.username}</span>
        `;
        div.addEventListener('click', () => {
          selectedFriend = friend;
          friendSearch.value = `${friend.firstName} ${friend.lastName}`;
          friendSearchResults.style.display = 'none';
          friendSelect.value = friend.id;
        });
        friendSearchResults.appendChild(div);
      });
      friendSearchResults.style.display = 'block';
    } else {
      friendSearchResults.innerHTML = '<div class="no-results">No friends found</div>';
      friendSearchResults.style.display = 'block';
    }
  });

  // Hide results when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.friend-search-container')) {
      friendSearchResults.style.display = 'none';
    }
  });

  // Form submission handling
  const betForm = document.getElementById('bet-form');
  betForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!selectedFriend) {
      alert('Please select a friend to challenge');
      return;
    }
    // Handle form submission
    console.log('Selected friend:', selectedFriend);
    // Add your form submission logic here
  });
});
