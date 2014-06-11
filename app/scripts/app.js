'use strict';

angular.module('meanHappyHourApp', [
	'google-maps',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'partials/home'
    	})
      .when('/nearby', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/search', {
      	templateUrl: 'partials/search',
      	controller: 'SearchPageCtrl'
      })
      .when('/about', {
      	templateUrl: 'partials/about'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });