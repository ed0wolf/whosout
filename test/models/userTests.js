var assert = require('assert');
var User = require('../../src/models/user');

describe('User', function() {
	describe('when creating new user', function(){
		var user;
		describe('without parameters', function(){
			it('should throw an error', function(){
				assert.throws(function(){
					var user = new User();
				}, /requires parameters/);
			});
		});

		describe('with username and email', function() {
			var username = 'jbloggs', email = 'jbloggs@whosout.com';
			beforeEach(function(){
				user = new User(username, email);
			});
			it('should set the user', function() {
				assert.equal(user.username, username);
			});

			it('should set the email', function(){
				assert.equal(user.email, email);
			});

			it('should set the inbox to an empty array', function(){
				assert.equal(Array.isArray(user.inbox), true);
				assert.equal(user.inbox.length, 0);
			});

			it('should set the outbox to an empty array', function() {
				assert.equal(Array.isArray(user.outbox), true);
				assert.equal(user.outbox.length, 0);
			});
		});
	});
});
