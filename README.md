# Resourcing for ShapeUp

Use it here: https://shapeup-scheduler.searchspring.com

Simple resourcing app that fits the criteria of the ShapeUp Methodology from the folks at Basecamp.  https://basecamp.com/shapeup

This tool runs as a webapp and allows you to schedule humans onto bets.  

There are three types of bet, Small (2 week), Medium (4 week), Large (6 week).  

## Setup

You'll need to define two data sources in the form of Google Sheets.
1. Humans - A google sheet with a list of people, the team they're on, and the number of business days they're available in the bet cycle (a maximum of 30 work days in a bet cycle): 
    ```
    Name,    Team,          Days Available
    Norbert, Platform Team, 30
    Rachel,  Alpha Team,    27 
    ```
2. Bets - A google sheet with a list of bets with the following schema (team name optional): 
    ```
    Bet Name,  Size,  Team
    Widget A,  small, Alpha Team
    Feature B, large, Platform Team
    ```

## Setup
Go to https://shapeup-scheduler.searchspring.com and the setup process will ask you for your two spreadsheet URLs and then OAuth you in to connect to them and grab the data.

## Usage

All selections are persisted to local storage so you can refresh the browser and come back later without losing work.

### Synchronizing
Click the sync button on the human section to refresh the days available if it changes.  This will preserve all the current selections.

Click on the sync button on the bets section to refresh the bets.  This operation will preserve all the current selections for bets that don't change name.

### Assigning 
Click on a person or persons to select them.  Then select the bets that they should be assigned to.  You'll see the available days reduce as they're put onto each bet.  

### Unassigning
Click on the person inside the bet to remove them from the bet.