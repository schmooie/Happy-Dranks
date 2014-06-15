Happy Dranks
=========
A web-app for finding Happy Hours in NYC built on the MEAN stack using data scraped from Foursquare by [Max Woolf](https://github.com/minimaxir).

Overview
=========
* Parsed CSV data download of Foursquare bars with happy hours
* Stored all bar data in MongoDB; created 2d indices for geospatial querying
* Implemented a RESTful API
* Single-page app built on Angular and Express
* Deployed using Heroku

Screenshots
=========
###Landing Page
![Landing](/screenshots/landing.png)

![Landing:hover](/screenshots/landing-hover.png)

###Nearby Bars
![Nearby](/screenshots/nearby.png)

There's a little animation that's triggered when the call for nearby bars is made.

![Nearby:animation](/screenshots/nearby-animation.png)

A successful query will result in a smiley icon before the nearby bars are shown.

![Nearby:done](/screenshots/nearby-done.png)

###Search All
![Search](/screenshots/search.jpg)

The searches use logical queries for rating and names.

###Mobile
![Mobile](/screenshots/responsive.jpg)

The app is responsive.

Improvements
=========
* The data isn't fully comprehensive, nor is it 100% accurate. I plan on finding a better dataset.
* While the app is, for the most part, responsive, there are certain resolutions in which the app needs improved styling.

Deployment
=========
Happy Dranks is deployed at [happydranks.com](http://happydranks.com)