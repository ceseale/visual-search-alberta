'use strict';

var jStat = require('jStat').jStat;
var _ = require('underscore')
var csv = require("fast-csv");
var NodeCache = require( "node-cache" );
var myCache = new NodeCache();
var fs = require('fs')
var ss = require('simple-statistics');
var json2csv = require('json2csv');

var main = []; 

var stat = require('jsregress');


var last = '';

function getSStot(regressedObj){
var yVals = regressedObj.yVals;
var mean = jStat(yVals).mean()	

 return jStat( yVals.map(function (item){
 	return Math.pow((item - mean), 2)
 })).sum()
}

function getSSreg(regressedObj){

var yVals = regressedObj.yVals;
var predicted = regressedObj.predicted;

var mean = jStat(yVals).mean()	

 return jStat( predicted.map(function (item){
 	return Math.pow(item - mean, 2)
 })).sum()
}


function getSSres(regressedObj){
var yVals = regressedObj.yVals;
var predicted = regressedObj.predicted;
 return jStat( predicted.map(function (item, index){
 	return Math.pow( yVals[index ]- item , 2)
 })).sum()
}



function getStatus(item){
	if(item === '' || item === '404.0'){
		return 'None'
	}
	return 200
}






var home = { '10': 683745.0599999896,
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

var home_meta = [ '10',
  '11',
  '12',
  '200',
  'Agriculture and Rural Development',
  'Travel',
  'Meals',
  'None',
  'Mileage',
  'Other Costs',
  'Accommodations',
  'Ground Transportation',
  'Air Fare',
  'Energy',
  'Enterprise and Advanced Education',
  'Environment and Sustainable Resource Development',
  'Executive Council',
  'Hospitality',
  'Human Services',
  'Justice and Solicitor General',
  'Municipal Affairs',
  'Service Alberta',
  'Honorarium',
  'Tourism, Parks and Recreation',
  'Infrastructure',
  'Culture',
  'Working Session',
  'International and Intergovernmental Relations',
  'Education',
  'Health',
  'Business Insurance',
  'Treasury Board and Finance',
  'Aboriginal Relations',
  '1',
  'Transportation',
  '2',
  '3',
  '4',
  '5',
  'Transportation Safety Board',
  '6',
  '7',
  '8',
  '9',
  '2013',
  '2012'
  ] ; 



    csv
 .fromPath(__dirname + "/cleaned_expenses_fixed.csv" )
 .on("data", function(data){
     if (data[2] != 'Name'){
    main.push({
   	amount: +data[8],
    ministry: data[0],
    position: data[1],
    name: data[2],
    category: data[3],
    type: data[4],
    month: data[9],
    description: data[5],
    receipt: data[6] ,
    urlcode: getStatus(data[7]),
    date: data[10],
    year: data[11]
       })

  
     }
 } )
.on("end",function (){


myCache.set( JSON.stringify({"query":"","filter":{},"customTag":[]}) , {out:{meta_data:home , data: _.first(main, 20)}} , function( err, success ){
  console.log('asfas')
});


// END
})

function getSS(amount, mean){

	return Math.pow((amount - mean), 2)
}


function search(req, res){



var customTag = req.body.customTag;
var filters = (req.body.filter);
console.log(filters)
var data;

    function createFilterFor(query) {
      var lowercaseQuery = (query.toLowerCase());
      return function filterFn(d) {
        return ( (d.description.toLowerCase()).indexOf(lowercaseQuery) === 0);
      };
    }


if(req.body.query.length){
data = main.filter( createFilterFor(req.body.query + '') ) ;
}



if(Object.keys(filters).length && !req.body.query.length){
data = main.filter(function (d){
  return Object.keys(filters).every(function (i){
    var item = filters[i];
    return item.key == d[item.type];
  })
})
} else if(Object.keys(filters).length ){
  data = data.filter(function (d){
  return Object.keys(filters).every(function (i){
    var item = filters[i];
    return item.key == d[item.type];
  })
})
} 



if(data && customTag.length){

  data = data.filter(function (item){
    var low = item.description.toLowerCase()
    return customTag.every(function (tag){
      return low.indexOf(tag.toLowerCase()) != -1 ; 
    })
  })
} else if (customTag.length){

    data = main.filter(function (item){
    var low = item.description.toLowerCase()
    return customTag.every(function (tag){
      return low.indexOf(tag.toLowerCase()) != -1 ; 
    })
  })
}



var raw = [];

if(data.length){



var total = 0;
var toke = data.reduce(function (meta_data, d ){
		meta_data[d.ministry] = (meta_data[d.ministry]+= d.amount) || d.amount ; 
		total = total += d.amount
		meta_data[d.category]  = (meta_data[d.category]+= d.amount) || d.amount ; 
		meta_data[d.type] = (meta_data[d.type]+= d.amount) || d.amount ; 
    meta_data[d.year] = (meta_data[d.year]+= d.amount) || d.amount ; 
		meta_data[d.month]  = (meta_data[d.month]+= d.amount) || d.amount ; 
		meta_data[d.urlcode]  = (meta_data[d.urlcode]+= d.amount) || d.amount ;

		// COUNTS
		meta_data[d.ministry+ '_count'] = (meta_data[d.ministry+ '_count']+= 1) || 1 ; 
		meta_data[d.category+ '_count'] = (meta_data[d.category+ '_count']+= 1) || 1 ; 
		meta_data[d.type+ '_count'] = (meta_data[d.type+ '_count']+= 1) || 1 ; 
        meta_data[d.year+ '_count'] = (meta_data[d.year+ '_count']+= 1) || 1 ; 
		meta_data[d.month+ '_count'] = (meta_data[d.month+ '_count']+= 1) || 1 ; 
		meta_data[d.urlcode+ '_count'] = (meta_data[d.urlcode+ '_count']+= 1) || 1 ;
		return meta_data; 
	},{}) 


home_meta.forEach(function (item ){
 toke[ item +'_mean' ] = toke[item] / toke[item + '_count']
 toke[ item +'_mean' ] = toke[ item +'_mean' ] ? toke[ item +'_mean' ] : 0
})

     data.forEach(function ( d ){

		toke[d.ministry+'_var'] = (toke[d.ministry+'_var']+=1) || getSS(d.amount, toke[d.ministry+ '_mean']); 
		// total = total += d.amount
		toke[d.category+'_var']   = (toke[d.category+'_var'] += getSS(d.amount, toke[d.category+ '_mean'])) || getSS(d.amount, toke[d.category+ '_mean']) ; 
		toke[d.type+'_var']  = (toke[d.type+'_var'] += getSS(d.amount, toke[d.type+ '_mean'])) || getSS(d.amount, toke[d.type+ '_mean']) ; 
   toke[d.year+'_var']  = (toke[d.year+'_var'] += getSS(d.amount, toke[d.year+ '_mean'])) || getSS(d.amount, toke[d.year+ '_mean']) ; 
		toke[d.month+'_var']   = (toke[d.month+'_var'] += getSS(d.amount, toke[d.month+ '_mean'])) || getSS(d.amount, toke[d.month+ '_mean']) ; 
		toke[d.urlcode+'_var']   = (toke[d.urlcode+'_var'] += getSS(d.amount, toke[d.urlcode+ '_mean'] )) || getSS(d.amount, toke[d.urlcode+ '_mean'] ) ;

})



toke['count'] = main.length;
toke['size'] = total;
toke['~size'] =5200240.240000344 - total; 

if(toke['~size'] < 1 ){
	toke['~size'] = 0 ;
}

var meta = toke ; 

for (var i in (home_meta) ){
  if(meta[home_meta[i]] === undefined ){
    meta[home_meta[i]] = 0; 
  }
}


data = _.first(data, 20) 

return {out:{  data : data || 200, meta_data: meta }};

}

return {out:{ data : data || 200, meta_data: meta }};


}





// Get list of payments
exports.index = function(req, res) {


  res.json([]);
};



exports.query = function(req, res) {



last = JSON.stringify(req.body)


var key = JSON.stringify(req.body) ;


myCache.get( key, function( err, value ){

  if( !err ){
    if(value == undefined){
      var data = search(req,res);

myCache.set( key , data , function( err, success ){
    res.json(data.out)
});


    }else{
      res.json(value.out)
    }
  }
});





	
};


function ttest(key, statisics){
var n1 = home[key + '_count']
var n2 = statisics[key + '_count']
if(!n1 || !n2){
	return 1;
}

var mean1 = home[key +'_mean'];
var mean2 = statisics[key +'_mean'];
var variance1 =  home[key +'_var']/ (n1 -1) ;
var variance2 = statisics[key + '_var'] / (n2 - 1)
var pooledVar = (((n1 -1 )*variance1) + ((n2-1 )* variance2))/(n1 + n2 -2)
var t = (mean1 - mean2)/( Math.sqrt(pooledVar)*(Math.sqrt(1/n1 + 1/n2)) )

console.log(jStat.studentt.pdf(t, n1 + n2 -2))

return jStat.studentt.pdf(t, n1 + n2 -2);
}

exports.tester = function (req, res){

var key = JSON.stringify(req.body) ;

	myCache.get( key, function( err, value ){

		 if( !err ){

		 	 if(value == undefined){
		 	 	// Might chagne to re runing query if faster
		 	 	var key = JSON.stringify(req.body.key) ;

		 	 	myCache.get( key, function( err, value2 ){
		 	 		var statisics = value2.out.meta_data;
		 	 		var out = Object.keys(home_meta).reduce(function (ob, item ){
            ob[home_meta[item]] = ttest(home_meta[item], statisics)
		 	 			return  ob;
		 	 		}, {})

		 	 		var key = JSON.stringify(req.body) ;

		 	 		myCache.set( key , out , function( err, success ){
					    res.json(out)
					});

		 	 	})

		 	 } else {

		 	 	res.json(value)

		 	 }


		 }

	})

}


function searchForDownload(data){



var customTag = data.customTag;
var filters = (data.filter);
var data;

    function createFilterFor(query) {
      var lowercaseQuery = (query.toLowerCase());
      return function filterFn(d) {
        return ( (d.description.toLowerCase()).indexOf(lowercaseQuery) === 0);
      };
    }


if(data.query.length){
data = main.filter( createFilterFor(data.query + '') ) ;
}



if(Object.keys(filters).length && !data.query.length){
data = main.filter(function (d){
  return Object.keys(filters).every(function (i){
    var item = filters[i];
    return item.key == d[item.type];
  })
})
} else if(Object.keys(filters).length ){
  data = data.filter(function (d){
  return Object.keys(filters).every(function (i){
    var item = filters[i];
    return item.key == d[item.type];
  })
})
} 



if(data && customTag.length){

  data = data.filter(function (item){
    var low = item.description.toLowerCase()
    return customTag.every(function (tag){
      return low.indexOf(tag.toLowerCase()) != -1 ; 
    })
  })
} else if (customTag.length){

    data = main.filter(function (item){
    var low = item.description.toLowerCase()
    return customTag.every(function (tag){
      return low.indexOf(tag.toLowerCase()) != -1 ; 
    })
  })
}



var raw = [];

if(data.length){


var total = 0;
var toke = data.reduce(function (meta_data, d ){
    meta_data[d.ministry] = (meta_data[d.ministry]+= d.amount) || d.amount ; 
    total = total += d.amount
    meta_data[d.category]  = (meta_data[d.category]+= d.amount) || d.amount ; 
    meta_data[d.type] = (meta_data[d.type]+= d.amount) || d.amount ; 
    meta_data[d.year] = (meta_data[d.year]+= d.amount) || d.amount ; 
    meta_data[d.month]  = (meta_data[d.month]+= d.amount) || d.amount ; 
    meta_data[d.urlcode]  = (meta_data[d.urlcode]+= d.amount) || d.amount ;

    // COUNTS
    meta_data[d.ministry+ '_count'] = (meta_data[d.ministry+ '_count']+= 1) || 1 ; 
    meta_data[d.category+ '_count'] = (meta_data[d.category+ '_count']+= 1) || 1 ; 
    meta_data[d.type+ '_count'] = (meta_data[d.type+ '_count']+= 1) || 1 ; 
        meta_data[d.year+ '_count'] = (meta_data[d.year+ '_count']+= 1) || 1 ; 
    meta_data[d.month+ '_count'] = (meta_data[d.month+ '_count']+= 1) || 1 ; 
    meta_data[d.urlcode+ '_count'] = (meta_data[d.urlcode+ '_count']+= 1) || 1 ;
    return meta_data; 
  },{}) 


home_meta.forEach(function (item ){
 toke[ item +'_mean' ] = toke[item] / toke[item + '_count']
 toke[ item +'_mean' ] = toke[ item +'_mean' ] ? toke[ item +'_mean' ] : 0
})

     data.forEach(function ( d ){

    toke[d.ministry+'_var'] = (toke[d.ministry+'_var']+=1) || getSS(d.amount, toke[d.ministry+ '_mean']); 
    // total = total += d.amount
    toke[d.category+'_var']   = (toke[d.category+'_var'] += getSS(d.amount, toke[d.category+ '_mean'])) || getSS(d.amount, toke[d.category+ '_mean']) ; 
    toke[d.type+'_var']  = (toke[d.type+'_var'] += getSS(d.amount, toke[d.type+ '_mean'])) || getSS(d.amount, toke[d.type+ '_mean']) ; 
        toke[d.year+'_var']  = (toke[d.year+'_var'] += getSS(d.amount, toke[d.year+ '_mean'])) || getSS(d.amount, toke[d.year+ '_mean']) ; 
    toke[d.month+'_var']   = (toke[d.month+'_var'] += getSS(d.amount, toke[d.month+ '_mean'])) || getSS(d.amount, toke[d.month+ '_mean']) ; 
    toke[d.urlcode+'_var']   = (toke[d.urlcode+'_var'] += getSS(d.amount, toke[d.urlcode+ '_mean'] )) || getSS(d.amount, toke[d.urlcode+ '_mean'] ) ;

})



toke['count'] = main.length;
toke['size'] = total;
toke['~size'] =5200240.240000344 - total; 

if(toke['~size'] < 1 ){
  toke['~size'] = 0 ;
}

var meta = toke ; 

for (var i in (home_meta) ){
  if(meta[home_meta[i]] === undefined ){
    meta[home_meta[i]] = 0; 
  }
}




return data

}

return  data


}



exports.getCurrent = function (req, res){


  var key = (last);


var fields = ['ministry','position','name','category','type','description','receipt','urlcode','amount','month', 'date', 'month']

   myCache.get( key, function( err, value ){
console.log(value.out.data)
          json2csv({ data: searchForDownload(JSON.parse(key)), fields: fields }, function(err, csv) {
        if (err) console.log(err);
        fs.writeFile('alberta.csv', csv, function(err) {
          if (err) throw err;
          res.download('alberta.csv')
        });
      });

  })



}






