# Assignment 1 - Agile Software Practice.

__Name:__ Mark Campbell

This repository contains the implementation of a React App and its associated Cypress tests and GitLab CI pipeline.

## React App Features.
 
+ Authentication
+ Review creation and viewing.
+ Trending and popular actors pages.
+ Actor's details page featuring movies they have a role in.
+ Now playing, top rated, trending, upcoming movies pages.
+ Cast list, recommended and similar movies lists viewable from a movies detail page
+ search actors filteering option.

## Automated Tests.

### Best test cases.

+ cypress/e2e/login.cy.js
+ cypress/e2e/review.cy.js

### Cypress Custom commands (if relevant).

+ cypress/e2e/login.cy.js
+ cypress/e2e/review.cy.js
+ cypress/e2e/cast-list-from-movie-details.cy.js
+ cypress/e2e/movie-lists.cy.js

## Code Splitting.

+ src/index.js

## Pull Requests.

[Github](https://github.com/Bobbins228/agile-soft-assignment-1)

## Independent learning (If relevant).

I made an attempt at utilising automatic deployment but my tests failed whenever I tried. See [commit 6d50742a](https://gitlab.com/Bobbins228/agile-assignment-1/-/commit/6d50742afa8ddcb8c41af641c6d56ef351a2bcd5)

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
You must first create an account on the web app and store the information.<br>
You must then create a file called cypress.env.json in the project base folder and fill it with the following<br>
```
{
    "TMDB_KEY": "__YOUR_TMDB_API_KEY__",
    "NAME": "__YOUR_USERNAME__",
    "EMAIL": "__YOUR_EMAIL__",
    "PASSWORD": "__YOUR_PASSWORD__"
}
```