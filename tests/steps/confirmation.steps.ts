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

When("the user selects overall health {string}", async function (this: PlaywrightWorld, health: string) {
    await this.page.locator("label", { hasText: new RegExp(`^${health}$`) }).click()
    this.testData.health = health
});

When("the user input height ft {string}, inches {string} and weight {string}", async function (this: PlaywrightWorld, ft: string, inches: string, weight: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.HEIGHT_FT).fill(ft)
    await this.page.locator(SELECTORS.QOUTE_FORM.HEIGHT_INCHES).fill(inches)
    await this.page.locator(SELECTORS.QOUTE_FORM.WEIGHT_FIELD).fill(weight)
    this.testData.ft = ft
    this.testData.inches = inches
    this.testData.weight = weight
});

When("the user selects current insurance {string}", async function (this: PlaywrightWorld, currentInsurance: string) {
    await this.page.locator("label", { hasText: new RegExp(`^${currentInsurance}$`) }).click()
    this.testData.currentInsurance = currentInsurance
});

When("the user selects type of insurance {string}", async function (this: PlaywrightWorld, insuranceType: string) {
    await this.page.locator("label", { hasText: new RegExp(`^${insuranceType}$`) }).click()
    this.testData.insuranceType = insuranceType
});

When("the user selects annual income from salary and wages {string}", async function (this: PlaywrightWorld, income: string) {
    await this.page.locator("label", { hasText: income }).click()
    this.testData.income = income
});

When("the user selects coverage {string} adn term {string}", async function (this: PlaywrightWorld, coverage: string, term: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.COVERAGE_WITH_TERM).selectOption(coverage)
    await this.page.locator(SELECTORS.QOUTE_FORM.TERM_FIELD).selectOption(term)
    this.testData.coverage = coverage
    this.testData.term = term
});

When("the user selects smoke {string}", async function (this: PlaywrightWorld, smoke: string) {
    await this.page.locator("label", { hasText: new RegExp(`^${smoke}$`) }).click()
    this.testData.smoke = smoke
});

When("the user selects condition {string}", async function (this: PlaywrightWorld, condition: string) {
    await this.page.locator("label", { hasText: new RegExp(`^${condition}$`) }).click()
    this.testData.condition = condition
});

When("the user selects violations {string}", async function (this: PlaywrightWorld, violations: string) {
    await this.page.locator("label", { hasText: new RegExp(`^${violations}$`) }).click()
    this.testData.violations = violations
});

When("the user selects activities {string}", async function (this: PlaywrightWorld, activities: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.ACTIVITIES_LABEL_NO).waitFor({state: "visible"})
    await this.page.locator("label", { hasText: activities }).click()
    this.testData.activities = activities
});

When("the user selects disease history {string}", async function (this: PlaywrightWorld, diseaseHistory: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.HEREDITARY_LABEL_NO).waitFor({state: "visible"})
    await this.page.locator("label", { hasText: new RegExp(`^${diseaseHistory}$`) }).click()
    this.testData.diseaseHistory = diseaseHistory
});

When("the user input address {string}", async function (this: PlaywrightWorld, zip: string) {
    const inputField = this.page.locator(SELECTORS.QOUTE_FORM.ADDRESS_FIELD)
    await inputField.pressSequentially(zip.substring(0, 3), {delay: 1000})
    await inputField.press("Enter")
});

When("the user selects referral {string}", async function (this: PlaywrightWorld, referral: string) {
    await this.page.locator(SELECTORS.QOUTE_FORM.REFERRAL_FIELD).selectOption(referral)
    this.testData.referral = referral
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

When("the user click the Submit button", async function (this: PlaywrightWorld) {
    const finalRequestPromise = this.page.waitForRequest(request =>
        request.url().includes(URLS.API_POST_QUOTE_FORM) && request.method() === "POST"
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

    await this.page.locator(SELECTORS.CONFIRMATION.EMAIL_TEXT).waitFor({state: "visible"})
});

Then("user should be redirected to the correct confirmation page", async function (this: PlaywrightWorld) {
    const message = this.page.locator("h3", { hasText: "Thank you! Your quote is being processed." })
    await expect(message).toBeVisible()
});

Then("confirmation final expense url should be correct", async function (this: PlaywrightWorld) {
    expect(this.page.url()).toContain(URLS.CONFIRMATION_FINAL_PAGE)
})

Then("confirmation quote form url should be correct", async function (this: PlaywrightWorld) {
    expect(this.page.url()).toContain(URLS.CONFIRM_QUOTE_PAGE)
})

Then("email should be the same", async function (this: PlaywrightWorld) {
    await expect(this.page.locator(SELECTORS.CONFIRMATION.EMAIL_TEXT)).toHaveText(this.testData.email)
})

Then("data provided should match api payload", async function (this: PlaywrightWorld) {
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
        "Phone in the confirmation page": await this.page.locator(SELECTORS.CONFIRMATION.PHONE_NUMBER_TEXT).first().textContent() || "",
        "QA Note": "",
        "Dev Note": "",
        "Does Lead Post": "",
        "Ref ID": ""
    };
    saveDictToCSV(data, fileName)
})
