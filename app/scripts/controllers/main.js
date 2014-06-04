'use strict';

angular.module('meanHappyHourApp')
  .controller('MainCtrl', function ($scope, $http) {
		var location;
		$scope.markerOptions = {
			animation: 'drop'
		};

    $http.get('/api/bars/search?happyHour=Yes').success(function(bars) {
      $scope.bars = bars.slice(0,50);
    });


    $scope.map = {
	    center: {
        latitude: 40.7311227,
        longitude: -73.9498119
	    },
	    zoom: 13,
	    refresh: 'true',
	    markers: []
		};

		$scope.findNear = function () {
			$scope.map.zoom = 15;
			$scope.map.center = location;
			$http.get('/api/bars/nearest?' + 'longitude=' + $scope.map.center.longitude + '&latitude=' + $scope.map.center.latitude)
			.success(function(bars){
				$scope.bars = bars;
				$scope.$apply();
			});
		};

		var onSuccess = function (position) {
			location = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};
		};

		navigator.geolocation.getCurrentPosition(onSuccess, function(error){ console.log(error);});

	});