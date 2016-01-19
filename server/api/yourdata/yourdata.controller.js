'use strict';

var _ = require('lodash');
var json2csv = require('json2csv');
var fs = require('fs')
var NodeCache = require( "node-cache" );
var myCache = new NodeCache();


// Get list of yourdatas


exports.download = function (req, res){
	myCache.get( 'current', function( err, value ){
var fields = Object.keys(value[0])
          json2csv({ data: value, fields: fields }, function(err, csv) {
        if (err) console.log(err);
        fs.writeFile('your_alberta.csv', csv, function(err) {
          if (err) throw err;
          res.download('your_alberta.csv')
        });
      });

})
}




exports.save = function (req, res){



myCache.set( 'current', req.body.data , function( err, success ){
		res.send(200)
});


}