'use strict';

angular.module('meanHappyHourApp')
  .factory('mapFuncs', function ($anchorScroll, $location) {
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

			makeMarkers: function (arr, scopeApply) {
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
		    	};
		    	marker.onClicked = function (marker) {
		    		var old = $location.hash();
		    		onMarkerClicked(marker);
		    		$location.hash('gMap');
		    		$anchorScroll();
		    		$location.hash(old);
		    	};
		    	marker.windowOptions = {
		    		pixelOffset: new google.maps.Size(0,5),
		    		disableAutoPan: true,
		    		boxClass: 'custom-info-window'
		    	};
		    	bar.marker = marker;
		    	bar.icon = './images/gMap-icons/bar.png';
		    	bars.push(bar);
		  	}
		  	return bars;
			}
    };
  });
