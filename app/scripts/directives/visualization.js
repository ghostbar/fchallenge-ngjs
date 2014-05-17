/* global d3 */

'use strict';

var margin = 20;
var width = 600;
var height = 600;

angular.module('fchallengeApp')
  .directive('visualization', function () {
    return {
      restrict: 'E',
      scope: {
        val: '='
      },
      link: function postLink(scope, element, attrs) {
        var vis = d3.select(element[0]).
          append('svg').
          attr('width', width).
          attr('height', height);

        function renderDeath () {
          vis.selectAll('circle#death').
            data([1000]).
            enter().
            append('circle').
            attr('id', 'death').
            attr('cx', 300).
            attr('cy', 300).
            attr('r', 8);
        }

        var circles;

        renderDeath();
        scope.$watch('val', function (newVal, oldVal) {

          if (!newVal) {
            return;
          }

          if (!oldVal) {
            console.log('se lanzo');

            circles = vis.selectAll('circle').
              data(newVal).
              enter().
              append('circle');
          }

          //vis.selectAll('circle').remove();

          circles.
            data(newVal).
            attr('class', function (d) {
              if (d.type === 'M')
                return 'meteor';

              if (d.type === 'O')
                return 'other';

              if (d.type === 'C')
                return 'comet';

              if (d.type === 'death')
                return 'death';
            }).
            transition().duration(1500).delay(250).
            attr('cx', function (d) { return d.x; }).
            attr('cy', function (d) { return d.y; }).
            attr('r', multiplierFunc).
            order(function (d) { return d.z; });

            function multiplierFunc (d) {
              if (d.type === 'death')
                return 24;

              var multiplier;
              if (d.type === 'M')
                multiplier = 0.016;
              if (d.type === 'O')
                multiplier = 0.025;
              if (d.type === 'C')
                multiplier = 0.02;

              return d.z * multiplier;
            }

        });
      }
    };
  });
