'use strict';

angular.module('meanHappyHourApp')
  .factory('mapFuncs', function () {
  	var onMarkerClicked = function (marker) {
			marker.showWindow = true;
		};

    return {
    	style: [
		    {
		        "featureType": "water",
		        "stylers": [
		            {
		                "visibility": "on"
		            },
		            {
		                "color": "#acbcc9"
		            }
		        ]
		    },
		    {
		        "featureType": "landscape",
		        "stylers": [
		            {
		                "color": "#f2e5d4"
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#c5c6c6"
		            }
		        ]
		    },
		    {
		        "featureType": "road.arterial",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#e4d7c6"
		            }
		        ]
		    },
		    {
		        "featureType": "road.local",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#fbfaf7"
		            }
		        ]
		    },
		    {
		        "featureType": "poi.park",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#c5dac6"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative",
		        "stylers": [
		            {
		                "visibility": "on"
		            },
		            {
		                "lightness": 33
		            }
		        ]
		    },
		    {
		        "featureType": "road"
		    },
		    {
		        "featureType": "poi.park",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "on"
		            },
		            {
		                "lightness": 20
		            }
		        ]
		    },
		    {},
		    {
		        "featureType": "road",
		        "stylers": [
		            {
		                "lightness": 20
		            }
		        ]
		    }
			],

			makeMarkers: function (arr) {
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
		    	bars.push(bar);
		  	}
		    // $scope.bars = $scope.bars.concat(bars);
		  	return bars;
			}
    };
  });
