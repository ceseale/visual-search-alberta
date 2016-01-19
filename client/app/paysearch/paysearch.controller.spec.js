'use strict';

describe('Controller: PaysearchCtrl', function () {

  // load the controller's module
  beforeEach(module('albertaApp'));

  var PaysearchCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PaysearchCtrl = $controller('PaysearchCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
