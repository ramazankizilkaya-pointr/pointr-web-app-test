Feature: Improved Search Pane Tests in Desktop

Background: Load landing page
    Given I open demo app in a browser

Scenario: As a web app user, I should see search input and category list in the improved search pane
    When I see search box, magnify icon and placeholder are visible
    Then I should verify category list is visible with "7" options inside

Scenario: As a web app user, I should see Search Results header and directory list, When I click on Search input
    When I click on search input
    Then I should see Search Results header
    Then I should see letter list with 26 letters
    Then I should see left arrow button
    Then I should see Location dropdown
    Then I should see cross icon in the search input

Scenario: As a web app user, I should verify search input loses focus, When I click on cross icon inside search input
    When I click on search input
    When I wait until Search Results header appears
    When I click on cross icon in the search input
    Then Search Results header should not be displayed
    Then left arrow button should not be displayed
    Then I should verify category list is visible with "7" options inside

Scenario: As a web app user, I should be able to click on letters on letter directory and verify letter I clicked is active and selected
    When I click on search input
    When I wait until letter list appears
    When I click on each letter in order
    Then I should verify the letter I clicked is active and selected

Scenario: As a web app user, I should verify corresponding results are displayed, When I click on a category option from category list
    When I click on each category option in order
    Then I should see the text of the clicked category in the search header
    Then I should verify relevant search results are displayed and some of the letters in the letter list are disabled

Scenario: As a web app user, I should be able to scroll search results down and verify active letter changes
    When I click on search input
    When I click on "A" from letter list
    When I scroll search results "down"
    Then I should verify the active letter is no longer "A"

Scenario: As a web app user, I should be able to scroll search results up verify and active letter changes
    When I click on search input
    When I click on "Z" from letter list
    When I scroll search results "up"
    Then I should verify the active letter is no longer "Z"

Scenario: As a web app user, I should see setup a route modal, When I select a result from the search results
    When I click on search input
    When I click on "D" from letter list
    When I click on random search result
    When I click on Directions button
    Then Set up a route modal should be displayed

Scenario: As a web app user, I should be able to expand a search group and click on a result from the expanded group
    When I click on search input
    When I click on "J" from letter list
    When I expand a search group
    When I click on random search result from the expanded search group
    When I click on Directions button
    Then Set up a route modal should be displayed