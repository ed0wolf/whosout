var assert = require('assert');
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
	});
});
