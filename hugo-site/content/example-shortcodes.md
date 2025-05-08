---
title: "Example Shortcodes"
description: "Demonstrating our custom shortcodes with the Blowfish theme"
date: 2023-04-19
draft: false
---

## Race Countdown Timer

The race-countdown shortcode displays a countdown timer to the next race with progress information:

{{< race-countdown title="Anaheim 1 Supercross" subtitle="Round 1 of the 2025 AMA Supercross Championship" date="January 4, 2025" daysLeft="260" total="365" countdown="Jan 4, 2025 19:00:00" buttontext="Event Details" buttonurl="/races/anaheim-1-2025" buttonicon="info-circle" button2text="Buy Tickets" button2url="https://tickets.supercrosslive.com" button2icon="ticket" >}}
The opening round of the 2025 Monster Energy Supercross Championship at Angel Stadium in Anaheim, California.
{{< /race-countdown >}}


# Using Shortcodes with Blowfish Theme

This page demonstrates how to use our custom shortcodes that integrate with the Blowfish theme styling.

## Individual Rider Card

The rider-card shortcode displays information about a single rider:

{{< rider-card 
    name="Jett Lawrence" 
    number="18" 
    division="450"
    team="Team Honda HRC"
    manufacturer="Honda"
    nationality="Australia"
    position="1"
    points="187"
    image="/images/riders/jett-lawrence.jpg"
>}}
Jett Lawrence is an Australian motocross and supercross racer who has quickly risen to the top of the sport. Known for his smooth riding style and technical ability, Jett has become one of the most dominant riders in the 450 class.
{{< /rider-card >}}

## Individual Track Info

The track-info shortcode displays information about a track with a description:

{{< track-info
    name="Snapdragon Stadium"
    type="Supercross"
    location="San Diego, CA"
    length="850m"
    surface="Hard-packed dirt"
    upcoming="February 3, 2025"
    image="/images/tracks/snapdragon-stadium.jpg"
>}}
Snapdragon Stadium is a state-of-the-art venue featuring a challenging track layout with multiple rhythm sections, a sand section, and one of the longest start straights in the series.
{{< /track-info >}}

## Rider Grid

The rider-grid shortcode can display multiple riders in a grid format:

### Built-in Functionality

This will automatically display all riders from the "riders" section with the "450" division:

{{< rider-grid division="450" columns="3" >}}{{< /rider-grid >}}

### Manual Grid

You can also manually add rider cards to a grid:

{{< rider-grid columns="2" >}}
  {{< rider-card 
      name="Jett Lawrence" 
      number="18" 
      division="450"
      team="Team Honda HRC"
      manufacturer="Honda"
      position="1"
      points="187"
  >}}{{< /rider-card >}}
  
  {{< rider-card 
      name="Chase Sexton" 
      number="1" 
      division="450"
      team="Red Bull KTM"
      manufacturer="KTM"
      position="2"
      points="161"
  >}}{{< /rider-card >}}
{{< /rider-grid >}}

## Track Grid

The track-grid shortcode can display multiple tracks in a grid format:

### Built-in Functionality

This will automatically display all tracks from the "tracks" section:

{{< track-grid type="all" columns="2" >}}{{< /track-grid >}}

### Filtered by Type

You can filter tracks by type:

{{< track-grid type="Supercross" columns="2" >}}{{< /track-grid >}}

### Manual Grid

You can also manually add track information to a grid:

{{< track-grid columns="2" >}}
  {{< track-info
      name="Snapdragon Stadium"
      type="Supercross"
      location="San Diego, CA"
      length="850m"
  >}}{{< /track-info >}}
  
  {{< track-info
      name="Angel Stadium"
      type="Supercross"
      location="Anaheim, CA"
      length="790m"
  >}}{{< /track-info >}}
{{< /track-grid >}}

## Rider Comparison

The comparison shortcode allows comparing two riders side by side:

{{< comparison 
    title="2025 Championship Contenders" 
    leftTitle="Jett Lawrence" 
    leftSubtitle="Team Honda HRC"
    leftImage="/images/riders/jett-lawrence.jpg"
    rightTitle="Chase Sexton" 
    rightSubtitle="Red Bull KTM"
    rightImage="/images/riders/chase-sexton.jpg"
    middleTitle="Head-to-Head"
    middleSubtitle="2025 Season Stats"
    metric1="Wins" 
    metric1Numeric="true" 
    metric1HigherIsBetter="true"
    leftWins="5"
    rightWins="3"
    metric2="Podiums" 
    metric2Numeric="true" 
    metric2HigherIsBetter="true"
    leftPodiums="8"
    rightPodiums="7"
    metric3="Championship Points" 
    metric3Numeric="true" 
    metric3HigherIsBetter="true"
    leftChampionshipPoints="187"
    rightChampionshipPoints="161"
>}}
Two of the most talented riders in the 450 class battling for the championship. Both riders have shown incredible speed and consistency throughout the season.
{{< /comparison >}}