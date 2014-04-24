'use strict';
var reporter = require('./html.js');
module.exports = {
	"report" : function(){
		reporter('./singleVideoTest.xml', './');
		console.log('done');
		//done();
	}	
};