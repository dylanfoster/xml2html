var fs = require('fs'),
	util = require('util'),
	xml2js = require('xml2js'),
	path = require('path'),
	ejs = require('ejs');

exports.save = function(report, folder, callback){
	var tmpl = __dirname + '/report.html.ejs'; 		//ejs template to read from
	var parser = new xml2js.Parser(); 				//xml parser to read report.xml
	var extractedData = ''; 						//resets any already parsed data (for reusability)
	var testsuites = [];							//testsuites array
	var module = report.replace(/\.[^/.]+$/, "");	//testsuite name/filepath
	module = path.basename(module);					//testsuite name(w/o filepath, used to name the report)
	//console.log(module);


	fs.readFile(tmpl, function (err, data) {
    if (err) {
      throw err;
    }
    var tmpl = data.toString();

	fs.readFile(report, function(err, data){
		parser.parseString(data, function(err, result){

			/**
			  * Let's declare some variables
			 */

			extractedData = result['testsuites'];			//the xml data as JSON object, gives us all of the test suites
		var	testsuites = extractedData.testsuite,			//each testsuite
			totalTests = extractedData.$['tests'],			//total number of tests across all testsuites
			//console.log(totalTests);
			totalFailures = extractedData.$['failures'],	//total failures
			totalErrors = extractedData.$['errors'];		//total errors
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
					
					
						
							//for(var j in testsuites[i].testcase[x].failure)
							//console.log(testsuites[i].testcase[x].failure[j].$['message']);
						
						
					

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
			fs.writeFile(filename, rendered, callback);

			//console.log(testsuites[0].$['errors']);
			
		});
	});
});
};


/**
  * We need:
  * Test Module name (ie: singleVideoTests, twoVideoTests, etc) - done
  * Total number of tests 										- done
  * Total number of pass/fail 									- 
  * #Skipped 													- 
  * What failed (test name and why)								- 
  * screenshot of failure                                       - 
  * List of tests with pass/fail/no of tests etc 				- 
  * 
 */








