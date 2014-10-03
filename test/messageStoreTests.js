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
		beforeEach(function() {
			messageStore = new MessageStore();
			messageStore.add(message);
		});

		it('should have saved the message', function(){
			assert.equal(messageStore.messages.length, 1);
			assert.equal(messageStore.messages[0], message);
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
	});
});
