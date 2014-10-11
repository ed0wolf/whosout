var assert = require('assert'),
	sinon = require('sinon');
var messagesRoute = require('../../src/routes/messages');

describe('messages routes', function() {
	var messages, 
		from = 'fastaire', 
		to = 'bforsyth';

	describe('when creating with no parameters', function() {
		it('should throw an error', function() {
			assert.throws(function() {
				messages = messagesRoute();
			}, /requires messageStore parameters/);
		});
	});

	describe('when creating', function() {
		var messageStore;
		beforeEach(function() {
			messageStore = {};
			messages = messagesRoute(messageStore);
		});

		it('should return an object', function() {
			assert.equal(typeof messages, 'object');
		});

		describe('then calling areYouOut', function() {
			var req, res, end;
			beforeEach(function() {
				end = sinon.spy();
				res = {
					status: sinon.stub().returns({end: end})
				};
			});

			describe('without a user', function() {
				beforeEach(function() {
					req = {};
					messages.areYouOut(req, res);
				});

				it('should return a 401 status', function() {
					assert(res.status.calledWith(401));
				});

				it('should call end', function() {
					assert(end.called);
				});
			});

			describe('with user', function(){
				beforeEach(function() {
					req = { 
						body: {},
						user: { username: from }
					};
					messages.areYouOut(req, res);
				});

				describe('and empty body', function() {
					beforeEach(function() {
						messages.areYouOut(req, res);
					});	

					it('should have returned a status of 400', function() {
						assert(res.status.calledWith(400));
					});

					it('should have called end', function() {
						assert(end.called);
					});
				});

				describe('and a to user in the body', function() {
					var addedUserIndex = 1234;
					beforeEach(function() {
						req.body.to = to;
						messageStore.add = sinon.stub().returns(addedUserIndex);
						res.redirect = sinon.spy();
						messages.areYouOut(req, res);
					});
					
					it('should add message to messageStore', function() {
						assert(messageStore.add.calledWithMatch(function(value){
							return value.from === from && value.to == to;
						}));
					});

					it('should redirect response to /', function() {
						assert(res.redirect.calledWith('/'));
					});
	
				});

		
			});
		});
	});
});

