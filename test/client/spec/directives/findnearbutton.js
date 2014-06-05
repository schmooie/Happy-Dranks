'use strict';

describe('Directive: findNearButton', function () {

  // load the directive's module
  beforeEach(module('meanHappyHourApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<find-near-button></find-near-button>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the findNearButton directive');
  }));
});
