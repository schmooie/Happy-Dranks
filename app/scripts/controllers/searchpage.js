'use strict';

angular.module('meanHappyHourApp')
  .controller('SearchPageCtrl', function (mapFuncs, $scope, $http, $rootScope) {
		$scope.bars = [];
		$scope.iconClass = 'fa fa-frown-o fa-3x';

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

		// error messages
		$scope.foundBars = false;
		$scope.notSearched = true;
		$scope.notFound = false;



    $scope.search = function () {
    	$http.get('/api/bars/search?')
    	.success(function(bars){
    			$scope.bars = mapFuncs.makeMarkers(bars);
    			$scope.foundBars = true;
  		})
  		.error(function(){
  			$scope.notFound = true;
  		});
    };
  });
