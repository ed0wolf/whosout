var assert = require('assert'),
    sinon = require('sinon');
var authentication = require('../../src/middleware/authentication');

describe('Authentication', function(){
	describe('when creating', function(){
		var auth;
		describe('without parameters', function(){
			it('should throw an error', function() {
				assert.throws(function(){
					auth = authentication();
				}, /requires parameters/);
			});
		});

		describe('successfully', function(){
			var userStore;
			var user = {username: 'bwillis'};
			var req, next;
			beforeEach(function(){
				userStore = {};
				next = sinon.spy();
				auth = authentication(userStore);
			});

			describe('and then calling it with userkey cookie in request', function(){
				beforeEach(function(){
					userStore.get = sinon.stub().returns(user);
					req = {	cookies: { userkey: 'some long key' } };
					auth(req, null, next);
				});

				it('should get userkey cookie from userStore', function(){
					assert(userStore.get.calledWith(req.cookies.userkey));
				});

				it('should set the returned user on the request', function(){
					assert.equal(req.user, user);
				});

				it('should call next', function(){
					assert(next.called);
				});
			});

			describe('and then call it it without a userkey cookie',function(){
				beforeEach(function(){
					userStore.get= sinon.stub().returns(null);
					req = {cookies: {}};
					auth(req, null, next);
				});

				it('should get the null userkey from the userStore', function(){
					assert(userStore.get.calledWith(undefined));
				});
				
				it('should set the null returned user on the reqeust', function(){
					assert.equal(req.user, null);
				});

				it('shouldcall next', function(){
					assert(next.called);
				});
			});
		});
	});
});
