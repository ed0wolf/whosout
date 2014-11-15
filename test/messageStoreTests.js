var assert = require('assert'),
	sinon = require('sinon');
var uuid = require('uuid');
var MessageStore = require('../src/messageStore'),
    Message = require('../src/models/message');

describe('MessageStore', function(){
	var messageStore;
	describe('when creating', function(){
		messageStore = new MessageStore();

		it('should set the messages to an array with null as the only element', function() {
			assert.equal(Array.isArray(messageStore.messages), true);
			assert.equal(messageStore.messages.length, 0);
		});
	});

	describe('when adding new message', function() {
		var username = 'yoda';
		var message = { from: username, to: 'sith' };
		var addedIndex;
		var returnedMessages;
		beforeEach(function() {
			messageStore = new MessageStore();
			addedIndex = messageStore.add(message);
		});

		it('should have saved the message', function(){
			assert.equal(messageStore.messages.length, 1);
		});

		it('should have returned the index of the message', function(){
			assert.equal(messageStore.messages[addedIndex], message);
		});

		it('should have added a thread id to it', function() {
			assert(message.threadId);
		});

		describe('then getting the messages from a user', function(){
			describe('who has no messages', function(){
				beforeEach(function(){
					returnedMessages = messageStore.fromUser('non-existant-user');
				});

				it('should return an empty array', function(){
					assert.equal(Array.isArray(returnedMessages), true);
					assert.equal(returnedMessages.length, 0);
				});
			});

			describe('who has messages', function(){
				beforeEach(function() {
					messageStore.add({from: 'not-yoda'});
					returnedMessages = messageStore.fromUser(message.from);
				});

				it('should returned an array', function(){
					assert.equal(Array.isArray(returnedMessages), true);
				});

				it('should only return the correct message', function(){
					assert.equal(returnedMessages.length, 1);
					assert.equal(returnedMessages[0], message);
				});	
			});
		
		});

		describe('then getting the messages to a user', function() {
			beforeEach(function(){
				messageStore.add({to: username});
				messageStore.add({to: username});
				messageStore.add({to: 'not'+username});
				returnedMessages = messageStore.toUser(username);
			});

			it('should only return the messages to the correct user', function(){
				assert.equal(returnedMessages.length, 2);
				returnedMessages.forEach(function(message){
					assert.equal(message.to, username);
				});
			});
		});

		describe('then getting message by Id', function() {
			var returnedMessage;
			describe('that does not exist', function(){
				beforeEach(function() {
					returnedMessage = messageStore.getId(9999);
				});

				it('should return null', function() {
					assert.equal(returnedMessage, null);
				});
			});

			describe('the does exist', function() {
				var message = {something: true};
				beforeEach(function() {
					var id = messageStore.add(message);
					returnedMessage = messageStore.getId(id);
				});

				it('should returned the added message', function() {
					assert.equal(returnedMessage, message);
				});
			});
		});

		describe('then adding reply to a thread', function() {
			var reply, replyIndex;
			beforeEach(function() {
				reply = new Message('bruce', 'bill', 'blah blah');
				replyIndex = messageStore.addReply(message.threadId, reply);
			});

			it('should have saved the saved added the original index to the new message', function() {
				assert.equal(reply.threadId, message.threadId);
			});

			it('should have returned the correct index', function() {
				assert.equal(messageStore.messages[replyIndex], reply);
			});
		});

		describe('then getting threads by user', function() {
			var username = 'bruce', another = 'someoneelse';
			var fromThread = {
				first: new Message(username, another, 'blah blah'),
				reply: new Message(username, 'yet another user', 'more blah') 
			};
			var toThread = {
				first: new Message(another, username, 'blah blah'),
				reply: new Message('yet another user', username, 'more blah') 
			};
			var anotherThread = {
				first: new Message('diff user', 'another diff user', 'blady blah'),
				reply: new Message('diff user', 'another diff user', 'blady yep'),
			};
			var threads;

			beforeEach(function() {
				var fromMessageId = messageStore.add(fromThread.first);
				var fromReply = messageStore.addReply(fromMessageId, fromThread.reply);
				
				var toMessageId = messageStore.add(toThread.first);
				var toReply = messageStore.addReply(toMessageId, toThread.reply);
				
				var anotherMessageId = messageStore.add(anotherThread.first);
				var anotherReply = messageStore.addReply(anotherMessageId, anotherThread.reply);
				threads = messageStore.threadsByUser(username);
			});

			it('should only return the threads relavant to that user', function() {
				assert.equal(threads.length, 2);
			});

			it('should return threads with messages sent from the user', function(){
				assert.equal(JSON.stringify(threads[0]), JSON.stringify([fromThread.reply, fromThread.reply]));
			});
			
			it('should return threads with messages sent to the user', function(){
				assert.equal(JSON.stringify(threads[1]), JSON.stringify([toThread.reply, toThread.reply]));
			});
		});
	});
});
