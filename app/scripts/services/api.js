'use strict';

angular.module('meanHappyHourApp')
  .factory('api', function ($http) {
    return {
      getBars: function (howMany) {
        $http.get('/api/bars/search?happyHour=Yes').success(function(bars){
        	return bars.slice(0,howMany);
        });
      },
      getNearbyBars: function (coords) {
      	$http.get('/api/bars/nearest?longitude=' + coords.longitude + '&latitude=' + coords.latitude)
      	.success(function(bars){
      		return bars;
      	});
      }
    };
  });
