'use strict';

angular.module('meanHappyHourApp')
  .controller('MainCtrl', function (mapStyle, $scope, $http) {
		var location;
		$scope.bars = [];

		var onMarkerClicked = function (marker) {
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
	      	$scope.bars[i].marker = marker;
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
    		$scope.bars = bars.slice(0,50);
    		makeMarkers($scope.bars);
    });

		$scope.findNear = function () {
			$scope.map.zoom = 14;
			$scope.map.center = location;
			$http.get('/api/bars/nearest?' + 'longitude=' + $scope.map.center.longitude + '&latitude=' + $scope.map.center.latitude)
			.success(function(bars){
				$scope.bars = [];
				$scope.bars = bars;
				makeMarkers($scope.bars);
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