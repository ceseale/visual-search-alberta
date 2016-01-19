'use strict';

angular.module('albertaApp')
  .controller('PaysearchCtrl', function ($scope, $http, $timeout, $q, $animate,$mdToast,  $mdDialog, ngTableParams) {
  	$scope.selected = [];



if(docCookies.getItem('selectedPayItems')){

  $scope.selected = JSON.parse(docCookies.getItem('selectedPayItems'))


}

$scope.$watch('selected', function (selected){
  if (selected.length ){
    if(docCookies.getItem('selectedPayItems')){
      var old = JSON.parse(docCookies.getItem('selectedPayItems'))
        if (selected.length > old.length){
          $scope.showSimpleToast('Added to "YOUR ITEMS" tab.')
        }
    }
}
docCookies.setItem('selectedPayItems', JSON.stringify(selected), 3000 )
   $http.post('api/yourdatas/save',{data :$scope.selected })


}, true)

$scope.alpha = .01; 
$scope.donut_switch = function (donut_name){
  var temp = $scope.mainDonut;
  $scope.mainDonut = $scope[donut_name];
  $scope[donut_name] = temp;
}
   var filtered_obs = {};

$scope.onDoc = false ; 
$scope.onPay = true ; 
$(".entry").delay(200).animate({"opacity": "1"}, 700);
$scope.display = {};
var color1 = ['rgb(255,255,229)','rgb(247,252,185)','rgb(217,240,163)','rgb(173,221,142)','rgb(120,198,121)','rgb(65,171,93)','rgb(35,132,67)','rgb(0,104,55)','rgb(0,69,41)']

var colors = ['rgb(255,255,204)','rgb(255,237,160)','rgb(254,217,118)','rgb(254,178,76)','rgb(253,141,60)','rgb(252,78,42)','rgb(227,26,28)','rgb(189,0,38)','rgb(128,0,38)', color1[8]];
var colorsDonutSet1 =  ['rgb(255,255,229)','rgb(247,252,185)','rgb(217,240,163)','rgb(173,221,142)','rgb(120,198,121)','rgb(65,171,93)','rgb(35,132,67)','rgb(0,104,55)','rgb(0,69,41)']
var colorsDonutSet2 = ['rgb(165,0,38)','rgb(215,48,39)','rgb(244,109,67)','rgb(253,174,97)','rgb(254,224,144)','rgb(255,255,191)','rgb(224,243,248)','rgb(171,217,233)','rgb(116,173,209)','rgb(69,117,180)','rgb(49,54,149)']
$scope.customs = [];
var current_text = '';
    $scope.simulateQuery = true;
    $scope.isDisabled    = false;




$scope.toastPosition = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };
  $scope.getToastPosition = function() {
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };


  $scope.showSimpleToast = function(text) {
    if(text.length){
    $mdToast.show(
      $mdToast.simple()
        .content(text)
        .position($scope.getToastPosition())
        .hideDelay(4000)
    );
  }
  };



var color3 = ['rgb(255,255,217)','rgb(237,248,177)','rgb(199,233,180)','rgb(127,205,187)','rgb(65,182,196)','rgb(29,145,192)','rgb(34,94,168)','rgb(37,52,148)','rgb(8,29,88)', '#ffffbf']
var monthCodes = {'10':'October', '11':'November', '12': 'December', '1': 'January', '2':'February', '3':'March',
'4': 'April', '5':'May', '6':'June', '7':'July', '8':'August', '9':'September'}




function catCodesGetter (array){


if( Object.prototype.toString.call(array) === '[object Object]' ){

  array = Object.keys(array);
}




  return array.reduce(function (ob ,item, index){
    ob[item] = index;
    return ob;
  }, {} )
}

var catCodes = [ 'Meals',
  'Mileage',
  'Other Costs',
  'Accommodations',
  'Ground Transportation',
  'Air Fare',
  'Hospitality',
  'Honorarium',
  'Working Session',
  'Business Insurance' ]


 var home_meta = { '10': 683745.0599999896,
  '11': 577170.4299999838,
  '12': 356357.04000000126,
  '200': 3535980.2500000144,
  'Agriculture and Rural Development': 221323.02000000206,
  Travel: 5044371.180000313,
  Meals: 249896.6500000341,
  None: 1664259.990000156,
  'Agriculture and Rural Development_count': 2587,
  Travel_count: 63802,
  Meals_count: 15556,
  '10_count': 7540,
  None_count: 40770,
  Mileage: 581179.4300000021,
  Mileage_count: 6691,
  'Other Costs': 192370.55000001317,
  'Other Costs_count': 11821,
  Accommodations: 1033431.9300000016,
  Accommodations_count: 3741,
  '200_count': 24729,
  'Ground Transportation': 259985.71000000037,
  'Ground Transportation_count': 5773,
  'Air Fare': 1545909.1600000013,
  'Air Fare_count': 3398,
  Energy: 459439.2599999996,
  Energy_count: 5126,
  'Enterprise and Advanced Education': 511572.3399999989,
  'Enterprise and Advanced Education_count': 4462,
  'Environment and Sustainable Resource Development': 378627.3900000014,
  'Environment and Sustainable Resource Development_count': 4199,
  'Executive Council': 168753.68000000116,
  'Executive Council_count': 2330,
  Hospitality: 166101.8,
  Hospitality_count: 932,
  'Human Services': 1228529.4899999702,
  'Human Services_count': 19515,
  'Justice and Solicitor General': 303196.5500000028,
  'Justice and Solicitor General_count': 4407,
  'Municipal Affairs': 164782.7600000022,
  'Municipal Affairs_count': 1953,
  'Service Alberta': 73299.32999999984,
  Honorarium: 1180147.9999999742,
  'Service Alberta_count': 1268,
  Honorarium_count: 16806,
  'Tourism, Parks and Recreation': 114902.91000000037,
  'Tourism, Parks and Recreation_count': 1467,
  Infrastructure: 70030.94000000012,
  Infrastructure_count: 1101,
  Culture: 100570.76000000014,
  Culture_count: 1617,
  'Working Session': 145636.32000000024,
  'Working Session_count': 2462,
  'International and Intergovernmental Relations': 661528.3199999959,
  'International and Intergovernmental Relations_count': 4430,
  '11_count': 7307,
  Education: 81026.73000000004,
  Education_count: 1236,
  Health: 216215.93000000253,
  Health_count: 3126,
  'Business Insurance': 1449.75,
  'Business Insurance_count': 16,
  'Treasury Board and Finance': 196693.86000000066,
  'Treasury Board and Finance_count': 1993,
  'Aboriginal Relations': 31223.64999999998,
  'Aboriginal Relations_count': 389,
  '1': 500768.19999999594,
  '1_count': 6260,
  Transportation: 188361.76000000458,
  Transportation_count: 3272,
  '12_count': 4889,
  '2': 537130.9099999992,
  '2_count': 6826,
  '3': 476845.3599999988,
  '3_count': 6125,
  '4': 580517.3199999951,
  '4_count': 6744,
  '5': 667657.2699999975,
  '5_count': 7579,
  'Transportation Safety Board': 30161.559999999667,
  'Transportation Safety Board_count': 1021,
  '6': 503413.7699999986,
  '6_count': 6631,
  '7': 208776.12000000372,
  '7_count': 3700,
  '8': 100052.91000000019,
  '8_count': 1806,
  '9': 7805.85,
  '9_count': 92,
  '10_mean': 90.68236870026386,
  '11_mean': 78.9886998768282,
  '12_mean': 72.88955614645147,
  '200_mean': 142.98921306967586,
  'Agriculture and Rural Development_mean': 85.5519984538083,
  Travel_mean: 79.06290053603826,
  Meals_mean: 16.06432566212613,
  None_mean: 40.82070125092362,
  Mileage_mean: 86.8598759527727,
  'Other Costs_mean': 16.273627442687857,
  Accommodations_mean: 276.2448356054535,
  'Ground Transportation_mean': 45.03476701888106,
  'Air Fare_mean': 454.946780459094,
  Energy_mean: 89.62919625438931,
  'Enterprise and Advanced Education_mean': 114.65090542357663,
  'Environment and Sustainable Resource Development_mean': 90.17084782091008,
  'Executive Council_mean': 72.42647210300478,
  Hospitality_mean: 178.22081545064376,
  'Human Services_mean': 62.953086856262885,
  'Justice and Solicitor General_mean': 68.79885409575738,
  'Municipal Affairs_mean': 84.37417306707742,
  'Service Alberta_mean': 57.80704258675066,
  Honorarium_mean: 70.22182553849662,
  'Tourism, Parks and Recreation_mean': 78.32509202454013,
  Infrastructure_mean: 63.606666666666776,
  Culture_mean: 62.195893630179434,
  'Working Session_mean': 59.153663688058586,
  'International and Intergovernmental Relations_mean': 149.32919187358823,
  Education_mean: 65.55560679611654,
  Health_mean: 69.16696417146593,
  'Business Insurance_mean': 90.609375,
  'Treasury Board and Finance_mean': 98.69235323632748,
  'Aboriginal Relations_mean': 80.26645244215933,
  '1_mean': 79.99492012779488,
  Transportation_mean: 57.56777506112609,
  '2_mean': 78.68897011426886,
  '3_mean': 77.8523036734692,
  '4_mean': 86.07908066429346,
  '5_mean': 88.09305581211208,
  'Transportation Safety Board_mean': 29.541194906953642,
  '6_mean': 75.9182280199063,
  '7_mean': 56.425978378379384,
  '8_mean': 55.40028239202668,
  '9_mean': 84.84619565217392,
  'Agriculture and Rural Development_var': 6785.2990036073725,
  Travel_var: 5246690393.293328,
  Meals_var: 1922828.7928265408,
  '10_var': 1332787659.6406977,
  None_var: 626798947.2368886,
  Mileage_var: 92259626.76599927,
  'Other Costs_var': 6418248.868255397,
  Accommodations_var: 344628625.00822383,
  '200_var': 4549766987.272911,
  'Ground Transportation_var': 19455128.56761163,
  'Air Fare_var': 3214810714.7595544,
  Energy_var: 36479.06953911657,
  'Enterprise and Advanced Education_var': 15080.489108618936,
  'Environment and Sustainable Resource Development_var': 10371.378127296612,
  'Executive Council_var': 8422.914387724952,
  Hospitality_var: 152583187.3617803,
  'Human Services_var': 22403.39434657694,
  'Justice and Solicitor General_var': 31985.62550194824,
  'Municipal Affairs_var': 204997.611265903,
  'Service Alberta_var': 3132.631570102771,
  Honorarium_var: 824793688.8029913,
  'Tourism, Parks and Recreation_var': 5603.717463965556,
  Infrastructure_var: 5628.392711111098,
  Culture_var: 4107.596436899388,
  'Working Session_var': 18391527.658753548,
  'International and Intergovernmental Relations_var': 173005.60000173733,
  '11_var': 526862842.55026627,
  Education_var: 4321.42544648471,
  Health_var: 6438.9553639188425,
  'Business Insurance_var': 99454.95149375,
  'Treasury Board and Finance_var': 10000.881287775614,
  'Aboriginal Relations_var': 6089.224360400069,
  '1_var': 453092032.2620555,
  Transportation_var: 7574.651916930611,
  '12_var': 212299005.27193782,
  '2_var': 600651004.83426,
  '3_var': 363322950.0647912,
  '4_var': 563003230.5356929,
  '5_var': 848470244.3272235,
  'Transportation Safety Board_var': 1341.8864746892991,
  '6_var': 339358339.83607644,
  '7_var': 67727416.59515776,
  '8_var': 20870676.856155865,
  '9_var': 3656554.212968481,
  '2013_mean' : 78.240852,
  '2012_mean' : 82.06851,
  '2013_var' : 3266625947.0,
  '2012_var' : 2070412379.09,
  '2013_count' : 45763,
  '2012_count' : 19736,
  '2012': 1619704.1100000001,
  '2013': 3580536.1299999999,
  count: 65499,
  size: 5200240.240000344,
  '~size': 0 }

 $scope.metadata = home_meta;
$scope.home_meta = home_meta;

var monthCodes = {'10':'October', '11':'November', '12': 'December', '1': 'January', '2':'February', '3':'March',
'4': 'April', '5':'May', '6':'June', '7':'July', '8':'August', '9':'September'}



$scope.getStylish = function (filter){

  return {'background-color' : filter.color, 'color':filter.textcolor || 'white'};
}

//remove hospitality from donut , working session



var catCodes = [ 'Meals',
  'Mileage',
  'Other Costs',
  'Accommodations',
  'Ground Transportation',
  'Air Fare',
  'Hospitality',
  'Honorarium',
  'Working Session',
  'Business Insurance' ]


$scope.display.filters = [ 
  { name: 'January', key: '1', type: 'month', color:'rgb(174,1,126)' },
  { name: 'February', key: '2', type: 'month', color:'rgb(122,1,119)' },
  { name: 'March', key: '3', type: 'month', color : 'rgb(73,0,106)' },
  { name: 'April', key: '4', type: 'month' , color : 'rgb(189,189,189)' },
  { name: 'May', key: '5', type: 'month' , color:'rgb(150,150,150)' },
  { name: 'June', key: '6', type: 'month', color: 'rgb(115,115,115)' },
  { name: 'July', key: '7', type: 'month', color: 'rgb(82,82,82)' },
  { name: 'August', key: '8', type: 'month', color: 'rgb(37,37,37)' },
  { name: 'September', key: '9', type: 'month', color: 'rgb(0,0,0)' },
  { name: 'October', key: '10', type: 'month' , color: 'rgb(250,159,181)'},
  { name: 'November', key: '11', type: 'month' , color: 'rgb(247,104,161)'},
  { name: 'December', key: '12', type: 'month', color: 'rgb(221,52,151)' },


  { name: 'Receipt Available', key: '200', type: 'urlcode' , color: colorsDonutSet1[6] },
  { name: 'No Receipt', key: 'None', type: 'urlcode', color: colorsDonutSet1[2] , textcolor : 'black'},

  {name: '2012', key: '2012', type: 'year', color:color1[8]  },
    {name: '2013', key: '2013', type: 'year',  color: color1[5] },
  { name: 'Meals', key: 'Meals', type: 'type' , color: colors[0] , textcolor : 'black'},

  { name: 'Mileage', key: 'Mileage', type: 'type', color : colors[1],  textcolor : 'black' },
  { name: 'Other Costs', key: 'Other Costs', type: 'type', color :colors[2] },
  { name: 'Accommodations', key: 'Accommodations', type: 'type', color: colors[3] },
  { name: 'Ground Transportation', key: 'Ground Transportation', type: 'type', color : colors[4]},
  { name: 'Air Fare', key: 'Air Fare', type: 'type', color: colors[5] },
  { name: 'Hospitality', key: 'Hospitality', type: 'type', color: colors[6] },
  { name: 'Honorarium', key: 'Honorarium', type: 'type' ,  color: colors[7]},
  { name: 'Working Session', key: 'Working Session', type: 'type', color: colors[8] },
  { name: 'Business Insurance', key: 'Business Insurance', type: 'type' , color: colors[9]  },
   { name: 'Agriculture and Rural Development',
    key: 'Agriculture and Rural Development',
    type: 'ministry' },
  { name: 'Energy', key: 'Energy', type: 'ministry' },
  { name: 'Enterprise and Advanced Education',
    key: 'Enterprise and Advanced Education',
    type: 'ministry' },
  { name: 'Environment and Sustainable Resource Development',
    key: 'Environment and Sustainable Resource Development',
    type: 'ministry' },
  { name: 'Executive Council',
    key: 'Executive Council',
    type: 'ministry' },
  { name: 'Human Services',
    key: 'Human Services',
    type: 'ministry' },
  { name: 'Justice and Solicitor General',
    key: 'Justice and Solicitor General',
    type: 'ministry' },
  { name: 'Municipal Affairs',
    key: 'Municipal Affairs',
    type: 'ministry' },
  { name: 'Service Alberta',
    key: 'Service Alberta',
    type: 'ministry' },
  { name: 'Tourism, Parks and Recreation',
    key: 'Tourism, Parks and Recreation',
    type: 'ministry' },
  { name: 'Infrastructure',
    key: 'Infrastructure',
    type: 'ministry' },
  { name: 'Culture', key: 'Culture', type: 'ministry' },
  { name: 'International and Intergovernmental Relations',
    key: 'International and Intergovernmental Relations',
    type: 'ministry' },
  { name: 'Education', key: 'Education', type: 'ministry' },
  { name: 'Health', key: 'Health', type: 'ministry' },
  { name: 'Treasury Board and Finance',
    key: 'Treasury Board and Finance',
    type: 'ministry' },
  { name: 'Aboriginal Relations',
    key: 'Aboriginal Relations',
    type: 'ministry' },
  { name: 'Transportation',
    key: 'Transportation',
    type: 'ministry' },
  { name: 'Transportation Safety Board',
    key: 'Transportation Safety Board',
    type: 'ministry' } 
 ];


Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };



$scope.mainDonut = { keys: catCodes, display : function (key,value, scope ){
  return key +':\n$' + (value).formatMoney(2) + ' ('+(value/this.sum(scope) * 100).toFixed(2)+'%)'
}, val: function ( key, scope){
 return scope[key]
 }, getArray: function (scope){
  return this.keys.map(function (item){ return scope[item].toFixed(2) });
 }, name : function (value ){
   return 'Payment Type'
 }, colors: colors,
 sum: function (scope){
  return this.keys.reduce(function (total, item){ return total + scope[item] } , 0 )
 }, display_names : this.keys,
 catCodes : catCodesGetter(catCodes),
 home_meta: home_meta,
 donut_name: 'mainDonut'
}

// 1 
$scope.donut1 = { keys:[ '2012', '2013'] , display : function (key,value, scope ){
  return key + '\n$' + (value).formatMoney(2)  + ' ('+(value/this.sum(scope) * 100).toFixed(2)+'%)'
}, val: function ( key, scope){
 return scope[key]
 }, getArray: function (scope){
  return this.keys.map(function (item){ return scope[item] });
 }, name : function (value ){
   return 'Year'
 }, colors: [color1[3], color1[5],color1[8]],
 sum: function (scope){
  return this.keys.reduce(function (total, item){ return total + scope[item] } , 0 )
 }, catCodes: catCodesGetter( [ '2012', '2013'] ),
 home_meta: home_meta,
 donut_name:'donut1',
 bigger: false

}

$scope.donut2 = {keys: ['size', '~size'], display: function (key, value,  scope ){
	if(key == 'size') return this.name(scope)
 return 'Out View: $' + (value).formatMoney(2)  + ' ('+(value/this.sum(scope)*100).toFixed(2)+'%)'
}, val : function (key, scope){
  return scope[key]
}, getArray : function (scope){
  var size = this.val(this.keys[0], scope);

  return [size , this.val(this.keys[1], scope)]
}, name : function (scope){ return 'Total in View:\n$' + this.val(this.keys[0],scope).formatMoney(2)
},  colors: [colorsDonutSet1[4], colorsDonutSet1[7]],
 sum: function (scope){
  return this.getArray(scope).reduce(function (total, item){ return total + item } , 0 )
 }, catCodes: catCodesGetter( ['size', '~size'] ),
 home_meta: catCodesGetter(home_meta),
 donut_name: 'donut2',
 bigger: true
 }


$scope.donut3 = {keys: [ '200' ,'None'], displayName : {'200': 'Receipt Available\n', 'None': 'No Receipt'},
 display: function (key, value,  scope ){
 return this.displayName[key] + ':\n$' + (value).formatMoney(2)  + ' ('+(value/this.sum(scope) *100 ).toFixed(2)+'%)'
}, val : function (key, scope){
  return scope[key]
}, getArray: function (scope){
  return this.keys.map(function (item){ return scope[item] });
 }, name : function (value){ return 'Receipt Available'
}, colors: [colorsDonutSet1[6], colorsDonutSet1[2]],
 sum: function (scope){
  return this.keys.reduce(function (total, item){ return total + scope[item] } , 0 )
 }, catCodes: catCodesGetter( ['200' , 'None'] ),
 home_meta: catCodesGetter(home_meta),
 donut_name: 'donut3',
 bigger: true

  }



$scope.donut4 = {keys: [ '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9' ], displayName : monthCodes,
 display: function (key, value,  scope ){
 return this.displayName[key] + ':\n' + (value).formatMoney(2)  + ' ('+(value/this.sum(scope) *100 ).toFixed(2)+'%)'
}, val : function (key, scope){
  return scope[key]
}, getArray: function (scope){
  return this.keys.map(function (item){ return scope[item] });
 }, name : function (value){ return 'Expenses By Month'
}, colors:['rgb(250,159,181)','rgb(247,104,161)','rgb(221,52,151)','rgb(174,1,126)','rgb(122,1,119)','rgb(73,0,106)','rgb(189,189,189)','rgb(150,150,150)','rgb(115,115,115)','rgb(82,82,82)','rgb(37,37,37)','rgb(0,0,0)'],
 sum: function (scope){
  return this.keys.reduce(function (total, item){ return total + scope[item] } , 0 )
 }, catCodes: catCodesGetter( [ '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9' ] ),
 home_meta: catCodesGetter(home_meta),
 donut_name: 'donut4',
 bigger: false

  }


$scope.catCodes = catCodes;
// Working 

$scope.displayClass = function (item){
  var check = true;
  if(!Object.keys(filtered_obs).length){

  return  'md-primary';
  }else {
    var is_filtered = Object.keys(filtered_obs).some(function (datum){
        return datum == item.key;
    })
    if(!is_filtered){
    return  'md-primary' + ' filtered';
  } else {
      return  'md-primary';
  }
  }
}

$scope.colors = colors;
$scope.filtered = function (item, index){
  if(!$scope.display.filters[index].on){
      $scope.display.filters[index].on = true; // showing that its currently filtered

     filtered_obs[item.key] = item ;
     createFilterFor('')
     item.opac = 'filtered';
   } else {

    $scope.display.filters[index].on = false ; // showing that its currently filtered

    delete filtered_obs[item.key];

    createFilterFor('')
    delete item.opac ;

   }
  }





/////

    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange   = searchTextChange;


    function querySearch (query) {

  
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
      if(item){
      $scope.selected.push(item)
            $scope.searchText = '';
    }
    }

    /**
     * Create filter function for a query string
     */

     $scope.table1 = [];
    function createFilterFor(query) {
    if (query === null){
      query = '';
    }
    return $http.post('api/payments/query',{query:query, filter: filtered_obs, customTag: $scope.customs }).success(function (data){

      $scope.metadata = data.meta_data;


   if (!$scope.metadata.size && !Object.keys(filtered_obs).length && !$scope.customs.length && query ){
        $scope.showSimpleToast('No results for "' + query +'" press enter to search!')
      } else if(!$scope.metadata.size &&  (Object.keys(filtered_obs).length  || $scope.customs.length)  && query ){
        $scope.showSimpleToast('No results for "' + query +'" press enter to search or remove a filter to show more results.')
      } else if(!$scope.metadata.size &&  (Object.keys(filtered_obs).length  || $scope.customs.length) ){
        $scope.showSimpleToast('No results, press enter to search or remove a filter to show more results.')
      } 



      var key = {query:query, filter: filtered_obs, customTag: $scope.customs };

      $http.post('api/payments/tester', { key : key } ).success(function (data){

       $scope.testResults = (data)
       console.log(data)
       $scope.aSig = Object.keys($scope.testResults).some(function (item ){
          return $scope.testResults[item] < $scope.alpha
       })



         })

    })
    }

// Remove added Item

$scope.removeSelected = function (i){
  $scope.selected.splice(i,1);
}

$scope.data = {
      selectedIndex: 0,
      secondLocked:  false,
      secondLabel:   "Item Two",
      bottom:        false
    };
    $scope.next = function() {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    };
    $scope.previous = function() {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };


var tag; 
var filter_length = null ;
  $scope.customTags = function (customTag){

    if($scope.customs.indexOf(customTag) == -1 && typeof(customTag)!= Object && (customTag)!== null && customTag){
      tag = customTag ; 
      filter_length = $scope.customs.length;
      $scope.customs.push(customTag)
  }
  $scope.searchText = '';
  }

  $scope.$watch('customs',function (customs){
    if(tag || customs.length ){
      tag = true ;
      createFilterFor('')

    }
  }, true )











  $scope.alert = '';
 
  $scope.showAdvanced = function(ev) {

    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,        // use parent scope in template
      preserveScope: true ,
      controller: 'tempPay',
      templateUrl: 'dialog2.tmpl.html',
      targetEvent: ev
 // do not forget this if use parent scope
    })
  };






  $scope.showWelcome = function(ev) {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,        // use parent scope in template
      preserveScope: true ,
      controller: 'wel',
      templateUrl: 'welcome.html',
      targetEvent: ev
 // do not forget this if use parent scope
    })
  };



  });



function tempPay ($scope, $mdDialog){

  var homeColor = "#2ca02c";
  var newColor =  "#ff7f0e";
  var selection = {Month: 'month', 'With Receipt':'urlcode', Type: 'type', Category:'category', Ministry: 'ministry'}

var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";


var filters = $scope.display.filters; // 


  $scope.graph = {}
  $scope.graph.selected = 'Month'
  $scope.graph.options = Object.keys(selection)
  $scope.graph.selectedSig = 'All'
  $scope.graph.sigOptions = ['Significant' ,'Insignificant', 'All']
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };



var data_key = filters.filter(function(item){
 return item.type === selection[$scope.graph.selected];
})




function getData(){
data_key = filters.filter(function(item){
 return item.type === selection[$scope.graph.selected];
})



      var main = data_key.filter(function (item){ return $scope.metadata[item.key + '_mean'] })
      .filter(function (item){ 

        if($scope.graph.selectedSig == 'All'){
          return true;
        }else if ($scope.graph.selectedSig == 'Insignificant'){
          return $scope.testResults[item.key] >= $scope.alpha
        }
          return $scope.testResults[item.key] < $scope.alpha
      })
      .map(function (item, index){
      var amount = $scope.metadata[item.key + '_mean'];
      var variance = $scope.metadata[item.key + '_var']/  $scope.metadata[item.key + '_count'] -1 ;
      var sd = Math.sqrt(variance)
      return {shape: 'circle' , size: sd, y:amount, x:index, item_key: item.key, sd: sd, name:item.name }
    })

      var mainHome = data_key.filter(function (item){ 

        if($scope.graph.selectedSig == 'All'){
          return true;
        }else if ($scope.graph.selectedSig == 'Insignificant'){
          return $scope.testResults[item.key] >= $scope.alpha
        }
          return $scope.testResults[item.key] < $scope.alpha
      })
      .map(function (item , index){
      var amount = $scope.home_meta[item.key + '_mean'];
      var variance = $scope.home_meta[item.key + '_var']/  $scope.home_meta[item.key + '_count'] -1 ;
      var sd = Math.sqrt(variance)
      var amount = $scope.home_meta[item.key + '_mean'];
      return ({shape: 'circle' , size: sd, y:amount, x:index, item_key: item.key, sd:sd, name:item.name})
    })

    main = {color : newColor , key: 'Query Average', values : main };
    mainHome = {color : homeColor , key: 'Total Average', values : mainHome };
    var data = [main, mainHome];
    return data;


} 




    var chart;
    nv.addGraph(function() {
        chart = nv.models.scatterChart()
            .color(d3.scale.category10().range())
            .duration(300);

        chart.xAxis.tickFormat(d3.format('.02f'));
        chart.yAxis.tickFormat(d3.format('.02f'));
        d3.select('#test1 svg')
            .datum(getData())
            .call(chart)

        nv.utils.windowResize(chart.update);
        chart.dispatch.on('stateChange', function(e) { ('New State:', JSON.stringify(e)); });
    // chart.xAxis.tickFormat(function(d){
    //         return data_key[d];
    //     });

    //     chart.yAxis.tickFormat(function(d){
    //         return d.toFixed(2);
    //     });
    chart.tooltipContent(function(key, y, e, graph) { 
      var ob = key.point;
      var mean = ob.y;
      var pval = $scope.testResults[ob.item_key];

      if(pval>= $scope.alpha){
        var sig = 'Not significantly different (p-value > '+ $scope.alpha +')'
      } else {
        var sig = 'Significant different! (p-value < '+ $scope.alpha +')'
      }
      if($scope.graph.selected.toLowerCase() === 'month'){
         return '<h3>' + month[key.pointIndex] + '</h3>' 
         + '<p> Average: '+ mean.formatMoney(2) +'</p>'
         + '<p> Standard Error: '+ ob.sd +'</p>'
         + '<p> p-value: '+pval.toFixed(6)+'</p>'
           + '<p>'+sig+'</p>';
      }else {
         return '<h3>' + ob.name + '</h3>' 
         + '<p> Average: '+ mean.formatMoney(2) +'</p>'
         + '<p> Standard Error: '+ ob.sd +'</p>'
         + '<p> p-value: '+pval.toFixed(6)+'</p>'
           + '<p>'+sig+'</p>';
      }




    
       })

    });

      $scope.$watch('graph',function (graph){


if(chart){
       d3.select('#test1 svg')
            .datum(getData())
            .transition()               
            .duration(500)
            .call(chart).pointSize(10.5)



}

      },true)

    function randomData(groups, points) { //# groups,# points per group
        // smiley and thin-x are our custom symbols!
        var data = [],
            shapes = ['circle'],
            random = d3.random.normal();
        for (var i = 0; i < groups; i++) {
            data.push({
                key: 'Group ' + i,
                values: []
            });
            for (var j = 0; j < points; j++) {
                data[i].values.push({
                    x: random(),
                    y: random(),
                    size: Math.round(Math.random() * 100) / 100,
                    shape: shapes[j % shapes.length]
                });
            }
        }
    
        return data;
    }




      

 }


tempPay.$inject = ['$scope', '$mdDialog'];

angular.module('albertaApp').controller('tempPay', tempPay)




