const { test: base, expect } = require('@playwright/test');
const getFutureDate = require('../utils/dateUtils');
const USERNAME = 'ak@email.com';
const PASSWORD = 'Learning@830$3mK2';

const futureEventDate = getFutureDate(30);

const customTest = base.extend({

    authenticatedPage: async ({ page }, use) => {

        await page.goto('https://eventhub.rahulshettyacademy.com/login');
        await page.waitForLoadState('networkidle');

        await page.locator('#email').fill(USERNAME);
        await page.locator('#password').fill(PASSWORD);

        await Promise.all([
            page.waitForURL(url => !url.pathname.includes('/login')),
            page.locator('#login-btn').click()
        ]);

        await page.locator("#event-card").first().waitFor();

        await use(page);
    },

    createEvent: async ({ request }, use) => {

        // logging in via API to get the token
        const loginPayload = {
            email: USERNAME,
            password: PASSWORD
        };

        const loginResponse = await request.post(
            'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
            {
                data: loginPayload
            }
        );

        const token = (await loginResponse.json()).token;

        const payLoad = {
            title: 'Office Party',
            description: 'Event created through Playwright API fixture',
            category: 'Conference',
            venue: 'Social Jp Nagar',
            city: 'bangalore',
            eventDate: futureEventDate,
            price: 0.01,
            totalSeats: 100
        };

        const response = await request.post(
            'https://api.eventhub.rahulshettyacademy.com/api/events',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: payLoad
            }
        );

        expect(response.ok()).toBeTruthy();

        const event = await response.json();

        await use(event.data);
    }
});

module.exports = { customTest, expect };