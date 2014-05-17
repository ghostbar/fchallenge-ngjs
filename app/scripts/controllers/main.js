'use strict';

angular.module('fchallengeApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {
    $timeout(function getData() {
      $http.get('/data.json').success(function (data, status) {
        $scope.data = data;
      }).error(function (data, status) {
        console.log(data);
      });

      $timeout(getData, 1000);
    }, 0);
  });
