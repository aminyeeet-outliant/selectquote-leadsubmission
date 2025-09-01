import { BeforeAll, Before, After, AfterAll } from "@cucumber/cucumber";
import type { PlaywrightWorld } from "./world";
import { devices, chromium } from "playwright";
import type { Browser } from "playwright";
import fs from "fs";
import { VIDEO_DIR } from "./constant";


let browser: Browser;
fs.mkdirSync(VIDEO_DIR, { recursive: true });


BeforeAll(async function () {
    browser = await chromium.launch({ headless: true });
});


Before({ tags: "@mobile" }, async function (this: PlaywrightWorld, scenario) {
    // Prepare context for mobile
    await this.init(browser, {
        ...devices["iPhone 14"],
        recordVideo: { dir: VIDEO_DIR }
    }, scenario);
});


Before({ tags: "@desktop" }, async function (this: PlaywrightWorld, scenario) {
    await this.init(browser, {
        recordVideo: { dir: VIDEO_DIR }
    }, scenario);
});


After(async function (this: PlaywrightWorld) {
    // Attach final page screenshot
    this.attach(await this.page.screenshot(), "image/png");

    // Attach api payload
    if (this.finalExpenseQuoteFormPayload) {
        this.attach(JSON.stringify(this.finalExpenseQuoteFormPayload, null, 2), "application/json")
    }

    await this.cleanup();

    // Attach test execution recording
    const videoPath = await this.page.video()?.path();
    if (videoPath && fs.existsSync(videoPath)) {
        const videoBuffer = fs.readFileSync(videoPath);
        this.attach(videoBuffer, "video/webm");
    }
});


AfterAll(async function () {
    await browser?.close();
});
