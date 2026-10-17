Feature: Ecommerce validations

    @Regression
    Scenario: Placing the Order
        Given User LoggedIn to Ecommerce application with "sky@ymail.com" and "Learning@830$3mK2"
        When  User adds "ZARA COAT 3" to Cart
        Then  User Verifies "ZARA COAT 3" is displayed in the Cart
        When  User Enter Valid details and Place the Order
        Then  Verify order is present in the OrderHistory

    @Regression
    Scenario Outline: Placing Orders for Various Users
        Given User LoggedIn to Ecommerce application with "<Email_Id>" and "<password>"
        When  User adds "<productName>" to Cart
        Then  User Verifies "<productName>" is displayed in the Cart
        When  User Enter Valid details and Place the Order
        Then  Verify order is present in the OrderHistory
        Examples:
        | Email_Id       | password          | productName     |
        | sky@ymail.com  | Learning@830$3mK2 | ZARA COAT 3     |
        | dave@ymail.com | Learning@830$3mK2 | ADIDAS ORIGINAL |
        | dave@ymail.com | Learning@830$3mK2 | iphone 13 pro   |
