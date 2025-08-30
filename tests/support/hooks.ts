import { Before, After } from "@cucumber/cucumber";
import type { PlaywrightWorld } from "./world";

Before(async function (this: PlaywrightWorld) {
    await this.init();
});

After(async function (this: PlaywrightWorld, scenario) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, "image/png");
    await this.cleanup();
});
