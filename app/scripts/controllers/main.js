'use strict';

angular.module('meanHappyHourApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/bars/search?happyHour=Yes').success(function(bars) {
      $scope.bars = bars.slice(0,10);
    });
    $scope.map = {
	    center: {
        latitude: 40.7311227,
        longitude: -73.9498119
	    },
	    zoom: 12
		};
	});