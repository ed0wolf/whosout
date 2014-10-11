var assert = require('assert'),
	sinon = require('sinon');
var messagesRoute = require('../../src/routes/messages'),
	Message = require('../../src/models/message');

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
		var messageStore, req, res, end;
		beforeEach(function() {
			messageStore = {};
			messages = messagesRoute(messageStore);
			end = sinon.spy();
			res = {
				status: sinon.stub().returns({end: end})
			};
		});

		it('should return an object', function() {
			assert.equal(typeof messages, 'object');
		});

		describe('then calling areYouOut', function() {

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

		describe('then calling reply', function(){
			describe('without a user in the request', function() {
				beforeEach(function() {
					req = {};
					messages.reply(req, res);
				});

				it('should return status code 401', function() {
					assert(res.status.calledWith(401));
				});

				it('should call end on the response', function() {
					assert(end.called);
				});
			});

			describe('with a user in the request', function() {
				var username = 'floyd';
				beforeEach(function() {
					req = { 
						user: { username: username }, 
						body: { to: 'hamilton', hasAccepted: false },
						params: { toMessageId: 1234 }
					};
				});
				
				describe('but no toMessageId in the requset params', function() {
					beforeEach(function() {
						req.params.toMessageId = null;
						messages.reply(req, res);
					});

					it('should set the status code to 400', function() {
						assert(res.status.calledWith(400));
					});

					it('should call end', function() {
						assert(end.called);
					});
				});

				describe('but with no `to` in the body', function() {
					beforeEach(function() {
						req.body.to = null;
						messages.reply(req, res);
					});

					it('should set the status code to 400', function() {
						assert(res.status.calledWith(400));
					});

					it('should call end', function() {
						assert(end.called);
					});
				});

				describe('but with no `hasAccepted` in the body', function() {
					beforeEach(function () {
						req.body.hasAccepted = null;
						messages.reply(req, res);
					});

					it('should set the status code to 400', function() {
						assert(res.status.calledWith(400));
					});

					it('should call end', function() {
						assert(end.called);
					});
				});

				describe('but the toMessageId is not known', function() {
					describe('that does not exist', function() {
						beforeEach(function() {
							messageStore.getId = sinon.stub().returns(null);
							messages.reply(req, res);
						});

						it('should have called got correct message from messageStore', function() {
							assert(messageStore.getId.calledWith(req.params.toMessageId));
						});
						
						it('should return a 404', function() {
							assert(res.status.calledWith(404));
						});

						it('should call end', function() {
							assert(end.called);
						});
					});

					describe('with a toMessageId that is in the messageStore', function() {
						var originalMessage = new Message('bob', 'fred', 'some content');
						beforeEach(function() {
							messageStore.getId = sinon.stub().returns(originalMessage);
							messageStore.add = sinon.spy();
							res.redirect = sinon.spy();
							messages.reply(req, res);
						});

						it('should have got correct id from the messageStore', function() {
							assert(messageStore.getId.calledWith(req.params.toMessageId));
						});

						it('should add the expected message to the messageStore', function() {
							assert(messageStore.add.calledWithMatch(function(message){
								return message.from === req.user.username 
									&& message.to == req.body.to 
									&& message.body == req.body.hasAccepted;
							}));
						});

						it('should redirect to /', function() {
							assert(res.redirect.calledWith('/'));
						});
					});
				});
			});
		});
	});
});

