'use strict';

angular.module('meanHappyHourApp')
  .controller('MainCtrl', function (mapFuncs, $scope, $http, $rootScope) {
		$scope.bars = [];
		$scope.iconClass = 'fa fa-frown-o fa-5x';
    $scope.map = {
	    center: {
        latitude: 40.7311227,
        longitude: -73.9498119
	    },
	    zoom: 12,
	    refresh: 'true',
	    markers: [],
	    control: {},
	    options: {
	    	mapTypeId: google.maps.MapTypeId.ROADMAP,
	    	styles: mapFuncs.style
	    }
		};

    $http.get('/api/v1/Bars?happyHour=Yes&limit=24')
    .success(function(bars) {
  		$scope.bars = mapFuncs.makeMarkers(bars, $scope.apply);
  	});

		$scope.findNear = function () {
			$scope.map.center = $rootScope.myLocation;
			$scope.iconClass = 'fa fa-frown-o fa-5x fa-spin';
			var query={
				happyHour: 'Yes',
				coords: {
					$near: [$scope.map.center.longitude, $scope.map.center.latitude],
					$maxDistance: 0.0145
				}
			};
			$scope.map.zoom = 14;
			$http.get('/api/v1/Bars?query=' + JSON.stringify(query))
			.success(function(bars){
				$scope.numNearby = bars.length < 6 ? bars.length : 6;
				$scope.bars = $scope.bars.concat(mapFuncs.makeMarkers(bars.slice(0, $scope.numNearby)));
				setTimeout(function(){
					$scope.iconClass = 'fa fa-smile-o fa-5x';
					setTimeout(function(){
						$scope.nearbyBars = true;
						$scope.$apply();
					}, 800);
				}, 400);
			});
		};

		var onSuccess = function (position) {
			$rootScope.myLocation = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};
		};

		if (!!$rootScope.myLocation) {
			navigator.geolocation.getCurrentPosition(onSuccess, function(error){ console.log(error);});
		}
	});