let movies;
let movie;
let reviews; 
describe("Get Reviews", () => {
    before(() => {
        // Get the discover movies from TMDB and store them locally.
        cy.request(
          `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
            "TMDB_KEY"
          )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
          .its("body") // Take the body of HTTP response from TMDB
          .then((response) => {
            movies = response.results;
          });
      });
    
  describe("The Discover Movies page", () => {
    before(() => {
        cy.request(
        `https://api.themoviedb.org/3/movie/${
            movies[1].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
        )
        .its("body")
        .then((movieDetails) => {
            movie = movieDetails;
        });
        cy.request(
            `https://api.themoviedb.org/3/movie/${movies[0].id}/reviews?api_key=${Cypress.env("TMDB_KEY")}`
            )
            .its("body")
            .then((response) => {
                reviews = response.results;
            });
        
      });
    it("Display the reviews for a movie", () => {
        cy.visit(`/movies/${movies[0].id}`)
        cy.log("Clicking the reviews button shows off the reviews in the drawer")
        cy.get(".MuiFab-root").contains("Reviews").click()
        cy.get(".MuiTableCell-root").contains(`${reviews[0].author_details.name}`)
        
    });

  });
  describe("Create Review", () => {
    it("Should log in and display the home page", () => {
        cy.log("Log in first so the user can create a review")
        cy.visit("/login");
        //test logs in first in order to be able to add a movie to favourites and create a review
        cy.get("h2").contains("Login");
        cy.get(".login__textBox[type='email']").type(`${Cypress.env("EMAIL")}`);
        cy.get(".login__textBox[type='password']").type(`${Cypress.env("PASSWORD")}`);
        cy.get(".login__btn").eq(0).click();
        cy.url().should("include", "movies/home")
        //From the home page a movie is added to the favourites page
        cy.log("Add a movie to the favourites list and navigate to the favorites page")
        cy.get("button[aria-label='add to favorites']").eq(1).click();
        cy.get("button").contains("Favorites").click();
        //On the favourites page the test clicks the review button on the favourited movie
        cy.log("click the review icon to navigate to the review form page")
        cy.get(".MuiSvgIcon-root[data-testid='RateReviewIcon']").click()
        //navigated to review form page
        cy.url().should("include", "/reviews/form")
        //Enter details for review
        cy.log("Enter review details and submit")
        cy.get("#author").type("Shalashaska Ocelot");
        cy.get("#review").type("Its pretty good!");
        cy.get("#select-rating").click();
        cy.get("li").contains("Excellent").click();
        cy.get("button").contains("Submit").click()
        //Review message appears meaning the review is complete
        cy.log("The review completion message pops up")
        cy.get(".MuiAlert-message").contains("Thank you for submitting a review");
        cy.get(".MuiSvgIcon-root[data-testid='CloseIcon']").click()
    });

    it("Should navigate back to the login page when the Log out button is clicked", () => {
        cy.get("button").contains("Log").click();
        cy.url().should("include", `/login`);
    });
    
});
});