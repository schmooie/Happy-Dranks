'use strict';

angular.module('meanHappyHourApp')
  .controller('HomeCtrl', function ($scope, $rootScope) {
		var onSuccess = function (position) {
			$rootScope.myLocation = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};
		};
		navigator.geolocation.getCurrentPosition(onSuccess, function(error){ console.log(error);});
  });
