import { Given, When, Then } from "@cucumber/cucumber";
import { SELECTORS, URLS } from "../support/constant.ts";
import { PlaywrightWorld } from "../support/world.ts";
import { expect } from "@playwright/test";


Given("the user access the SelectQuote homepage", async function (this: PlaywrightWorld) {
    await this.page.goto(URLS.HOMEPAGE, { timeout: 10000 });
});

When("the user click the Get a Quote button", async function (this: PlaywrightWorld) {
    await this.page.locator(SELECTORS.HOME.BUTTON_GET_A_QUOTE, { hasText: "Get a Quote" }).click()
});

When("the user selects month {string}, day {string} and year {string}", async function (this: PlaywrightWorld, month: string, day: string, year: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.MONTH).selectOption(month)
    await this.page.locator(SELECTORS.QOUTE_FORM.DAY).selectOption(day)
    await this.page.locator(SELECTORS.QOUTE_FORM.YEAR).fill(year)
});

When("the user click the Next button", async function (this: PlaywrightWorld) {
    await this.page.locator(SELECTORS.QOUTE_FORM.BUTTON_NEXT).click()
});

When("the user selects gender {string}", async function (this: PlaywrightWorld, gender: string) {
    await this.page.locator("label", { hasText: new RegExp(`^${gender}$`) }).click()
});

When("the user selects coverage {string}", async function (this: PlaywrightWorld, coverage: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.COVERAGE_AMOUNT).selectOption(coverage)
});

When("the user input zip code {string}", async function (this: PlaywrightWorld, zip: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.ZIP_FIELD).fill(zip)
});

When("the user input email {string}", async function (this: PlaywrightWorld, email: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.EMAIL_FIELD).fill(email)
});

When("the user input first name {string} and last name {string}", async function (this: PlaywrightWorld, firstName: string, lastName: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.FIRST_NAME_FIELD).fill(firstName)
    await this.page.locator(SELECTORS.QOUTE_FORM.LAST_NAME_FIELD).fill(lastName)
});

When("the user input phone {string}", async function (this: PlaywrightWorld, phone: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.PHONE_FIELD).fill(phone)
});

Then("user should be redirected to the correct confirmation page", async function (this: PlaywrightWorld) {
    const message = this.page.locator("h3", { hasText: "Thank you! Your quote is being processed." })
    await expect(message).toBeVisible()
});

Then("confirmation url should be correct", async function (this: PlaywrightWorld) {
    expect(this.page.url()).toContain(URLS.HOMEPAGE + "final-expenses/quote-form/confirmation-g")
})

Then("email {string} should be the same", async function (this: PlaywrightWorld, email: string) {
    await expect(this.page.locator(SELECTORS.CONFIRMATION.EMAIL_TEXT)).toHaveText(email)
})
