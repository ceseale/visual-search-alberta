    angular.module('albertaApp').directive('mainDonut', function ($http) {
      function link(scope, el, attr) {
        var catCodes = scope.vis.catCodes;
        var home_meta = scope.vis.home_meta
        var colors = scope.vis.colors;
        var min_radius = 3.145;
        if (Object.keys(scope.metadata).indexOf('Travel') == -1) {
          var radiusScale = {
            1: min_radius * 1.666,
            2: min_radius * 1.333,
            3: min_radius * 1.666,
            4: min_radius * 2,
            5: min_radius * 2
          }
        } else {
          var radiusScale = {
            1000: min_radius * 1.666,
            2000: min_radius * 1.666,
            3000: min_radius * 1.666,
            4000: min_radius * 1.666,
            5000: min_radius * 1.666
          }
        }
        var width = 800,
          height = 800;
        var scale = 5000;
        var radius = radiusScale[scale]
        var nodeScale = 4181 / scale;
        var fill = d3.scale.category10();
        var y_loc = 176;
        var x_loc = 174;
        var foci;
        var limits = {}
        var nodes = [];
        var customNodes = [];
        var home_nodes = [];
        for (var i in catCodes) {
          var count = 0;
          while (scope.metadata[i] > count) {
            nodes.push({
              id: catCodes[i]
            })
            home_nodes.push({
              id: catCodes[i]
            })
            count += scale;
          }
        }
        var resetFoci = function () {
          foci = [{
            x: x_loc,
            y: y_loc
          }, {
            x: x_loc,
            y: y_loc
          }, {
            x: x_loc,
            y: y_loc
          }, {
            x: x_loc,
            y: y_loc
          }, {
            x: x_loc,
            y: y_loc
          }, {
            x: x_loc,
            y: y_loc
          }, {
            x: x_loc,
            y: y_loc
          }, {
            x: x_loc,
            y: y_loc
          }, {
            x: x_loc,
            y: y_loc
          }, {
            x: x_loc,
            y: y_loc
          }, {
            x: x_loc,
            y: y_loc
          }, {
            x: x_loc,
            y: y_loc
          }];
        }
        resetFoci();
        var svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height);
        var force = d3.layout.force().nodes(nodes).links([]).gravity(.3).size([width, height]).on("tick", tick)
        var aspect = 1280 / 800,
          chart = $("#chart");
        var targetWidth = chart.parent().width();
        chart.attr("width", targetWidth);
        chart.attr("height", targetWidth / aspect);
        $(window).on("resize", function () {
          var targetWidth = chart.parent().width();
          chart.attr("width", targetWidth);
          chart.attr("height", targetWidth / aspect);
        });
        var node = svg.selectAll("circle");

        function tick(e) {
          var k = .1 * e.alpha;
          // Push nodes toward their designated focus.
          nodes.forEach(function (o, i) {
            o.y += (foci[o.id].y - o.y) * k;
            o.x += (foci[o.id].x - o.x) * k;
          });
          node.attr("cx", function (d) {
            return d.x;
          }).attr("cy", function (d) {
            return d.y;
          });
        }
        meta_update(home_nodes)

        function setScale() {
          scale = 5000;
          if (Object.keys(scope.metadata).indexOf('Meals') !== -1) {
            if (Object.keys(catCodes).indexOf('size') !== -1) {
              scale = 5000
            } else {
              if (scope.metadata.size < 1000000) {
                scale = 1000
              } else if (scope.metadata.size < 2000000) {
                scale = 2000
              } else if (scope.metadata.size < 3000000) {
                scale = 3000
              } else if (scope.metadata.size < 4000000) {
                scale = 4000
              } else {
                scale = 5000
              }
            }
          } else {
            if (Object.keys(catCodes).indexOf('size') === -1) {
              if (scope.metadata.size < 1000) {
                scale = 1
              } else if (scope.metadata.size < 2000) {
                scale = 2
              } else if (scope.metadata.size < 3000) {
                scale = 3
              } else {
                scale = 4
              }
            } else {
              scale = 4
            }
          }
        }

        function meta_update() {
          resetFoci();
          if (!arguments[0]) {
            nodes = [];
            setScale();
            radius = radiusScale[scale]
            scope.scale = scale;
            for (var i in catCodes) {
              var count = 0;
              while (scope.metadata[i] > count) {
                nodes.push({
                  id: catCodes[i]
                })
                count += scale;
              }
            }
          }
          node = node.data(nodes);
          node.exit().remove()
          force.nodes(nodes)
          node.enter().append("circle").attr("class", "node").attr("cx", function (d) {
            return d.x;
          }).attr("cy", function (d) {
            return d.y;
          }).attr("r", radius).style("fill", function (d, i) {
            return colors[i];
          }).style("stroke", function (d, i) {
            return d3.rgb(colors[i]).darker(2);
          })
          d3.selectAll("circle").attr("r", radius).style("fill", function (d) {
            return colors[d.id];
          }).style("stroke", function (d) {
            return d3.rgb(colors[d.id]).darker(2);
          }).on("mousedown", mousedown);
          force.start();
        }

        function mouseover(d) {
          var item = foci[d.id]
          var focusedOn = []
          foci.forEach(function (focus, index) {
            if (focus.x == item.x && focus.y == item.y) {
              focusedOn.push(index)
            }
          })
        }

        function mousedown(d) {
          // Randomness
          resetFoci()
            // foci[d.id] = Math.round(Math.random()) == 1 ?  {x: x_loc , y: y_loc + 300} :  {x: x_loc + 300, y: y_loc } ;
          nodes.forEach(function (o, i) {
            o.x += (Math.random() - .5) * 40;
            o.y += (Math.random() - .5) * 40;
          });
          force.resume();
        }
        //// Donut
        var colorE = d3.scale.category10();
        var data = [];
        Object.keys(catCodes).forEach(function (item) {
          data.push(scope.metadata[item])
        })
        var donutH = 690;
        var donutW = 690;
        // var width = 300;
        // var height = 300;
        var min = Math.min(donutH, donutW);
        var svgE = d3.select('#dots').append('svg');
        var pie = d3.layout.pie().sort(null);
        var arc = d3.svg.arc().outerRadius(min / 2 * 0.89).innerRadius(min / 2 * 0.85);
        svgE.attr({
          width: donutW,
          height: donutH
        });
        var g = svg.append('g')
          // center the donut chart
          .attr('transform', 'translate(' + donutW / 2 + ',' + donutH / 2 + ')');
        // add the <path>s for each arc slice
        var arcs = g.selectAll('path').data(pie(data)).enter().append('path').each(function (d) {
            this._current = d;
          })
          // .style('stroke', 'white')
          .attr('d', arc).attr('fill', function (d, i) {
            return colors[i]
          }).on('mouseover', function (d, i) {
            // Randomness
            var mid = (d.startAngle + d.endAngle) / 2
              // resetFoci()
            foci[i] = {
              x: x_loc + 100 * Math.sin(mid),
              y: y_loc - 100 * Math.cos(mid)
            };
            nodes.forEach(function (o, i) {
              o.x += (Math.random() - .5) * 40;
              o.y += (Math.random() - .5) * 40;
            });
            svg.select("text").remove()
            svg.append("svg:text").attr("dy", "85%").attr("dx", "41%").attr("text-anchor", "middle").style("font", "bold 24px Georgia").text(scope.vis.display(scope.vis.keys[i], d.value, scope.metadata))
            force.resume();
          });

        function arcTween(a) {
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function (t) {
            return arc(i(t));
          };
        }
        var cusCount = 0;
        scope.$watch('metadata', function (metadata) {
          data = [];
          if (metadata.size) {
            Object.keys(catCodes).forEach(function (item) {
              data.push(metadata[item])
            })
          }
          if (metadata.size) {
            arcs.data(pie(data))
            arcs.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
          } else if (metadata.size && metadata.second_set) {
            data = Object.keys(metadata.second_set).map(function (item) {
              return metadata.second_set[item]
            })
            arcs.data(pie(data))
            arcs.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
          }
          meta_update()
        }, true)
        scope.$watch('vis', function (vis) {
          catCodes = scope.vis.catCodes;
          home_meta = scope.vis.home_meta
          colors = scope.vis.colors;
          arcs.remove();
          data = [];
          if (scope.metadata.size) {
            Object.keys(catCodes).forEach(function (item) {
              data.push(scope.metadata[item])
            })
          }
          arcs = g.selectAll('path').data(pie(data)).enter().append('path').each(function (d) {
              this._current = d;
            })
            // .style('stroke', 'white')
            .attr('d', arc).attr('fill', function (d, i) {
              return colors[i]
            }).on('mouseover', function (d, i) {
              // Randomness
              var mid = (d.startAngle + d.endAngle) / 2
              if (mid.toFixed(5) == 3.14159) {
                resetFoci()
              } else {
                foci[i] = {
                  x: x_loc + 100 * Math.sin(mid),
                  y: y_loc - 100 * Math.cos(mid)
                };
                nodes.forEach(function (o, i) {
                  o.x += (Math.random() - .5) * 40;
                  o.y += (Math.random() - .5) * 40;
                });
              }
              svg.select("text").remove()
              svg.append("svg:text").attr("dy", "85%").attr("dx", "41%").attr("text-anchor", "middle").style("font", "bold 24px Georgia").text(scope.vis.display(scope.vis.keys[i], d.value, scope.metadata))
              force.resume();
            }).on("mouseleave", function (d, i) {
              svg.select("text").remove()
            });
          resetFoci()
          meta_update()
        })
      }
      return {
        link: link,
        restrict: 'E',
        scope: {
          metadata: '=',
          vis: '=',
          customs: '=',
          customnodes: '=',
          metasignal: '=',
          scale: '='
        }
      };
    });
