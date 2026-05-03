import { paths } from "../../src/utils/paths";

describe("LoginPanel.vue", () => {
  it("powinien renderować formularz logowania", () => {
    cy.visit(paths.login);
    cy.get("input[placeholder='Nazwa użytkownika']").should("exist");
    cy.get("input[placeholder='Hasło']").should("exist");
  });
});
