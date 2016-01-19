/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';
var jStat = require('jStat').jStat;
var _ = require('underscore')
var csv = require("fast-csv");
var NodeCache = require( "node-cache" );
var myCache = new NodeCache();
var json2csv = require('json2csv');
var fs = require('fs')
var last = ''

var main = [];
    csv
 .fromPath(__dirname + "/clean_alberta.csv" )
 .on("data", function(data){
     if (data[5] != 'year'){


    main.push({
    year: data[5], // convert "Year" column to Date
    address: data[6],
    medium: data[1],
    title: data[2],
    status: data[4],
    category: data[3],
    dept : data[0]
       })


     }
 } ).on("end",function (){
myCache.set( JSON.stringify({"query":"","filter":{},"customTag":[]}) , {out:getHome() , raw: _.first(main, 20 )} , function( err, success ){
});

 })

var home_meta = [ '200',
  '404',
  '2012',
  '2013',
  '2014',
  'culture_people',
  'Online',
  'education_tech',
  'economics_finnace',
  'Online and Print',
  'law_order',
  'Print',
  'energy_transportation',
  'environment',
  'government',
  'health',
  'labor',
  'DVD',
  'CD-ROM',
  'Flash Drive',
  'Online and CD-ROM',
  '',
  'Print and Flash Drive',
  'size',
  '~size' ]

function getHome(){
var meta = main.reduce(function (meta_data, d  ){
        meta_data[d.year] = (meta_data[d.year]+= 1) || 1 ; 
        meta_data[d.status] = (meta_data[d.status]+=1) || 1 ; 
        meta_data[d.category] = (meta_data[d.category]+=1) || 1;
        meta_data[d.medium] = (meta_data[d.medium]+=1) || 1;
        return meta_data
}, {})
meta['size'] = main.length ;
meta['~size'] = main.length - meta['size'];


var data = _.first(main, 30) ;
return {meta_data: meta, data: data}; 
}



// Get list of things
exports.index = function(req, res) {
  res.json([
  {
  name : 'Development Tools',
  info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
  name : 'Server and Client integration',
  info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
  name : 'Smart Build System',
  info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
  name : 'Modular Structure',
  info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
  name : 'Optimized Build',
  info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
  name : 'Deployment Ready',
  info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  }
  ]);
};
 


exports.query = function(req, res) {
var key = JSON.stringify(req.body) ;
last = JSON.stringify(req.body)

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




function search(req, res){

var customTag = req.body.customTag;
var filters = (req.body.filter);
var data;
    function createFilterFor(query) {
      var lowercaseQuery = (query.toLowerCase());
      return function filterFn(d) {
        return ( (d.title.toLowerCase()).indexOf(lowercaseQuery) === 0);
      };
    }

if(req.body.query.length){
data = main.filter( createFilterFor(req.body.query + '') ) ;
}
///
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
    var low = item.title.toLowerCase()
    return customTag.every(function (tag){
      return low.indexOf(tag.toLowerCase()) != -1 ; 
    })
  })
} else if (customTag.length){

    data = main.filter(function (item){
    var low = item.title.toLowerCase()
    return customTag.every(function (tag){
      return low.indexOf(tag.toLowerCase()) != -1 ; 
    })
  })


}


var raw;

if(data){

raw = data

var meta = data.reduce(function (meta_data, d  ){
        meta_data[d.year] = (meta_data[d.year]+= 1) || 1 ; 
        meta_data[d.status] = (meta_data[d.status]+=1) || 1 ; 
        meta_data[d.category] = (meta_data[d.category]+=1) || 1;
        meta_data[d.medium] = (meta_data[d.medium]+=1) || 1;
        return meta_data
}, {})
meta['size'] = data.length ;
meta['~size'] = 4181 - meta['size'] ;

for (var i in (home_meta) ){
  if(meta[home_meta[i]] === undefined ){
    meta[home_meta[i]] = 0; 
  }
}

if(data.length > 50 ){
data = _.first(data, 20) 
} else {
data = _.first(data, 20) 
}


}


  return { raw: raw || false , out:{data : data || 200, meta_data: meta}};





}


function sum(matrix){
  if (typeof matrix == 'number'){
    return matrix
  }
return sum(jStat(matrix).sum())
}


function getMatrix(body, queryCache){

  var row_keys = body.rows.data;
  var col_keys = body.cols.data;
  var row_type = body.rows.type;
  var col_type = body.cols.type;


  var sumOb = {};
     queryCache.forEach(function (item ){
 
        if(col_keys.indexOf(item[col_type]) !== -1 ){

          row_keys.forEach(function (filter){
            if (item[row_type] == filter){

            sumOb[item[col_type] + filter] = (sumOb[item[col_type] + filter] += 1) || 1;
          }
          })

          return sumOb;
        }

      })

     var out = [];
     for (var i in col_keys){
      var temp = [];
      for (var j in row_keys){
        if(sumOb[col_keys[i] + row_keys[j]] !== undefined ){
        temp.push(sumOb[col_keys[i] + row_keys[j]] || 0)
      }
      }
      out.push(temp)
     }

     out = out.filter(function(item){
      return item.length;
     })

     out = jStat(out); 

     return jStat.transpose( out )


} 

exports.getSig = function(req, res) {


var key = JSON.stringify(req.body) ;
// send high pval for home data
if ( JSON.stringify({"query":"","filter":{},"customTag":[]}) === key){
  res.json({data : 1 ,  matrix: []})
} else {

myCache.get( key, function( err, value ){

  if( !err ){
    if(value == undefined){
    var key = JSON.stringify(req.body.key) ;
    myCache.get( key, function( err, value2 ){

    var body = req.body ; 

    var matrix = (getMatrix(body, value2.raw ))

    var N = sum(matrix)

    var test_stat = 0;

    for (var i = 0 ; i < jStat(matrix).rows() ; i++){
      for( var j = 0; j < jStat(matrix).cols(); j++ ){
       var expected = ((sum(jStat(matrix).row(i)) * sum(jStat(matrix).col(j)))/ N);

       if(expected){
       var ts = (Math.pow((matrix[i][j] - expected),2)/expected)
     } else {
      var ts = 0;
     }
       test_stat = test_stat + ts;
      }
    }


    var df = (jStat(matrix).rows() - 1) * (jStat(matrix).cols())

    var p_val = (jStat.chisquare.pdf( test_stat, df ))
    myCache.set( JSON.stringify(req.body)  ,{data : p_val ,  matrix: matrix} , function( err, success ){
      res.json({data : p_val ,  matrix: matrix})
    });
   


    })  

      }else {
      res.json(value)
      }
}
})

}
}

function searchForDownload(data){
 

var customTag = data.customTag;
var filters = (data.filter);
var data;



    function createFilterFor(query) {
      var lowercaseQuery = (query.toLowerCase());
      return function filterFn(d) {
        return ( (d.title.toLowerCase()).indexOf(lowercaseQuery) === 0);
      };
    }

if(data.query.length){
data = main.filter( createFilterFor(data.query + '') ) ;
}
///
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
    var low = item.title.toLowerCase()
    return customTag.every(function (tag){
      return low.indexOf(tag.toLowerCase()) != -1 ; 
    })
  })
} else if (customTag.length){

    data = main.filter(function (item){
    var low = item.title.toLowerCase()
    return customTag.every(function (tag){
      return low.indexOf(tag.toLowerCase()) != -1 ; 
    })
  })


}


var raw;

if(data){

raw = data

var meta = data.reduce(function (meta_data, d  ){
        meta_data[d.year] = (meta_data[d.year]+= 1) || 1 ; 
        meta_data[d.status] = (meta_data[d.status]+=1) || 1 ; 
        meta_data[d.category] = (meta_data[d.category]+=1) || 1;
        meta_data[d.medium] = (meta_data[d.medium]+=1) || 1;
        return meta_data
}, {})
meta['size'] = data.length ;
meta['~size'] = 4181 - meta['size'] ;

for (var i in (home_meta) ){
  if(meta[home_meta[i]] === undefined ){
    meta[home_meta[i]] = 0; 
  }
}

// if(data.length > 50 ){
// data = _.first(data, 20) 
// } else {
// data = _.first(data, 20) 
// }


}


  return data 






}




exports.getCurrent = function (req, res){


  var key = (last);



var fields = ['year','address','medium','title','status','category','dept']

   myCache.get( key, function( err, value ){

          json2csv({ data: searchForDownload(JSON.parse(key)), fields: fields }, function(err, csv) {
        if (err) console.log(err);
        fs.writeFile('alberta.csv', csv, function(err) {
          if (err) throw err;
          res.download('alberta.csv')
        });
      });

  })



}






