---
title: "Motocross"
description: "Everything you need to know about AMA Pro Motocross including schedules, results, and standings."
layout: "list"
---

# AMA Pro Motocross

Motocross is the outdoor form of off-road motorcycle racing, held on natural terrain tracks with hills, jumps, and challenging obstacles. The AMA Pro Motocross Championship runs during the summer months after the Supercross season ends, featuring 12 rounds at iconic outdoor venues across the United States.

## 2025 Season

The 2025 AMA Pro Motocross Championship brings the world's top riders to America's most challenging outdoor tracks. From the season opener at Fox Raceway to the final showdown at Ironman Raceway, follow all the high-flying action and intense competition in both 250cc and 450cc classes.

## Upcoming Motocross Nationals

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
{{ range where .Site.RegularPages "Section" "races" }}
  {{ partial "article-link/race-card" . }}
{{ end }}
</div>

{{< tailwind-carousel height="500px" mobileHeight="300px" type="track" >}}