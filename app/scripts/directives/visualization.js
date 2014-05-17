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

        function renderComet (ele) {
          vis.select('circle#c'+ele.id)
          .data(ele.id)
          .enter()
          .append('circle')
          .attr('id', 'c' + ele.id)
          .attr('cx', ele.x)
          .attr('cy', ele.y)
          .attr('r', ele.r)
          .attr('class', 'comet');
        }

        function renderOther (ele) {
          vis.select('circle#o'+ele.id)
          .data([ele.id])
          .enter()
          .append('circle')
          .attr('id', 'o' + ele.id)
          .attr('cx', ele.x)
          .attr('cy', ele.y)
          .attr('r', ele.z * 0.035)
          .attr('class', 'other');
        }

        function renderMeteor (ele) {
          vis.selectAll('circle#m' + ele.id).
            data([0]).
            enter().
            append('circle').
            attr('id', 'm' + ele.id).
            attr('cx', ele.x).
            attr('cy', ele.y).
            attr('r', 4).
            attr('class', 'meteor');
        }
        renderDeath();
        scope.$watch('val', function (newVal) {
          if (newVal) {
            newVal.forEach(function (element, idx) {
              if (element.type === 'O') {
                renderOther(element);
                console.log(element);
              }
            });
          }
        });
      }
    };
  });
