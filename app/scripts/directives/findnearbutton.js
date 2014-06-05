'use strict';

angular.module('meanHappyHourApp')
  .directive('findNearButton', function () {
    return {
      template: '<button class="btn btn-danger" ng-click="findNear()"><span class="glyphicon glyphicon-screenshot"></span> NEARBY</button>',
      restrict: 'E'
    };
  });
