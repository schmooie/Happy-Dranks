'use strict';

angular.module('meanHappyHourApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'HOME',
      'link': '/'
    }];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
