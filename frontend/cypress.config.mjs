import { defineConfig } from "cypress";
import { execa } from "execa";
import waitOn from "wait-on";

export default defineConfig({
  fixturesFolder: "__tests__/fixtures",
  viewportHeight: 1080,
  viewportWidth: 1920,
  pageLoadTimeout: 70000,
  defaultCommandTimeout: 20000,
  screenshotOnRunFailure: true,
  screenshotsFolder: "__tests__/report/screenshots",
  experimentalMemoryManagement: true,
  video: false,
  e2e: {
    async setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:5173",
    specPattern: ["__tests__/test/**/*.cy.{js,jsx,ts,tsx}"],
    supportFile: "__tests__/support/e2e.ts",
    retries: {
      runMode: 2,
    },
  },
  chromeWebSecurity: false,
  env: {
    browserPermissions: {
      notifications: "allow",
      geolocation: "allow",
    },
  },
});
