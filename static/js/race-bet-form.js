document.addEventListener('DOMContentLoaded', function() {
  // Get all select elements
  const betTypeSelect = document.getElementById('bet-type');
  const riderSelect = document.querySelector('.rider-select');
  const friendSelect = document.getElementById('friend-select');
  const headToHeadSection = document.getElementById('head-to-head-section');

  // Populate rider select with sample data (replace with API call later)
  const riders = [
    { id: 1, name: 'Jett Lawrence' },
    { id: 2, name: 'Cooper Webb' },
    { id: 3, name: 'Eli Tomac' },
    { id: 4, name: 'Chase Sexton' },
    { id: 5, name: 'Ken Roczen' }
  ];

  riders.forEach(rider => {
    const option = document.createElement('option');
    option.value = rider.id;
    option.textContent = rider.name;
    riderSelect.appendChild(option);
  });

  // Handle bet type changes
  betTypeSelect.addEventListener('change', function() {
    const selectedType = this.value;

    if (selectedType === 'head_to_head') {
      headToHeadSection.style.display = 'block';
    } else {
      headToHeadSection.style.display = 'none';
    }
  });

  // Sample friends data (replace with API call)
  const friends = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Mike Wilson' }
  ];

  friends.forEach(friend => {
    const option = document.createElement('option');
    option.value = friend.id;
    option.textContent = friend.name;
    friendSelect.appendChild(option);
  });

  // Handle form submission
  const form = document.getElementById('bet-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const betData = {
      betType: formData.get('betType'),
      rider1: formData.get('rider1'),
      rider2: formData.get('rider2'),
      amount: formData.get('amount'),
      friend: formData.get('friend')
    };

    console.log('Bet data:', betData);
    // Add API call here to submit bet
  });
});