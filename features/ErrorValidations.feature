Feature: Error validations

    @validation
    Scenario: Placing the Order
        Given User LoggedIn to Ecommerce2 application with "sky@ymail.com" and "Learning"
        Then  User Verifies that Error message contains "Incorrect"
