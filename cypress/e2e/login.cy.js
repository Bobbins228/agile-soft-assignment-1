let movies;
describe("User functionality", () => {
    
    describe("Login Page", () => {
        it("Should log in and display the home page", () => {
            //Use login command to log in using the EMAIL and PASSWORD cypress environment variables
            cy.login(`${Cypress.env("EMAIL")}`, `${Cypress.env("PASSWORD")}`)
        });
        it("Should navigate back to the login page when the Log out button is clicked", () => {
            cy.logOut();
        });
    });
    
    describe("Favourite Movie authentication", () => {
        before( () => {
            cy.reload(true)
            cy.request(
                `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                  "TMDB_KEY"
                )}&language=en-US&include_adult=false&include_video=false&page=1`
              )
                .its("body")
                .then((response) => {
                  movies = response.results;
                });
        })
        it("Should log in, favourite a movie and then view them in the favourites list", () => {
            //Use login command to log in using the EMAIL and PASSWORD cypress environment variables
            cy.login(`${Cypress.env("EMAIL")}`, `${Cypress.env("PASSWORD")}`)
            cy.log("Add two movies to the favourites list");
            cy.get("button[aria-label='add to favorites']").eq(0).click();
            cy.get(".MuiCardHeader-root").eq(0).find("svg");
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.get(".MuiCardHeader-root").eq(1).find("svg");
            cy.log("Navigate to the favourites page and check that the correct movies are there")
            cy.get("button").contains("Favorites").click();
            cy.get(".MuiCardHeader-root").should("have.length", 2);
            cy.get(".MuiCardHeader-content")
                .eq(0)
                .find("p")
                .contains(movies[0].title);
            cy.get(".MuiCardHeader-content")
                .eq(1)
                .find("p")
                .contains(movies[1].title);  
        });
        it("Should navigate back to the login page when the Log out button is clicked", () => {
            cy.logOut();
        });
    })
})