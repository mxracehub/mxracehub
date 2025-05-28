#!/usr/bin/env python3
"""
Test script for rider standings update functionality
Tests the integration with the existing rider pages
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from update_rider_standings import RiderStandingsUpdater

def test_standings_integration():
    """Test the standings update with sample data"""
    print("🏁 Testing rider standings update integration...")
    
    updater = RiderStandingsUpdater()
    
    # Sample 450 standings data for testing
    sample_450_standings = [
        {'position': 1, 'rider_name': 'Jett Lawrence', 'rider_number': '18', 'points': 485, 'division': '450'},
        {'position': 2, 'rider_name': 'Cooper Webb', 'rider_number': '2', 'points': 462, 'division': '450'},
        {'position': 3, 'rider_name': 'Chase Sexton', 'rider_number': '1', 'points': 445, 'division': '450'},
        {'position': 4, 'rider_name': 'Eli Tomac', 'rider_number': '3', 'points': 398, 'division': '450'},
        {'position': 5, 'rider_name': 'Jason Anderson', 'rider_number': '21', 'points': 375, 'division': '450'},
        {'position': 6, 'rider_name': 'Ken Roczen', 'rider_number': '94', 'points': 342, 'division': '450'},
        {'position': 7, 'rider_name': 'Malcolm Stewart', 'rider_number': '27', 'points': 318, 'division': '450'},
        {'position': 8, 'rider_name': 'Dylan Ferrandis', 'rider_number': '14', 'points': 295, 'division': '450'},
        {'position': 9, 'rider_name': 'Shane McElrath', 'rider_number': '12', 'points': 272, 'division': '450'},
        {'position': 10, 'rider_name': 'Justin Barcia', 'rider_number': '51', 'points': 245, 'division': '450'}
    ]
    
    # Sample 250 East standings
    sample_250_east = [
        {'position': 1, 'rider_name': 'Haiden Deegan', 'rider_number': '38', 'points': 215, 'division': '250_east'},
        {'position': 2, 'rider_name': 'Tom Vialle', 'rider_number': '28', 'points': 198, 'division': '250_east'},
        {'position': 3, 'rider_name': 'RJ Hampshire', 'rider_number': '24', 'points': 185, 'division': '250_east'},
        {'position': 4, 'rider_name': 'Pierce Brown', 'rider_number': '45', 'points': 172, 'division': '250_east'},
        {'position': 5, 'rider_name': 'Jordon Smith', 'rider_number': '31', 'points': 158, 'division': '250_east'}
    ]
    
    # Sample 250 West standings  
    sample_250_west = [
        {'position': 1, 'rider_name': 'Levi Kitchen', 'rider_number': '80', 'points': 202, 'division': '250_west'},
        {'position': 2, 'rider_name': 'Chance Hymas', 'rider_number': '30', 'points': 189, 'division': '250_west'},
        {'position': 3, 'rider_name': 'Jo Shimoda', 'rider_number': '91', 'points': 175, 'division': '250_west'},
        {'position': 4, 'rider_name': 'Garrett Marchbanks', 'rider_number': '61', 'points': 162, 'division': '250_west'},
        {'position': 5, 'rider_name': 'Mitchell Oldenburg', 'rider_number': '72', 'points': 148, 'division': '250_west'}
    ]
    
    # Test 450 standings update
    print("Testing 450 class standings update...")
    success_450 = updater.update_450_standings(sample_450_standings)
    
    # Test 250 standings update
    print("Testing 250 class standings update...")
    success_250 = updater.update_250_standings(sample_250_east, sample_250_west)
    
    if success_450 and success_250:
        print("✅ Standings integration test completed successfully!")
        print("📊 Both 450 and 250 class standings have been updated with sample data")
        return True
    else:
        print("❌ Standings integration test failed")
        return False

if __name__ == "__main__":
    test_standings_integration()