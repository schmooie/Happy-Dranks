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
			var bars = [];
		  for (var i = 0; i < arr.length; i++) {
      	var bar = arr[i];

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
      	marker.onClicked = function (marker) {
      		onMarkerClicked(marker);
      	};
      	marker.windowOptions = {
      		pixelOffset: new google.maps.Size(0,5),
      		disableAutoPan: true,
      		boxClass: 'custom-info-window'
      	};
      	bar.marker = marker;
      	// $scope.bars.push(bar);
      	bars.push(bar);
    	}
    	// $scope.$apply(function() {
	      $scope.bars = $scope.bars.concat(bars);
	      // $scope.$apply();
    	// })

    	return bars;
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
    		makeMarkers(bars.slice(0, 48));
    });

		$scope.findNear = function () {
			$scope.map.zoom = 14;
			$scope.map.center = location;
			$http.get('/api/bars/nearest?' + 'longitude=' + $scope.map.center.longitude + '&latitude=' + $scope.map.center.latitude)
			.success(function(bars){
				$scope.nearbyBars = makeMarkers(bars.slice(0, 6));
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