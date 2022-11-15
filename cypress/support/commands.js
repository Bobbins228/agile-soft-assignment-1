// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Login command
Cypress.Commands.add('login', (email, password) => { 
    cy.visit("/login");
            cy.log("Enter Login information");
            cy.get(".login__textBox[type='email']").type(email);
            cy.get(".login__textBox[type='password']").type(password);
            cy.get(".login__btn").eq(0).click();
            cy.url().should("include", `/movies/home`);
 });

//Log out command
Cypress.Commands.add('logOut', () => {
    cy.log("Find the Log Out button and click it")
    cy.get("button").contains("Log").click();
    cy.url().should("include", `/login`);
});

//Check movie cards command
Cypress.Commands.add('getCards', (list) => {
    cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(list[index].title);
    });
});