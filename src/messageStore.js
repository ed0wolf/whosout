var uuid = require('uuid');

var MessageStore = (function() {
	function MessageStore() {
		this.messages = [];
	}

	MessageStore.prototype.save = function(message) {
		return this.messages.push(message) - 1;
	};

	MessageStore.prototype.add = function(message) {
		message.threadId = uuid.v4();
		return this.save(message);
	};

	MessageStore.prototype.addReply = function(originalId, message) {
		message.threadId = originalId;
		return this.save(message);
	};

	//rename to getById
	MessageStore.prototype.getId = function(id) {
		return this.messages[id];
	};

	//rename to getByFromUser
	MessageStore.prototype.fromUser = function(username) {
		return this.messages.filter(function(message, index){
			message.id = index;
			return message.from === username;
		});
	};

	//rename to getByToUser
	MessageStore.prototype.toUser = function(username) {
		return this.messages.filter(function(message, index) {
			message.id = index;
			return message.to === username;
		});
	};

	//rename to getByThreadId
	MessageStore.prototype.threadsByUser = function(username) {
		var toReturn = []
		this.messages.forEach(function(message) {
			console.log(JSON.stringify(message));
			if(message.to == username) {
				toReturn.push([message]);
			}
		});
		return toReturn;
	};

	return MessageStore;
})();
module.exports = MessageStore;
