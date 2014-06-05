'use strict';

describe('Service: mapStyle', function () {

  // load the service's module
  beforeEach(module('meanHappyHourApp'));

  // instantiate service
  var mapStyle;
  beforeEach(inject(function (_mapStyle_) {
    mapStyle = _mapStyle_;
  }));

  it('should do something', function () {
    expect(!!mapStyle).toBe(true);
  });

});
