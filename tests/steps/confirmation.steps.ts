import { Given, When, Then } from "@cucumber/cucumber";
import { SELECTORS, URLS } from "../support/constant.ts";
import { PlaywrightWorld } from "../support/world.ts";
import { expect } from "@playwright/test";
import { compareTestDataToPayload, formatDate, getGenderValue, getTodayDate, saveDictToCSV } from "../support/util.ts";


Given("the user access the SelectQuote homepage", async function (this: PlaywrightWorld) {
    // It sometimes fail, so lets try 1 more when it failed
    try {
        await this.page.goto(URLS.HOMEPAGE, { timeout: 5000 });
    } catch (err) {
        console.warn("First goto failed, retrying...");
        await this.page.goto(URLS.HOMEPAGE, { timeout: 5000 });
    }
});

When("the user click the burger menu", async function (this: PlaywrightWorld) {
    await this.page.locator(SELECTORS.HOME.MOBILE_BURGER_ICON).click()
});

When("the user click the Get a Quote button", async function (this: PlaywrightWorld) {
    await this.page.locator(SELECTORS.HOME.BUTTON_GET_A_QUOTE, { hasText: "Get a Quote" }).click()
});

When("the user selects month {string}, day {string} and year {string}", async function (this: PlaywrightWorld, month: string, day: string, year: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.MONTH).selectOption(month)
    await this.page.locator(SELECTORS.QOUTE_FORM.DAY).selectOption(day)
    await this.page.locator(SELECTORS.QOUTE_FORM.YEAR).fill(year)
    this.testData.month = month
    this.testData.day = day
    this.testData.year = year
});

When("the user click the Next button", async function (this: PlaywrightWorld) {
    await this.page.locator(SELECTORS.QOUTE_FORM.BUTTON_NEXT).click()
});

When("the user selects gender {string}", async function (this: PlaywrightWorld, gender: string) {
    await this.page.locator("label", { hasText: new RegExp(`^${gender}$`) }).click()
    this.testData.gender = gender
});

When("the user selects coverage {string}", async function (this: PlaywrightWorld, coverage: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.COVERAGE_AMOUNT).selectOption(coverage)
    this.testData.coverage = coverage
});

When("the user input zip code {string}", async function (this: PlaywrightWorld, zip: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.ZIP_FIELD).fill(zip)
    this.testData.zip = zip
});

When("the user input email {string}", async function (this: PlaywrightWorld, email: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.EMAIL_FIELD).fill(email)
    this.testData.email = email
});

When("the user input first name {string} and last name {string}", async function (this: PlaywrightWorld, firstName: string, lastName: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.FIRST_NAME_FIELD).fill(firstName)
    await this.page.locator(SELECTORS.QOUTE_FORM.LAST_NAME_FIELD).fill(lastName)
    this.testData.firstName = firstName
    this.testData.lastName = lastName
});

When("the user input phone {string}", async function (this: PlaywrightWorld, phone: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.PHONE_FIELD).fill(phone)
    this.testData.phone = phone
});

When("the user click the Get Free Quotes button", async function (this: PlaywrightWorld) {
    const finalRequestPromise = this.page.waitForRequest(request =>
        request.url().includes(URLS.API_FINAL_EXPENSE_QUOTE_FORM) && request.method() === "POST"
    );

    await this.page.locator(SELECTORS.QOUTE_FORM.BUTTON_NEXT).click()
    const finalRequest = await finalRequestPromise;

    try {
        // Get the payload of /api/postFinalExpenseQuoteForm
        const postData = finalRequest.postData();
        if (postData) this.finalExpenseQuoteFormPayload = JSON.parse(postData);
    } catch (err) {
        console.error("Error parsing payload:", err);
    }
});

Then("user should be redirected to the correct confirmation page", async function (this: PlaywrightWorld) {
    const message = this.page.locator("h3", { hasText: "Thank you! Your quote is being processed." })
    await expect(message).toBeVisible()
});

Then("confirmation url should be correct", async function (this: PlaywrightWorld) {
    expect(this.page.url()).toContain(URLS.CONFIRMATION_PAGE)
})

Then("email should be the same", async function (this: PlaywrightWorld) {
    await expect(this.page.locator(SELECTORS.CONFIRMATION.EMAIL_TEXT)).toHaveText(this.testData.email)
})

Then("data provided should match api\\/postFinalExpenseQuoteForm payload", async function (this: PlaywrightWorld) {
    expect(this.finalExpenseQuoteFormPayload).not.toBeUndefined()

    compareTestDataToPayload(this.testData.firstName, this.finalExpenseQuoteFormPayload.all_first_name)
    compareTestDataToPayload(this.testData.lastName, this.finalExpenseQuoteFormPayload.all_last_name)
    compareTestDataToPayload(this.testData.email, this.finalExpenseQuoteFormPayload.all_email)
    compareTestDataToPayload(this.testData.phone, this.finalExpenseQuoteFormPayload.all_phone)
    compareTestDataToPayload(this.testData.zip, this.finalExpenseQuoteFormPayload.all_zip)
    compareTestDataToPayload(this.testData.coverage, this.finalExpenseQuoteFormPayload.life_desired_amount)
    compareTestDataToPayload(getGenderValue(this.testData.gender), this.finalExpenseQuoteFormPayload.all_gender)
    compareTestDataToPayload(formatDate(this.testData.month, this.testData.day, this.testData.year), this.finalExpenseQuoteFormPayload.all_birthday)
})

Then("data should be generated into a csv", async function (this: PlaywrightWorld) {
    const fileName = getTodayDate() + " - LSQ Lead Submission.csv"
    const data: Record<string, string> = {
        "Test Scenario": this.scenarioName,
        "Name": (this.testData.firstName || "") + " " + (this.testData.lastName || ""),
        "Email": this.testData.email || "",
        "Confirmation Page": this.page.url() || "",
        "Test Recording": "",
        "Phone in the confirmation page": await this.page.locator(SELECTORS.CONFIRMATION.PHONE_NUMBER_TEXT).textContent() || "",
        "QA Note": "",
        "Dev Note": "",
        "Does Lead Post": "",
        "Ref ID": ""
    };
    saveDictToCSV(data, fileName)
})
