'use strict';

angular.module('meanHappyHourApp')
  .controller('MainCtrl', function (mapStyle, $scope, $http) {
		var location;
		$scope.barsToShow = [];
		$scope.allBars = [];
		$scope.nearbyBars = [];

		var onMarkerClicked = function (marker) {
			marker.showWindow = true;
			$scope.$apply();
		};

		var makeMarkers = function (arr) {
			  for (var i = arr.length -1; 0 <= i; i--) {
	      	var bar = arr[i];
	      	// bar.showWindow = false;
	      	// bar.windowOptions = {
      		// 	pixelOffset: new google.maps.Size(0,5),
      		// 	disableAutoPan: true,
      		// 	boxClass: 'custom-info-window'
	      	// };
	      	// bar.closeClick = function () {
	      	// 	bar.showWindow = false;
	      	// 	$scope.$apply();
	      	// };
	      	// bar.onClicked = function () {
	      	// 	onMarkerClicked(bar);
	      	// };

	      	var marker = {
	      		coords:{
	      			latitude: bar.latitude,
	      			longitude: bar.longitude},
	      		showWindow: false
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
	      	bar.id = $scope.barsToShow.length + 1;
	      	bar.marker = marker;
	      	$scope.barsToShow.push(bar);
      }
		};

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
	    	styles: mapStyle.style
	    }
		};

    $http.get('/api/bars/search?happyHour=Yes').success(function(bars) {
    		$scope.allBars = bars.slice(0,50);
    		makeMarkers($scope.allBars);
    		// $scope.allBars = makeMarkers(allBars);
    });

		$scope.findNear = function () {
			$scope.map.zoom = 14;
			$scope.map.center = location;
			$http.get('/api/bars/nearest?' + 'longitude=' + $scope.map.center.longitude + '&latitude=' + $scope.map.center.latitude)
			.success(function(bars){
				$scope.nearbyBars = [];
				$scope.nearbyBars = bars.slice(0, 6);
				makeMarkers($scope.nearbyBars);
				// $scope.nearbyBars = makeMarkers(nearbyBars);
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