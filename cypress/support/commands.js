
Cypress.Commands.add("clickElement", (selector) => {
    cy.get(selector).click();
});

Cypress.Commands.add("enterText", (selector, text) => {
    cy.get(selector).type(`${text}{enter}`);
});

Cypress.Commands.add("clearText", (selector) => {
    cy.get(selector).clear();
});

Cypress.Commands.add("checkText", (selector, text) => {
    cy.get(selector).should("have.text", text);
});

Cypress.Commands.add("checkElement", (selector) => {
    cy.get(selector).should("be.visible");
});

Cypress.Commands.add("checkUrl", (text) => {
    const baseUrl = Cypress.config("baseUrl");
    cy.url().should("eq", baseUrl + text);
});

Cypress.Commands.add("checkClass", (selector, classValue) => {
    cy.get(selector).should("have.class", classValue);
});

Cypress.Commands.add("checkCSS", (selector, property, value) => {
    cy.get(selector).should("have.css", property, value);
});