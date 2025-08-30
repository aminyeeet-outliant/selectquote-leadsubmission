Feature: Quote Form

    Scenario Outline: Successful submission
        Given the user access the SelectQuote homepage
        When the user click the Get a Quote button
        And the user selects month "<month>", day "<day>" and year "<year>"
        And the user click the Next button
        And the user selects gender "<gender>"
        And the user click the Next button
        And the user selects coverage "<coverage>"
        And the user click the Next button
        And the user input zip code "<zipCode>"
        And the user click the Next button
        And the user input email "<email>"
        And the user click the Next button
        And the user input first name "<firstName>" and last name "<lastName>"
        And the user click the Next button
        And the user input phone "<phone>"
        And the user click the Next button
        Then user should be redirected to the correct confirmation page
        And confirmation url should be correct
        And email "<email>" should be the same

        Examples:
            | month   | day | year | gender | coverage | zipCode | email          | firstName | lastName | phone          |
            | January | 2   | 1940 | Male   | 20000    | 90001   | test@gmail.com | Test      | Name     | (913) 897-4196 |
