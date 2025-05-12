
---
title: "All Riders"
description: "Complete list of 250 and 450 class riders"
---

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <div class="mb-6">
    <input type="search" id="rider-search" placeholder="Search riders..." class="w-full p-3 border rounded-lg mb-4">
    <div class="text-sm text-neutral-500 mb-4">
      <span id="rider-count"></span> riders found
    </div>
    <div class="flex gap-4 flex-wrap">
      <button class="filter-btn px-4 py-2 rounded-full bg-primary text-white" data-class="all">All Classes</button>
      <button class="filter-btn px-4 py-2 rounded-full bg-neutral-200" data-class="450">450 Class</button>
      <button class="filter-btn px-4 py-2 rounded-full bg-neutral-200" data-class="250">250 Class</button>
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="riders-grid">
    {{< rider-grid >}}{{< /rider-grid >}}
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const ridersGrid = document.getElementById('riders-grid');
  const riderCount = document.getElementById('rider-count');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('rider-search');
  const riders = document.querySelectorAll('.rider-card');
  let currentClass = 'all';

  function updateRiderVisibility() {
    const searchTerm = searchInput.value.toLowerCase();
    let visibleCount = 0;

    riders.forEach(rider => {
      const riderName = rider.querySelector('.rider-name').textContent.toLowerCase();
      const riderTeam = rider.querySelector('.rider-team').textContent.toLowerCase();
      const riderNumber = rider.querySelector('.rider-number').textContent;
      const matchesSearch = riderName.includes(searchTerm) || 
                          riderTeam.includes(searchTerm) || 
                          riderNumber.includes(searchTerm);
      const matchesClass = currentClass === 'all' || rider.dataset.class === currentClass;

      if (matchesSearch && matchesClass) {
        rider.style.display = 'block';
        visibleCount++;
      } else {
        rider.style.display = 'none';
      }
    });

    riderCount.textContent = visibleCount;
  }

  // Initial count
  riderCount.textContent = riders.length;

  // Search input handler
  searchInput.addEventListener('input', updateRiderVisibility);

  // Filter button handler
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.replace('bg-primary', 'bg-neutral-200'));
      btn.classList.replace('bg-neutral-200', 'bg-primary');
      currentClass = btn.dataset.class;
      updateRiderVisibility();
    });
  });
});
</script>
