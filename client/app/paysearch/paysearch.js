'use strict';

angular.module('albertaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/paysearch', {
        templateUrl: 'app/paysearch/paysearch.html',
        controller: 'PaysearchCtrl'
      });
  });
