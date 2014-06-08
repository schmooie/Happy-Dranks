'use strict';

angular.module('meanHappyHourApp')
  .controller('MainCtrl', function (mapFuncs, $scope, $http) {
		var myLocation;
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

    $http.get('/api/bars/search?happyHour=Yes').success(function(bars) {
    		$scope.bars = mapFuncs.makeMarkers(bars.slice(0, 24));
    });

		$scope.findNear = function () {
			$scope.map.zoom = 14;
			$scope.map.center = myLocation;
			$http.get('/api/bars/nearest?' + 'longitude=' + $scope.map.center.longitude + '&latitude=' + $scope.map.center.latitude)
			.success(function(bars){
				$scope.iconClass = 'fa fa-smile-o fa-5x';
				$scope.numNearby = bars.length < 6 ? bars.length : 6;
				$scope.bars = $scope.bars.concat(mapFuncs.makeMarkers(bars.slice(0, $scope.numNearby)));
				setTimeout(function(){
					$scope.nearbyBars = true;
				}, 300);
			});
		};

		var onSuccess = function (position) {
			myLocation = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};
		};

		navigator.geolocation.getCurrentPosition(onSuccess, function(error){ console.log(error);});
	});