// tests/support/world.ts
import { setWorldConstructor, World } from "@cucumber/cucumber";
import { chromium } from "playwright";
import type { Browser, Page } from "playwright";

export class PlaywrightWorld extends World {
    browser: Browser;
    page: Page;

    constructor(options) {
        super(options);
    }

    async init() {
        this.browser = await chromium.launch({ headless: true });
        const context = await this.browser.newContext();
        this.page = await context.newPage();
    }

    async cleanup() {
        await this.browser?.close();
    }
}

setWorldConstructor(PlaywrightWorld);
