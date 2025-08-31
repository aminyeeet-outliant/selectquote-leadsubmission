import { setWorldConstructor, World } from "@cucumber/cucumber";
import type { ITestCaseHookParameter, IWorldOptions } from "@cucumber/cucumber";
import type { Browser, Page, BrowserContext, BrowserContextOptions } from "playwright";

export class PlaywrightWorld extends World {
    browser!: Browser;
    page!: Page;
    context!: BrowserContext;
    finalExpenseQuoteFormPayload?: any
    testData: { [key: string]: string } = {};
    scenarioName: string = "";

    constructor(options: IWorldOptions) {
        super(options);
    }

    async init(browser: Browser, contextOptions: BrowserContextOptions, scenario: ITestCaseHookParameter) {
        this.browser = browser
        this.context = await this.browser.newContext(contextOptions)
        this.page = await this.context.newPage();
        this.scenarioName = scenario.pickle.name
        this.testData = {}
        this.finalExpenseQuoteFormPayload = null
    }

    async cleanup() {
        await this.context.close();
    }
}

setWorldConstructor(PlaywrightWorld);
