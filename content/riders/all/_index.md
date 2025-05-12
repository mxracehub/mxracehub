
---
title: "All Riders"
description: "Complete list of 250 and 450 class riders"
---

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <div class="text-sm text-neutral-500 mb-4">
    <span id="rider-count"></span> riders found
  </div>

  <div class="mb-6">
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
  const riders = document.querySelectorAll('.rider-card');

  // Update rider count
  riderCount.textContent = riders.length;

  // Handle filter clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update button states
      filterButtons.forEach(b => b.classList.replace('bg-primary', 'bg-neutral-200'));
      btn.classList.replace('bg-neutral-200', 'bg-primary');

      const selectedClass = btn.dataset.class;

      // Filter riders
      riders.forEach(rider => {
        if (selectedClass === 'all' || rider.dataset.class === selectedClass) {
          rider.style.display = 'block';
        } else {
          rider.style.display = 'none';
        }
      });

      // Update count
      const visibleRiders = document.querySelectorAll('.rider-card[style="display: block"]');
      riderCount.textContent = visibleRiders.length;
    });
  });
});
</script>
