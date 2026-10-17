import { expect, type Locator, type Page } from '@playwright/test';
let message: string = "Hello";
message = "Bye";

let age: number = 30;
age = 45;

let isActive: boolean = true;

function add( a:number, b:number) :number
{
    return a + b;
}

let numbers: number[] = [1, 2, 3];
let data: any = "this could be anything.";

console.log(add(3, 4));

console.log(message);
console.log(age);
console.log(isActive);
console.log(numbers);
console.log(data);

let user: { name: string, age: number } = { name: "Bob", age: 34 }
console.log(user);

// npx tsc
// node tests/demo1.js
class CartPage{ 

    page: Page
    expect: any
    listOfOrders: Locator;
    cartProducts: Locator;
    checkoutButton: Locator;
    continueShopping: Locator;
    constructor(page:Page, expect:any) {
        this.page = page;
        this.expect  = expect;
        this.listOfOrders = page.locator("div li");
        this.cartProducts = page.locator("h3");
        this.checkoutButton = page.locator("li[class='totalRow'] button[type='button']");
        this.continueShopping = page.locator(".heading button[routerlink*='dashboard']");
    }

    async searchProductInCartPage(productName:string) { 
        await this.continueShopping.waitFor();
        await this.listOfOrders.first().waitFor();
        const cartCount:number = await this.cartProducts.count();
        let match:boolean = false;
        for (let i = 0; i < cartCount; ++i) {
            if (await this.cartProducts.nth(i).textContent() === productName) {
                match = true;
                break;
            }
        }
        await this.expect(match).toBeTruthy();
    }

    async clickingToCheckout() {
        await this.checkoutButton.click();
    }


}
export {};   // Makes this file a module