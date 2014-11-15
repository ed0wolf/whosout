var assert = require('assert'),
	sinon = require('sinon');
var siteRoute = require('../../src/routes/site');

describe('site routes', function() {
	describe('when creating without any parameters', function() {
		it('should throw an error', function() {
			assert.throws(function() {
				siteRoute();
			}, /parameters required/);
		});
	});

	describe('when creating successfully', function() {
		var messageStore, site;
		before(function() {
			messageStore = {};
			site = siteRoute(messageStore);
		});

		describe('and then calling index without user in the request', function() {
			var res, end;
			beforeEach(function() {
				end = sinon.spy();
				res = {
					redirect: sinon.spy()
				};
				site.index({}, res);
			});

			it('should redirect to the login page', function() {
				assert(res.redirect.calledWith('/login'));
			});
		});

		describe('and then calling index with user in the request', function() {
			var req, res,
				username = 'bspring',
				threads = [{to: username}, {from: username}];

			beforeEach(function() {
				messageStore.threadsByUser = sinon.stub().returns(threads);
				req = { user: { username: username } };
				res = { render: sinon.spy() };
				site.index(req, res);
			});

			it('should get threads by user' ,function() {
				assert(messageStore.threadsByUser.calledWith(username));
			});

			it('should call render the response as expected', function() {
				assert(res.render.calledWithMatch('index', function(obj) {
					return obj.username === username
						&& JSON.stringify(obj.threads) == JSON.stringify(threads)
						&& JSON.stringify(obj.users) == JSON.stringify(['', 'bill', 'tim', 'bob']); 
				}));
			});
		});
	});
});
