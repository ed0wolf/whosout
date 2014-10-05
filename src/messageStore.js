function MessageStore() {
	this.messages = [];
}

MessageStore.prototype.add = function(message) {
	return this.messages.push(message) - 1;
};

MessageStore.prototype.fromUser = function(username) {
	return this.messages.filter(function(message){
		return message.from === username;
	});
};

MessageStore.prototype.toUser = function(username) {
	return this.messages.filter(function(message) {
		return message.to === username;
	});
};

module.exports = MessageStore;
