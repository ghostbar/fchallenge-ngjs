'use strict';

angular.module('fchallengeApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {
    $scope.rate = 1000;
    $timeout(function getData() {
      $http.get('/data.json').success(function (data, status) {
        $scope.data = data;
      }).error(function (data, status) {
        console.log(data);
      });

      $timeout(getData, $scope.rate);
    }, 0);
  });
