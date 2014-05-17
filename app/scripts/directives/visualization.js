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
        val: '=',
        grouped: '='
      },
      link: function postLink(scope, element, attrs) {
        var vis = d3.select(element[0]).
          append('svg').
          attr('width', width).
          attr('height', height);

        function renderDeath () {
          vis.selectAll('circle#death').
            data([1]).
            enter().
            append('circle').
            attr('id', 'death').
            attr('cx', 300).
            attr('cy', 300).
            attr('r', 8);
        }

        function renderComet (ele) {
          vis.select('circle#c'+ele.id)
          .attr("cx", ele.x)
          .attr("cy", ele.y)
          .attr("r", ele.r)
          .attr("class", "comet")
        }

        function renderOther (ele) {
          vis.select('circle#o'+ele.id)
          .attr("cx", ele.x)
          .attr("cy", ele.y)
          .attr("r", ele.r)
          .attr("class", "other")
        }

        function renderMeteor (ele) {
          vis.select('circle#m'+ele.id)
          .attr("cx", ele.x)
          .attr("cy", ele.y)
          .attr("r", ele.r)
          .attr("class", "meteor")
        }
        renderDeath();
        scope.$watch('val', function (newVal, oldVal) {
          newVal.forEach(function(element, index){

          })
        });
      }
    };
  });
