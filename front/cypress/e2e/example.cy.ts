// https://on.cypress.io/api

describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Lancez-vous dans un voyage et planifiez votre itinéraire");
  });
});
