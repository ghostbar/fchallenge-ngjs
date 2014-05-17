'use strict';

angular.module('fchallengeApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/url', function () {
    });
  });
