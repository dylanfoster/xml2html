var chai 	 = require('chai'),
	should	 = chai.should(),
	expect 	 = chai.expect,
	assert   = chai.assert,
	reporter = require('../html.js');

	describe('save', function(){

		it('should be a function', function(){
			expect(reporter.save).to.be.an('function');
		});

		save = new reporter.save('./singleVideoTest.xml', './');
		
		describe('when called as a constructor', function(){
			it('should return an object', function(){
				
			});
			it('can be called', function(){
				
			});

		});


	});