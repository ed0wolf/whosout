var assert = require('assert'),
	sinon = require('sinon');
var loginRoutes = require('../../src/routes/login');

describe('login routes', function() {
	var login;
	describe('when creating with no parameters', function() {
		it('should throw an error saying it requires parameters', function() {
			assert.throws(function() {
				login = loginRoutes();
			}, /requires userStore parameter/);
		});
	});

	describe('when creating with userStore', function() {
		var userStore;
		beforeEach(function() {
			userStore = {};
			login = loginRoutes(userStore);
		});

		it('should return an object', function() {
			assert.equal(typeof login, 'object');
		});

		describe('then calling index', function() {
			var res;
			beforeEach(function() {
				res = {
					render: sinon.spy()
				};
				login.index(null, res);
			});

			it('should call render on res', function() {
				assert(res.render.calledWith('login', {}));
			});
		});

		describe('then calling login', function(){
			var req, res;
			describe('without a username', function() {
				var endSpy;
				beforeEach(function() {
					req = {
						body: {}
					};
					endSpy = sinon.spy();
					res = {
						status: sinon.stub().returns({end: endSpy})
					};
					login.login(req, res);
				});
				
				it('should set status to 400', function() {
					assert(res.status.calledWith(400));
				});

				it('should have called end', function() {
					assert(endSpy.called);
				});
			});

			describe('with username in the body', function() {
				var userkey = 'some long key',
					username = 'jsmith';
				beforeEach(function() {
					userStore.add = sinon.stub().returns(userkey);
					req = { body: {username: username} };
					res = {
						cookie: sinon.spy(),
						redirect: sinon.spy()
					};

					login.login(req, res);
				});

				it('should have called the userStore correctly', function() {
					assert(userStore.add.calledWith({username: username}));
				});

				it('should have set the cookie', function() {
					assert(res.cookie.calledWith('userkey', userkey, {httpOnly: true}));
				});

				it('should have redirected to /', function(){
					assert(res.redirect.calledWith('/'));
				});
			});
		});
	});
});
