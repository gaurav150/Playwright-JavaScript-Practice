Feature: Ecommerce validattions

    Scenario: Placing the order
        Given User LoggedIn to Ecommerce application with "sky@ymail.com" and "Learning@830$3mK2"
        When  User adds "ZARA COAT 3" to Cart
        Then  User Verifies "ZARA COAT 3" is displayed in the Cart
        When  User Enter Valid details and Place the Order
        Then  Verify order is present in the OrderHistory