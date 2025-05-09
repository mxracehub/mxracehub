---
title: "Supercross"
description: "Everything you need to know about AMA Supercross racing, including schedules, results, and standings."
layout: "list"
---

# AMA Supercross

Supercross is the indoor variant of motocross racing, held in stadiums on artificially created dirt tracks featuring steep jumps, obstacles, and rhythm sections. The AMA Supercross Championship runs from January to May each year and showcases the world's best riders competing in both 250cc and 450cc classes.

## 2025 Season

The 2025 AMA Supercross Championship features 17 rounds across the United States, visiting iconic venues like Angel Stadium, Daytona International Speedway, and AT&T Stadium. Follow all the action, from the season opener in Anaheim to the final showdown in Salt Lake City.

## Upcoming Supercross Events

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
{{ range where .Site.RegularPages "Section" "races" }}
  {{ partial "article-link/race-card" . }}
{{ end }}
</div>

{{< tailwind-carousel height="500px" mobileHeight="300px" type="track" >}}