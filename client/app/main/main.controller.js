'use strict';
angular.module('albertaApp').controller('MainCtrl', function MainCtrl($scope, $http, $timeout, $q, $mdToast, $animate, $mdDialog, ngTableParams) {
  $scope.selected = [];
  $scope.scale = '2'
  $scope.showWelcome = function (ev) {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope, // use parent scope in template
      preserveScope: true,
      controller: 'wel',
      templateUrl: 'welcome.html',
      targetEvent: ev
        // do not forget this if use parent scope
    })
  };
  if (docCookies.getItem('selectedDocItems')) {
    $scope.selected = JSON.parse(docCookies.getItem('selectedDocItems'))
  }
  var showHello = docCookies.getItem('showWelcome')
  if (!showHello) {
    $scope.showWelcome();
    docCookies.setItem('showWelcome', 'hello', 3000)
  }
  $scope.$watch('selected', function (selected) {
    var old = JSON.parse(docCookies.getItem('selectedDocItems'))
    console.log(selected, old)
    if (selected.length) {
      if (docCookies.getItem('selectedDocItems')) {
        var old = JSON.parse(docCookies.getItem('selectedDocItems'))
        console.log(old.length, selected.length)
        if (selected.length > old.length) {
          $scope.showSimpleToast('Added to "YOUR ITEMS" tab.')
        }
      }
    }
    docCookies.setItem('selectedDocItems', JSON.stringify(selected), 3000)
    $http.post('api/yourdatas/save', {
      data: $scope.selected
    })
  }, true)
  $scope.donut_switch = function (donut_name) {
    var temp = $scope.mainDonut;
    $scope.mainDonut = $scope[donut_name];
    $scope[donut_name] = temp;
  }
  $scope.onDoc = true;
  $scope.onPay = false;
  $(".entry").delay(200).animate({
    "opacity": "1"
  }, 700);
  $scope.alpha = .002;
  $scope.customs = [];
  var colors = ['rgb(255,255,229)', 'rgb(247,252,185)', 'rgb(217,240,163)', 'rgb(173,221,142)', 'rgb(120,198,121)', 'rgb(65,171,93)', 'rgb(35,132,67)', 'rgb(0,104,55)', 'rgb(0,69,41)']
  $scope.custom_metadata = {};
  $scope.customNodes = [];
  var current_text = '';
  var filtered_obs = {};
  $scope.show;
  var home_meta = {
    '200': 3075,
    '404': 1106,
    '2012': 1309,
    '2013': 1420,
    '2014': 1452,
    culture_people: 258,
    Online: 3055,
    education_tech: 1122,
    economics_finnace: 870,
    'Online and Print': 837,
    law_order: 33,
    Print: 266,
    energy_transportation: 430,
    environment: 304,
    government: 965,
    health: 80,
    labor: 119,
    DVD: 5,
    'CD-ROM': 10,
    'Flash Drive': 1,
    'Online and CD-ROM': 3,
    '': 3,
    'Print and Flash Drive': 1,
    'size': 4181
  }
  $scope.metadata = home_meta;
  $scope.display_stats = {};
  $scope.display = {}
  $scope.display_stats.display = $scope.metadata.size + ' documents ' + 'in this query.';
  var colorsDonutSet1 = ['rgb(255,255,229)', 'rgb(255,247,188)', 'rgb(254,227,145)', 'rgb(254,196,79)', 'rgb(254,153,41)', 'rgb(236,112,20)', 'rgb(204,76,2)', 'rgb(153,52,4)', 'rgb(102,37,6)']
  var colorsDonutSet2 = ['rgb(165,0,38)', 'rgb(215,48,39)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,144)', 'rgb(255,255,191)', 'rgb(224,243,248)', 'rgb(171,217,233)', 'rgb(116,173,209)', 'rgb(69,117,180)', 'rgb(49,54,149)']
  var catCodes = {
    'culture_people': 0,
    'economics_finnace': 1,
    'education_tech': 2,
    'energy_transportation': 3,
    'environment': 4,
    'government': 5,
    'health': 6,
    'labor': 7,
    'law_order': 8
  }
  createFilterFor('');
  $scope.display.filters = [{
    name: 'Working Links (200)',
    key: '200',
    type: 'status',
    color: '#e31a1c'
  }, {
    name: 'Broken Links (404)',
    key: '404',
    type: 'status',
    color: '#800026'
  }, {
    name: '2012',
    key: '2012',
    type: 'year',
    color: colorsDonutSet1[2]
  }, {
    name: '2013',
    key: '2013',
    type: 'year',
    color: colorsDonutSet1[5]
  }, {
    name: '2014',
    key: '2014',
    type: 'year',
    color: colorsDonutSet1[3]
  }, {
    name: 'Culture & People',
    key: 'culture_people',
    type: 'category'
  }, {
    name: 'Available Online',
    key: 'Online',
    type: 'medium'
  }, {
    name: 'Education & Technology',
    key: 'education_tech',
    type: 'category'
  }, {
    name: 'Economics & Finnace',
    key: 'economics_finnace',
    type: 'category'
  }, {
    name: 'Law & Order',
    key: 'law_order',
    type: 'category'
  }, {
    name: 'Available in Print',
    key: 'Print',
    type: 'medium'
  }, {
    name: 'Energy & Transportation',
    key: 'energy_transportation',
    type: 'category'
  }, {
    name: 'Available in Print & Online',
    key: 'Online and Print',
    type: 'medium'
  }, {
    name: 'Environment',
    key: 'environment',
    type: 'category'
  }, {
    name: 'Government',
    key: 'government',
    type: 'category'
  }, {
    name: 'Health',
    key: 'health',
    type: 'category'
  }, {
    name: 'Labor',
    key: 'labor',
    type: 'category'
  }, {
    name: 'Available in DVD',
    key: 'DVD',
    type: 'medium'
  }, {
    name: 'Available in CD-ROM',
    key: 'CD-ROM',
    type: 'medium'
  }, {
    name: 'Flash Drive',
    key: 'Flash Drive',
    type: 'medium'
  }, {
    name: 'Online and CD-ROM',
    key: 'Online and CD-ROM',
    type: 'medium'
  }, {
    name: 'Print and Flash Drive',
    key: 'Print and Flash Drive',
    type: 'medium'
  }]
  $scope.toastPosition = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };
  $scope.getToastPosition = function () {
    return Object.keys($scope.toastPosition).filter(function (pos) {
      return $scope.toastPosition[pos];
    }).join(' ');
  };
  $scope.showSimpleToast = function (text) {
    if (text.length) {
      $mdToast.show($mdToast.simple().content(text).position($scope.getToastPosition()).hideDelay(4000));
    }
  };
  var display_names = {
    "culture_people": "Culture & People",
    "economics_finnace": "Economics & Finnace",
    "education_tech": "Education & Technology",
    "energy_transportation": "Energy & Transportation",
    "environment": "Environment",
    "government": "Government",
    "health": "Health",
    "labor": "Labor",
    "law_order": "Law & Order"
  }
  $scope.display_names = display_names;

  function catCodesGetter(array) {
    return array.reduce(function (ob, item, index) {
      ob[item] = index;
      return ob;
    }, {})
  }
  $scope.getStylish = function (filter) {
    return {
      'background-color': filter.color,
      'color': filter.textcolor
    };
  }
  var Donut = function (title, keys, colors, home_meta, donut_name, catCodes) {
    this.keys = keys;
    this.colors = colors;
    this.home_meta = home_meta;
    this.donut_name = this.donut_name;
    this.title = title;
    this.catCodes = catCodes;
    this.val = function (key, scope) {
      return scope[key];
    }
    this.getArray = function (scope) {
      return this.keys.map(function (item) {
        return scope[item];
      });
    }
    this.name = function (value) {
      return this.title;
    }
    this.sum = function (scope) {
      return this.keys.reduce(function (total, item) {
        return total + scope[item]
      }, 0)
    }
  }
  $scope.mainDonut = new Donut('Docuemnt Category', Object.keys(catCodes), colors, home_meta, 'mainDonut', catCodes);
  $scope.mainDonut.display = function (key, value, scope) {
    return this.display_names[key] + ':\n' + value + ' (' + (value / this.sum(scope) * 100).toFixed(2) + '%)'
  };
  $scope.mainDonut.display_names = display_names;
  $scope.donut1 = new Donut('Yearly Totals', ['2012', '2013', '2014'], [colorsDonutSet1[2], colorsDonutSet1[5], colorsDonutSet1[3]], home_meta, 'donut1', catCodesGetter(['2012', '2013', '2014']));
  $scope.donut1.display = function (key, value, scope) {
    return 'YEAR: ' + key + ' ' + value + ' (' + (value / this.sum(scope) * 100).toFixed(2) + '%)'
  }
  $scope.donut2 = new Donut(null, ['size'], ['#636363', '#969696'], home_meta, 'donut2', catCodesGetter(['size', '~size']));
  $scope.donut2.display = function (key, value, scope) {
    return 'Documents: ' + value + ' (' + (value / this.sum(scope) * 100).toFixed(2) + '%)'
  }
  $scope.donut2.getArray = function (scope) {
    var size = this.val(this.keys[0], scope);
    return [size, 4181 - size];
  }
  $scope.donut2.name = function (scope) {
    return 'Documents in View:\n' + this.val(this.keys[0], scope);
  }
  $scope.donut2.sum = function (scope) {
    return this.getArray(scope).reduce(function (total, item) {
      return total + item
    }, 0)
  }
  $scope.donut3 = new Donut('Link Statuses', ['200', '404'], ['#e31a1c', '#800026'], home_meta, 'donut2', catCodesGetter(['200', '404']))
  $scope.donut3.display = function (key, value, scope) {
    return this.displayName[key] + ':\n' + value + ' (' + (value / this.sum(scope) * 100).toFixed(2) + '%)'
  }
  $scope.donut3.displayName = {
    '404': 'Broken Link(s) \n',
    '200': 'Working Link(s)'
  };
  $scope.catCodes = catCodes;
  $scope.display_names = display_names;
  $scope.displayClass = function (item) {
    var check = item.key.indexOf(' ') == -1 && item.key.indexOf('-') == -1 && item.key.indexOf('0') == -1
    check = check && item.key.indexOf('DVD') == -1 && item.key.indexOf('Print') == -1
    check = check && item.key.indexOf('Online') == -1
    if (!Object.keys(filtered_obs).length) {
      return check ? item.key : 'md-primary';
    } else {
      var is_filtered = Object.keys(filtered_obs).some(function (datum) {
        return datum == item.key;
      })
      if (!is_filtered) {
        return check ? (item.key + ' filtered') : 'md-primary' + ' filtered';
      } else {
        return check ? item.key : 'md-primary';
      }
    }
  }
  $scope.colors = colors;
  $scope.filtered = function (item, index) {
    if (!$scope.display.filters[index].on) {
      $scope.display.filters[index].on = true; // showing that its currently filtered
      filtered_obs[item.key] = item;
      createFilterFor('')
      item.opac = 'filtered';
    } else {
      $scope.display.filters[index].on = false; // showing that its currently filtered
      delete filtered_obs[item.key];
      createFilterFor('')
      delete item.opac;
    }
  }
  $scope.upDateMain = {
    fnCaller: '',
    fnOptions: ''
  };
  //Searching stuff starts here
  $scope.simulateQuery = true;
  $scope.isDisabled = false;
  $scope.querySearch = querySearch;
  $scope.selectedItemChange = selectedItemChange;
  $scope.searchTextChange = searchTextChange;
  // ******************************
  // Internal methods
  // ******************************
  function querySearch(query) {
    var results = createFilterFor(query),
      deferred;
    if ($scope.simulateQuery) {
      return results;
    }
  }

  function searchTextChange(text) {
    current_text = text;
  }

  function selectedItemChange(item) {
    if (item) {
      $scope.selected.push(item)
      $scope.searchText = '';
    }
  }
  /**
   * Create filter function for a query string
   */
  var firstRun = true;
  $scope.table1 = [];

  function createFilterFor(query) {
    return $http.post('api/things', {
      query: query,
      filter: filtered_obs,
      customTag: $scope.customs
    }).success(function (data) {
      $scope.metadata = data.meta_data;
      var key = {
        query: query,
        filter: filtered_obs,
        customTag: $scope.customs
      };
      $scope.p_val1 = 1;
      $scope.p_val2 = 1;
      var catagories = getCurrentCategories();
      console.log($scope.metadata.size)
      if (!$scope.metadata.size && !Object.keys(filtered_obs).length && !$scope.customs.length && query) {
        $scope.showSimpleToast('No results for "' + query + '" press enter to search!')
      } else if (!$scope.metadata.size && (Object.keys(filtered_obs).length || $scope.customs.length) && query) {
        $scope.showSimpleToast('No results for "' + query + '" press enter to search or remove a filter to show more results.')
      } else if (!$scope.metadata.size && (Object.keys(filtered_obs).length || $scope.customs.length)) {
        $scope.showSimpleToast('No results, press enter to search or remove a filter to show more results.')
      }
      if ($scope.metadata.size >= 50 && catagories.length > 1 && !firstRun) {
        $http.post('api/things/docStats', {
          key: key,
          rows: {
            type: 'year',
            data: [2012, 2013, 2014]
          },
          cols: {
            type: 'category',
            data: catagories
          }
        }).success(function (data) {
          $scope.p_val1 = data.data;
          if ($scope.p_val1 === null || $scope.p_val1 === undefined) {
            $scope.p_val1 = 1;
          } else {
            $scope.table1 = [];
            var years = [2012, 2013, 2014];
            var ob = {};
            data.matrix.forEach(function (array, index) {
              var ob = {};
              var year = years[index];
              ob['year'] = {
                value: year,
                name: "year"
              };
              array.forEach(function (item, index) {
                ob[catagories[index]] = {
                  value: item,
                  name: catagories[index]
                };
              })
              $scope.table1.push(ob)
            })
          }
          $http.post('api/things/docStats', {
            key: key,
            rows: {
              type: 'status',
              data: ['404', '200']
            },
            cols: {
              type: 'category',
              data: catagories
            }
          }).success(function (data) {
            $scope.table2 = [];
            $scope.p_val2 = data.data;
            if ($scope.p_val2 === null || $scope.p_val2 === undefined) {
              $scope.p_val2 = 1;
            } else {
              var options = ['404', '200'];
              var ob = {};
              console.log(data)
              data.matrix.forEach(function (array, index) {
                var ob = {};
                var stat = options[index];
                ob['status'] = {
                  value: stat,
                  name: "Status"
                };
                array.forEach(function (item, index) {
                  ob[catagories[index]] = {
                    value: item,
                    name: catagories[index]
                  };
                })
                $scope.table2.push(ob)
              })
            }
          })
        })
      }
      firstRun = false;
    })
  }

  function getCurrentCategories() {
    return Object.keys($scope.metadata).filter(function (item) {
      if (Object.keys(catCodes).indexOf(item) != -1) {
        return $scope.metadata[item] > 0
      }
      return false;
    })
  }
  // Remove added Item
  $scope.removeSelected = function (i) {
    $scope.selected.splice(i, 1);
  }
  $scope.data = {
    selectedIndex: 0,
    secondLocked: false,
    secondLabel: "Item Two",
    bottom: false
  };
  $scope.next = function () {
    $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
  };
  $scope.previous = function () {
    $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
  };
  var tag;
  var filter_length = null;
  $scope.customTags = function (customTag) {
    if ($scope.customs.indexOf(customTag) == -1 && typeof (customTag) != Object && (customTag) !== null && customTag) {
      tag = customTag;
      filter_length = $scope.customs.length;
      $scope.customs.push(customTag)
    }
    $scope.searchText = '';
  }
  $scope.$watch('customs', function (customs) {
    if (tag || customs.length) {
      tag = true;
      createFilterFor('')
    }
  }, true)
  $scope.alert = '';
  $scope.showAdvanced = function (ev) {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope, // use parent scope in template
      preserveScope: true,
      controller: 'tempDoc',
      templateUrl: 'dialog1.tmpl.html',
      targetEvent: ev
        // do not forget this if use parent scope
    })
  };
  // END OF DOCUMENT SEARCHING
  ////////////////////////////////////////////////////////////
  //
  /* 
  /
  /
  /
  /
  /
  */
}); // END OF MAIN 
function wel($scope, $mdDialog) {
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
}
wel.$inject = ['$scope', '$mdDialog'];
angular.module('albertaApp').controller('wel', wel)

function tempDoc($scope, $mdDialog) {
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
}
tempDoc.$inject = ['$scope', '$mdDialog'];
angular.module('albertaApp').controller('tempDoc', tempDoc)
