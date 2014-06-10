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
		$scope.couldntFind = false;

		// bar doc keys
		$scope.boroughs = [{name: 'Queens'}, {name: 'Brooklyn'}, {name: 'Bronx'}, {name: 'Staten Island'}, {name: 'Manhattan'}];
		$scope.prices = [{price:'$'},{price:'$$'},{price:'$$$'}];
		$scope.sortBys = [{sort: 'Name'}, {sort: 'Rating'}, {sort: 'Price'}];

    $scope.search = function () {
    	$scope.notSearched = false;
    	$scope.bars = [];
    	var sortBy = '';

    	// Set Query Params
    	var query = {
    		happyHour: 'Yes'
    	};
    	if (!!$scope.name){
    		query.name = '~' + $scope.name;
    	}
    	if (!!$scope.rating){
    		query.rating = '>=' + $scope.rating;
    	}
    	if (!!$scope.borough){
    		query.borough = $scope.borough.name;
    	}
    	if (!!$scope.price){
    		query.price = $scope.price.price;
    	}
    	if (!!$scope.sortBy) {
  			sortBy = 'sort=' + $scope.sortBy.sort.toLowerCase() + '&';
    	}

    	$http.get('/api/v1/Bars?' + sortBy + 'query=' + JSON.stringify(query))
    	.success(function(bars){
    		if (bars.length > 0) {
    			$scope.bars = mapFuncs.makeMarkers(bars);
    			$scope.foundBars = true;
    		} else {
    			$scope.foundBars = false;
    			$scope.couldntFind = true;
    		}
  		})
  		.error(function(err){
  			console.log(err);
  		});
    };
  });