#!/usr/bin/env python3
"""
Generate professional SVG rider graphics for all riders
Creates authentic team-colored rider silhouettes and graphics
"""

import os
import yaml
import glob
from pathlib import Path

def get_team_colors(team_name):
    """Get official team colors for SVG generation"""
    team_colors = {
        "Red Bull KTM Factory Racing": {
            "primary": "#FF6900",
            "secondary": "#002F87", 
            "accent": "#FFFFFF"
        },
        "Monster Energy Kawasaki": {
            "primary": "#00A651",
            "secondary": "#000000",
            "accent": "#FFFFFF"
        },
        "Team Honda HRC": {
            "primary": "#CC0000",
            "secondary": "#000000",
            "accent": "#FFFFFF"
        },
        "Monster Energy Yamaha Star Racing": {
            "primary": "#0066CC",
            "secondary": "#FFFF00",
            "accent": "#000000"
        },
        "ClubMX Yamaha": {
            "primary": "#0066CC",
            "secondary": "#666666",
            "accent": "#FFFFFF"
        },
        "Phoenix Racing Honda": {
            "primary": "#CC0000",
            "secondary": "#FFD700",
            "accent": "#FFFFFF"
        },
        "Triumph Racing": {
            "primary": "#000080",
            "secondary": "#C0C0C0",
            "accent": "#FFFFFF"
        },
        "Firepower Honda Racing": {
            "primary": "#CC0000",
            "secondary": "#FF4500",
            "accent": "#FFFFFF"
        }
    }
    
    # Default colors for teams not listed
    return team_colors.get(team_name, {
        "primary": "#333333",
        "secondary": "#666666", 
        "accent": "#FFFFFF"
    })

def generate_rider_svg(rider_info, output_path):
    """Generate a professional SVG graphic for a rider"""
    
    name = rider_info.get('title', 'Rider')
    number = rider_info.get('number', '0')
    team = rider_info.get('team', 'Independent')
    class_division = rider_info.get('class', '450')
    nationality = rider_info.get('nationality', 'USA')
    
    colors = get_team_colors(team)
    
    # Create professional rider SVG with team colors
    svg_content = f'''<svg width="400" height="500" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{colors['primary']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{colors['secondary']};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{colors['secondary']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{colors['primary']};stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background Circle -->
  <circle cx="200" cy="250" r="180" fill="url(#teamGradient)" opacity="0.1"/>
  
  <!-- Rider Number Background -->
  <circle cx="200" cy="100" r="50" fill="url(#teamGradient)" stroke="{colors['accent']}" stroke-width="3"/>
  
  <!-- Rider Number -->
  <text x="200" y="115" font-family="Arial Black, sans-serif" font-size="36" font-weight="bold" 
        text-anchor="middle" fill="{colors['accent']}">{number}</text>
  
  <!-- Rider Silhouette -->
  <!-- Helmet -->
  <ellipse cx="200" cy="200" rx="25" ry="30" fill="url(#helmetGradient)" stroke="{colors['accent']}" stroke-width="2"/>
  
  <!-- Visor -->
  <ellipse cx="200" cy="195" rx="20" ry="12" fill="{colors['accent']}" opacity="0.8"/>
  
  <!-- Body/Jersey -->
  <rect x="175" y="220" width="50" height="80" rx="10" fill="url(#teamGradient)" stroke="{colors['accent']}" stroke-width="2"/>
  
  <!-- Arms -->
  <ellipse cx="160" cy="240" rx="12" ry="35" fill="{colors['secondary']}" stroke="{colors['accent']}" stroke-width="1"/>
  <ellipse cx="240" cy="240" rx="12" ry="35" fill="{colors['secondary']}" stroke="{colors['accent']}" stroke-width="1"/>
  
  <!-- Gloves -->
  <circle cx="160" cy="270" r="8" fill="{colors['primary']}"/>
  <circle cx="240" cy="270" r="8" fill="{colors['primary']}"/>
  
  <!-- Pants -->
  <rect x="180" y="290" width="40" height="60" rx="8" fill="{colors['secondary']}" stroke="{colors['accent']}" stroke-width="2"/>
  
  <!-- Legs -->
  <ellipse cx="185" cy="360" rx="8" ry="30" fill="{colors['secondary']}"/>
  <ellipse cx="215" cy="360" rx="8" ry="30" fill="{colors['secondary']}"/>
  
  <!-- Boots -->
  <ellipse cx="185" cy="385" rx="12" ry="15" fill="{colors['primary']}"/>
  <ellipse cx="215" cy="385" rx="12" ry="15" fill="{colors['primary']}"/>
  
  <!-- Class Badge -->
  <rect x="320" y="20" width="60" height="25" rx="5" fill="{colors['primary']}" stroke="{colors['accent']}" stroke-width="2"/>
  <text x="350" y="37" font-family="Arial, sans-serif" font-size="14" font-weight="bold" 
        text-anchor="middle" fill="{colors['accent']}">{class_division}</text>
  
  <!-- Nationality Flag Area -->
  <rect x="20" y="20" width="40" height="25" rx="3" fill="{colors['secondary']}" stroke="{colors['accent']}" stroke-width="1"/>
  <text x="40" y="37" font-family="Arial, sans-serif" font-size="12" font-weight="bold" 
        text-anchor="middle" fill="{colors['accent']}">{nationality}</text>
  
  <!-- Rider Name -->
  <text x="200" y="450" font-family="Arial, sans-serif" font-size="20" font-weight="bold" 
        text-anchor="middle" fill="{colors['primary']}">{name.upper()}</text>
  
  <!-- Team Name -->
  <text x="200" y="475" font-family="Arial, sans-serif" font-size="12" 
        text-anchor="middle" fill="{colors['secondary']}" opacity="0.8">{team}</text>
</svg>'''
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Write SVG file
    with open(output_path, 'w') as f:
        f.write(svg_content)
    
    return output_path

def process_all_riders():
    """Process all rider markdown files and generate SVGs"""
    
    rider_files = glob.glob("content/riders/**/*.md", recursive=True)
    generated_count = 0
    
    print("🎨 Generating professional SVG graphics for all riders...")
    
    for rider_file in rider_files:
        try:
            with open(rider_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Parse front matter
            if content.startswith('---'):
                parts = content.split('---', 2)
                if len(parts) >= 2:
                    front_matter = yaml.safe_load(parts[1])
                    
                    # Generate rider slug from filename
                    rider_slug = Path(rider_file).stem
                    
                    # Create SVG output path
                    svg_path = f"static/img/riders/{rider_slug}.svg"
                    
                    # Generate the SVG
                    generate_rider_svg(front_matter, svg_path)
                    
                    # Update the rider's profile_image field in the markdown
                    if 'profile_image' not in front_matter or not front_matter['profile_image']:
                        # Update the front matter to include the SVG path
                        front_matter['profile_image'] = f"/img/riders/{rider_slug}.svg"
                        
                        # Write back the updated content
                        updated_front_matter = yaml.dump(front_matter, default_flow_style=False, allow_unicode=True)
                        updated_content = f"---\n{updated_front_matter}---\n{parts[2] if len(parts) > 2 else ''}"
                        
                        with open(rider_file, 'w', encoding='utf-8') as f:
                            f.write(updated_content)
                    
                    generated_count += 1
                    print(f"   ✅ Generated SVG for {front_matter.get('title', rider_slug)}")
                    
        except Exception as e:
            print(f"   ❌ Error processing {rider_file}: {e}")
    
    print(f"\n🎉 Generated {generated_count} professional rider SVG graphics!")
    print("   All riders now have authentic team-colored profile graphics")

if __name__ == "__main__":
    process_all_riders()