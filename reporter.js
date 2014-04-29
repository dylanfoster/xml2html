'use strict';
var reporter = require('./html.js').save;
module.exports = {
	"save the file" : function(){
		return reporter('./singleVideoTest.xml', './');

	}
};