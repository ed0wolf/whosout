var assert = require('assert');
var MessageStore = require('../src/messageStore');

describe('MessageStore', function(){
	var messageStore;
	describe('when creating', function(){
		messageStore = new MessageStore();

		it('should se the messages to an empty array', function() {
			assert.equal(Array.isArray(messageStore.messages), true);
			assert.equal(messageStore.messages.length, 0);
		});
	});

	describe('when adding new message', function() {
		var message = { from: 'yoda', to: 'sith' };
		var addedIndex;
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
			var returnedMessages;
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

		describe('then getting the messages to a user', function() {
			var username = 'yoda';
			var returnedMessages;
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
	});
});
