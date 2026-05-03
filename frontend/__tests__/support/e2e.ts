import "cypress-real-events";
import "./commands";

export const environment = Cypress.env();

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
