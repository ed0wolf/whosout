var assert = require('assert');
var Message = require('../../src/models/message');

describe('Message', function(){
	describe('when creating', function(){
		var message;
		describe('with only  2 parameters', function(){
			it('should throw an error', function(){
				assert.throws(function(){
					var m = new Message('', '');
				}, /requires parameters/);
			});
		});
		describe('with valid parameters', function(){
			var from = 'jblogs', to = 'wsmith', body = false;
			beforeEach(function() {
				message = new Message(from, to, body);
			});

			it('should set fields', function(){
				assert.equal(message.from, from);
				assert.equal(message.to, to);
				assert.equal(message.body, body);
			});
		});
	});
});
