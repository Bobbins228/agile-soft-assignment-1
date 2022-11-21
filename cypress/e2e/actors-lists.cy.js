let actors;
let popularActor;
let creditedMovies;
let trendingActors;
describe("Actors lists tests", () =>{
    beforeEach(()=>{
        //Requests list of popular actors
        cy.request(
            `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                actors = response.results;
            });
        //Requests list of trending actors
        cy.request(
            `https://api.themoviedb.org/3/trending/person/week?api_key=${Cypress.env(
                "TMDB_KEY"
            )}`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                trendingActors = response.results;
            });
        
    });
    describe("Popular actors list", () => {
        beforeEach(()=>{
            //Get list of a popular actor's credited movies
            cy.request(
                `https://api.themoviedb.org/3/person/976/movie_credits?api_key=${Cypress.env("TMDB_KEY")}`
              )
                .its("body")
                .then((actorMovies) => {
                    creditedMovies = actorMovies.cast;
                });
            //Get popular actor details
            cy.request(
                `https://api.themoviedb.org/3/person/976?api_key=${Cypress.env("TMDB_KEY")}`
                )
                .its("body")
                .then((response) => {
                    popularActor = response;
                });
            cy.visit("/people")
        })
        it("displays the page header and 20 actors", () => {
            cy.get("h3").contains("Popular Actors");
            cy.get(".MuiCardHeader-root").should("have.length", 20);
          });
      
          it("displays the correct actor names", () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
              cy.wrap($card).find("p").contains(actors[index].name);
            });
          });
        describe("Popular Actor Details", () =>{
            beforeEach(()=>{
                cy.visit(`/people/976`);//Visit Jason Statham's actor page
            });
            
            it("Should display the movies that the actor has been in", () =>{
                cy.getCards(creditedMovies); //Nice use of custom command!
            });
            it("Should display the actor's biograpy", () =>{
                cy.get(".css-1anx036").contains(popularActor.biography)
            });
        })
    });
    describe("Trending actors list", () => {
        beforeEach(()=>{
            //Requests list of trending actors
            cy.request(
                `https://api.themoviedb.org/3/person/500/movie_credits?api_key=${Cypress.env("TMDB_KEY")}`
              )
                .its("body")
                .then((actorMovies) => {
                    creditedMovies = actorMovies.cast;
                });
            cy.visit("/people/trending")
        })
        it("displays the page header and 20 actors", () => {
            cy.get("h3").contains("Trending Actors");
            cy.get(".MuiCardHeader-root").should("have.length", 20);
          });
      
          it("displays the correct actor names", () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
              cy.wrap($card).find("p").contains(trendingActors[index].name);
            });
          });
          })
          describe("Trending Actor Details", () =>{
            beforeEach(()=>{
                cy.visit(`/people/500`);
            });
            it("Should display the movies that the actor has been in", () =>{
                cy.visit(`/people/500`);
                cy.getCards(creditedMovies);
            });
        })
});