var chai 	 = require('chai'),
	should	 = chai.should(),
	expect 	 = chai.expect,
	assert   = chai.assert,
	reporter = require('../html.js');

	describe('save', function(){

		it('should be a function', function(){
			expect(reporter.save).to.be.an('function');
		});

		var save = new reporter.save('./singleVideoTest.xml', './');
		
		describe('when called as a constructor', function(){
			it('should return an object', function(){
				expect(save).to.be.an('object');
			});

		});


	});