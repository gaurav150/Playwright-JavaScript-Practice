const {test,expect} = require('@playwright/test');


test.skip('UI Controls Playwright Test', async({page}) => {
    const registerButton = page.locator(".btn1");
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const confirmPassword = page.locator("#confirmPassword");
    const mobileNumber = page.locator("#userMobile");
    const maleRadio = page.locator('input[type="radio"][formcontrolname="gender"][value="Male"]');
    const occupationDropdown = page.locator('select[formcontrolname="occupation"]');
    const checkbox = page.locator('input[formcontrolname="required"]');
    const confirmationMessage = page.locator('.headcolor');
    const loginButton = page.locator('#login');
    await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());
    await registerButton.click();
    await firstName.fill("Shivank");
    await lastName.fill("Kumar");
    await email.fill("sky@ymail.com");
    await password.fill("Learning@830$3mK2");
    await confirmPassword.fill("Learning@830$3mK2");
    await mobileNumber.fill("1234567890");
    await occupationDropdown.selectOption("3: Engineer");
    console.log(await occupationDropdown.inputValue());
    await selectRadioButton(page, "gender", "Male");
    await expect(maleRadio).toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await loginButton.click();
    await expect(confirmationMessage).toHaveText("Account Created Successfully");
    

});

async function selectRadioButton(page, fieldName, value) {
    const radio = page.locator(
        `input[type="radio"][formcontrolname="${fieldName}"][value="${value}"]`
    );

    await radio.check();
}

test('Client App Login', async({page}) => {

    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const productTitle = page.locator(".card-body b");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const checkoutButton = page.locator("li[class='totalRow'] button[type='button']");
    await page.goto("https://rahulshettyacademy.com/client/");
    await userEmail.fill("sky@ymail.com");
    await userPassword.fill("Learning@830$3mK2");
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    await productTitle.first().waitFor();
    // await expect(productTitle.first()).toHaveText("ADIDAS ORIGINAL");

    // ZARA COAT 3
    const productCount  = await products.count();
    for(let i=0; i<productCount; ++i){
        if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    const toast = page.getByRole('alert', {name: 'Product Added To Cart'});

    await expect(toast).toHaveText('Product Added To Cart');
    
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const cartProducts = page.locator("h3");
    const cartCount = await cartProducts.count();
    let match = false;
    for(let i=0; i<cartCount; ++i){
        if(await cartProducts.nth(i).textContent() === productName){
            match = true;
            break;
        }
    }
    expect(match).toBeTruthy();
    
    await checkoutButton.click();
    const cvv = page.locator('.field.small').filter({ hasText: 'CVV Code' }).getByRole('textbox');
    const nameCard = page.getByText('Name on Card').locator('..').getByRole('textbox');
    const applyCoupon = page.locator('input[name="coupon"]');
    const countryName = page.getByRole('textbox', { name: 'Select Country' });
    const dropDown = page.locator('.ta-results');
    await cvv.fill("123");
    await nameCard.fill("Shivank Kumar");
    await applyCoupon.fill("rahulshettyacademy");
    const couponSuccess = page.locator(".field.small p");
    await page.locator("button[type='submit']").click();
    await expect(couponSuccess).toHaveText("* Coupon Applied");
    await countryName.pressSequentially("ind", { delay: 300 });
    await dropDown.waitFor();
    const countryButton = dropDown.locator("button");
    for(let i=0; i<await countryButton.count(); ++i){
        const countryName = (await countryButton.nth(i).textContent()).trim();
         if (countryName === 'India') {
        await countryButton.nth(i).click();
        break;
        }
    }

    await expect(dropDown).toBeHidden();
    const placeOrderButton = page.locator(".actions a");
    await placeOrderButton.click();
    // next confirmation page
    const confirmationMessage = page.locator(".hero-primary");
    await expect(confirmationMessage).toHaveText(" Thankyou for the order. ");
    const orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted");
    const orderIdText = await orderIdLocator.textContent();

    const orderId = orderIdText
    .replace(/\|/g, '')
    .trim();

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const orderRows = page.locator("tbody tr");
    const orderCount = await orderRows.count();
    for(let i=0; i<orderCount; ++i){
        const rowOrderId = await orderRows.nth(i).locator("th").textContent();
        if(rowOrderId === orderId){
            await orderRows.nth(i).locator("button.btn-primary").click();
            break;
        }
    }
    const orderDetailsIdLocator = page.locator(".col-text");
    const orderDetailsIdText = await orderDetailsIdLocator.textContent();
    const orderDetailsId = orderDetailsIdText
    .replace(/\|/g, '')
    .trim();
    expect(orderId).toEqual(orderDetailsId);
    

});
