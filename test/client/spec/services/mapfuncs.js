'use strict';

describe('Service: mapFuncs', function () {

  // load the service's module
  beforeEach(module('meanHappyHourApp'));

  // instantiate service
  var mapFuncs;
  beforeEach(inject(function (_mapFuncs_) {
    mapFuncs = _mapFuncs_;
  }));

  it('should do something', function () {
    expect(!!mapFuncs).toBe(true);
  });

});
