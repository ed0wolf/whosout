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
				messagesToUser = [{blah: 'blah'}, {bloo: 'bloo'}],
				messagesFromUser = [{soup: 'soup'}, {melon: 'melon'}];

			beforeEach(function() {
				messageStore.toUser = sinon.stub().returns(messagesToUser);
				messageStore.fromUser = sinon.stub().returns(messagesFromUser);
				req = { user: { username: username } };
				res = { render: sinon.spy() };
				site.index(req, res);
			});

			it('should get messages from user' ,function() {
				assert(messageStore.fromUser.calledWith(username));
			});

			it('should get messages to user' ,function() {
				assert(messageStore.toUser.calledWith(username));
			});

			it('should call render the response as expected', function() {
				assert(res.render.calledWithMatch('index', function(obj) {
					var createExpectedMessagesArr = function() {
						messagesToUser.forEach(function(message) { message.sentByMe = false; });
						messagesFromUser.forEach(function(message) { message.sentByMe = true; });
						return messagesToUser.concat(messagesFromUser);
					};
					return obj.username === username
						&& JSON.stringify(obj.messages) == JSON.stringify(createExpectedMessagesArr())
						&& JSON.stringify(obj.users) == JSON.stringify(['', 'bill', 'tim', 'bob']); 
				}));
			});
		});
	});
});
