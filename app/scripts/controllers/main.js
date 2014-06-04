'use strict';

angular.module('meanHappyHourApp')
  .controller('MainCtrl', function ($scope, $http) {
		var location;
		var barsArr = [];

		var onMarkerClicked = function (marker) {
			// _.each($scope.map.markers, function(mker){
			// 	mker.showWindow = false;
			// });
			marker.showWindow = true;
			$scope.$apply();
		};

		var makeMarkers = function (arr) {
			  for (var i = arr.length -1; 0 <= i; i--) {
      	var bar = arr[i];
      	var marker = {
      		coords:{
      			latitude: bar.latitude,
      			longitude: bar.longitude},
      		text: bar.name,
      		showWindow: false,
      		id: $scope.map.markers.length + 1
      	};
      	marker.closeClick = function () {
      		marker.showWindow = false;
      		$scope.$apply();
      	};
      	marker.onClicked = function () {
      		onMarkerClicked(marker);
      	};
      	marker.windowOptions = {
      		pixelOffset: new google.maps.Size(0,5),
      		disableAutoPan: true,
      		boxClass: 'custom-info-window'
      	};
      	$scope.map.markers.push(marker);
      }
		};

    $scope.map = {
	    center: {
        latitude: 40.7311227,
        longitude: -73.9498119
	    },
	    zoom: 13,
	    refresh: 'true',
	    markers: [],
	    control: {}
		};

    $http.get('/api/bars/search?happyHour=Yes').success(function(bars) {
    		barsArr = bars.slice(0,50);
    		makeMarkers(barsArr);
    });






		$scope.findNear = function () {
			$scope.map.zoom = 15;
			$scope.map.center = location;
			$http.get('/api/bars/nearest?' + 'longitude=' + $scope.map.center.longitude + '&latitude=' + $scope.map.center.latitude)
			.success(function(bars){
				barsArr = [];
				barsArr = bars;
				makeMarkers(barsArr);
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