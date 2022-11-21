import {randomEmail} from '../support/e2e'
describe("User functionality", () => {
    
    describe("Login Page", () => {
        it("should register a new user and display the home page", () => {
            cy.log("Generate a random email address using randomEmail")
            const email = randomEmail();
            cy.visit("/login");
            cy.get("a").eq(1).click();
            cy.url().should("include", "/register");
            cy.log("Enter Registration information");
            cy.get(".register__textBox[placeholder='Full Name']").type(`${Cypress.env("NAME")}`);
            cy.get(".register__textBox[placeholder='E-mail Address']").type(email);
            cy.get(".register__textBox[type='password']").type(`${Cypress.env("PASSWORD")}`);
            cy.log("click register button and navigate to the home page");
            cy.get(".register__btn").eq(0).click();
            cy.url().should("include", "movies/home");
        });
        it("Should navigate back to the login page when the Log out button is clicked", () => {
            cy.logOut();
        });
    });

})