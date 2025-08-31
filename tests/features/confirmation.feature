Feature: Quote Form

    @desktop
    Scenario Outline: Successful Final expense submission in Desktop
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
        And the user click the Get Free Quotes button
        Then user should be redirected to the correct confirmation page
        And confirmation final expense url should be correct
        And email should be the same
        And data provided should match api payload
        And data should be generated into a csv

        Examples:
            | month   | day | year | gender | coverage | zipCode | email          | firstName | lastName | phone          |
            | January | 2   | 1940 | Male   | 20000    | 90001   | test@gmail.com | Test      | Name     | (913) 897-4196 |

    @mobile
    Scenario Outline: Successful Final expense submission in Mobile
        Given the user access the SelectQuote homepage
        When the user click the burger menu
        And the user click the Get a Quote button
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
        And the user click the Get Free Quotes button
        Then user should be redirected to the correct confirmation page
        And confirmation final expense url should be correct
        And email should be the same
        And data provided should match api payload
        And data should be generated into a csv

        Examples:
            | month   | day | year | gender | coverage | zipCode | email          | firstName | lastName | phone          |
            | January | 2   | 1940 | Male   | 20000    | 90001   | test@gmail.com | Test      | Name     | (913) 897-4196 |

    @desktop
    Scenario Outline: Successful submission with year > 1950 in Desktop
        Given the user access the SelectQuote homepage
        When the user click the Get a Quote button
        And the user selects month "<month>", day "<day>" and year "<year>"
        And the user click the Next button
        And the user selects gender "<gender>"
        And the user click the Next button
        And the user selects overall health "<health>"
        And the user click the Next button
        And the user input height ft "<height_ft>", inches "<height_in>" and weight "<weight>"
        And the user click the Next button
        And the user input zip code "<zipCode>"
        And the user click the Next button
        And the user selects current insurance "<currentInsurance>"
        And the user click the Next button
        And the user selects type of insurance "<insuranceType>"
        And the user click the Next button
        And the user selects annual income from salary and wages "<income>"
        And the user click the Next button
        And the user selects coverage "<coverage>" adn term "<term>"
        And the user click the Next button
        And the user selects smoke "<smoke>"
        And the user click the Next button
        And the user selects condition "<condition>"
        And the user click the Next button
        And the user selects violations "<violations>"
        And the user click the Next button
        And the user selects activities "<activities>"
        And the user click the Next button
        And the user selects disease history "<diseaseHistory>"
        And the user click the Next button
        And the user input email "<email>"
        And the user input first name "<firstName>" and last name "<lastName>"
        And the user click the Next button
        And the user input address "<zipCode>"
        And the user input zip code "<zipCode>"
        And the user click the Next button
        And the user input phone "<phone>"
        And the user click the Next button
        And the user selects referral "<referral>"
        And the user click the Submit button
        Then confirmation quote form url should be correct
        And email should be the same
        And data provided should match api payload
        And data should be generated into a csv

        Examples:
            | month   | day | year | gender | health    | height_ft | height_in | weight | currentInsurance | insuranceType | income            | coverage | term | smoke | condition     | violations | activities | diseaseHistory | zipCode | email          | firstName | lastName | phone          | referral      |
            | January | 2   | 1999 | Male   | Excellent | 6         | 2         | 123    | No               | Term          | $50,000 - $99,999 | 500000   | 15   | No    | None of these | No         | No         | No             | 90001   | test@gmail.com | Test      | Name     | (913) 897-4196 | None of these |

    @mobile
    Scenario Outline: Successful submission with year > 1950 in Mobile
        Given the user access the SelectQuote homepage
        When the user click the burger menu
        And the user click the Get a Quote button
        And the user selects month "<month>", day "<day>" and year "<year>"
        And the user click the Next button
        And the user selects gender "<gender>"
        And the user click the Next button
        And the user selects overall health "<health>"
        And the user click the Next button
        And the user input height ft "<height_ft>", inches "<height_in>" and weight "<weight>"
        And the user click the Next button
        And the user input zip code "<zipCode>"
        And the user click the Next button
        And the user selects current insurance "<currentInsurance>"
        And the user click the Next button
        And the user selects type of insurance "<insuranceType>"
        And the user click the Next button
        And the user selects annual income from salary and wages "<income>"
        And the user click the Next button
        And the user selects coverage "<coverage>" adn term "<term>"
        And the user click the Next button
        And the user selects smoke "<smoke>"
        And the user click the Next button
        And the user selects condition "<condition>"
        And the user click the Next button
        And the user selects violations "<violations>"
        And the user click the Next button
        And the user selects activities "<activities>"
        And the user click the Next button
        And the user selects disease history "<diseaseHistory>"
        And the user click the Next button
        And the user input email "<email>"
        And the user input first name "<firstName>" and last name "<lastName>"
        And the user click the Next button
        And the user input address "<zipCode>"
        And the user input zip code "<zipCode>"
        And the user click the Next button
        And the user input phone "<phone>"
        And the user click the Next button
        And the user selects referral "<referral>"
        And the user click the Submit button
        Then confirmation quote form url should be correct
        And email should be the same
        And data provided should match api payload
        And data should be generated into a csv

        Examples:
            | month   | day | year | gender | health    | height_ft | height_in | weight | currentInsurance | insuranceType | income            | coverage | term | smoke | condition     | violations | activities | diseaseHistory | zipCode | email          | firstName | lastName | phone          | referral      |
            | January | 2   | 1999 | Male   | Excellent | 6         | 2         | 123    | No               | Term          | $50,000 - $99,999 | 500000   | 15   | No    | None of these | No         | No         | No             | 90001   | test@gmail.com | Test      | Name     | (913) 897-4196 | None of these |
