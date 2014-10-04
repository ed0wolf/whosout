function MessageStore() {
	this.messages = [];
}

MessageStore.prototype.add = function(message) {
	return this.messages.push(message) - 1;
};

MessageStore.prototype.fromUser = function(from) {
	var toReturn = [];
	for(var i = 0; i < this.messages.length; i++){
		if(this.messages[i].from == from)
			toReturn.push(this.messages[i]);
	}
	return toReturn;
};

module.exports = MessageStore;
