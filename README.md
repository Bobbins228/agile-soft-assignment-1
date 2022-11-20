# Assignment 1 - Agile software practice.

Name: Mark Campbell

# Cypress E2E tests
There are 8 total Cypress end to end testing files.
* actors-lists.cy.js - Tests that run in order to make sure that all of the actors are listed on their correct pages.
* cast-list-from-movie-details.cy.js - Tests that the correct cast list is displayed on a movie details page.
* filtering.cy.js - Tests the filtering functionality for movies and actors.
* logged-out.cy.js - Tests how a logged out user interacts with the website.
* login.cy.js - Tests the login functionality of the web app.
* movie-lists.cy.js - Tests that all movie list pages display the correct movies.
* register.cy.js - Tests the registration functionality of the web app.
* review.cy.js - Tests the review functionality of the web app.<br>
The tests feature custom commands for login and logout as well as checking movie card titles.

# CI
The pipeline runs install and build jobs on the develop branch and install, build and test jobs on the main branch.<br> Auto deployment has been configured on the main branch for running the Cypress tests using `serve`
# Local set up.
## TMDB API
In order to run the web app you must first create a .env file in the project base folder.
The contents should include the following.
```
REACT_APP_TMDB_KEY=<YOUR_TMDB_API_KEY>
FAST_REFRESH=false
```
<br>

## Cypress environment variables
You must first creat an account on the web app and store the information.<br>
You must then create a file called cypress.env.json in the project base folder and fill it with the following<br>
```
{
    "TMDB_KEY": "__YOUR_TMDB_API_KEY__",
    "NAME": "__YOUR_USERNAME__",
    "EMAIL": "__YOUR_EMAIL__",
    "PASSWORD": "__YOUR_PASSWORD__"
}
```