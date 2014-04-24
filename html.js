var fs = require('fs'),
	util = require('util'),
	xml2js = require('xml2js'),
	path = require('path'),
	ejs = require('ejs');

exports.save = function(report, folder, callback){
	var tmpl = __dirname + '/report.html.ejs';
	var parser = new xml2js.Parser(); 				
	var extractedData = ''; 						
	var testsuites = [];							
	var module = report.replace(/\.[^/.]+$/, "");	
	module = path.basename(module);					
	//console.log(module);


	fs.readFile(tmpl, function (err, data) {
    if (err) {
      throw err;
    }
    var tmpl = data.toString();

	fs.readFile(report, function(err, data){
		parser.parseString(data, function(err, result){


			extractedData = result['testsuites'];
		var	testsuites = extractedData.testsuite,
			totalTests = extractedData.$['tests'],
			//console.log(totalTests);
			totalFailures = extractedData.$['failures'],
			totalErrors = extractedData.$['errors'];
			var totalSkipped = 0;
			var v;
			for(var i=0; i < testsuites.length; i++){
				

				var testName 		= testsuites[i].$['name'],
					testsNo  		= testsuites[i].$['tests'],
				 	skipped  		= testsuites[i].$['skipped'],
					failures 		= testsuites[i].$['failures'],
					errors   		= testsuites[i].$['errors'],
					failedCase		= testsuites[i].testcase,
					v 				= parseFloat(skipped),
					totalPass		= totalTests - totalSkipped - totalFailures;
					totalSkipped	+= v;		

			}
			var rendered = ejs.render(tmpl, {
				locals: {
					testsuites		: testsuites,
					module 			: module,
					testName 		: testName,
					testsNo			: testsNo,
					errors			: errors,
					failures 		: failures,
					totalTests 		: totalTests,
					totalFailures 	: totalFailures,
					totalErrors 	: totalErrors,
					totalPass 		: totalPass,
					totalSkipped	: totalSkipped			
				}
			});

			var filename = path.join(folder, module +'.html');
			fs.writeFile(filename, rendered, callback)
			
		});
	});
});
};








