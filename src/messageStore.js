function MessageStore() {
	this.messages = [];
}

MessageStore.prototype.add = function(message) {
	return this.messages.push(message) - 1;
};

MessageStore.prototype.fromUser = function(username) {
	var toReturn = [];
	for(var i = 0; i < this.messages.length; i++){
		if(this.messages[i].from == username)
			toReturn.push(this.messages[i]);
	}
	return toReturn;
};

MessageStore.prototype.toUser = function(username) {
	var toReturn = [];
	this.messages.forEach(function(message){
		if(message.to == username) 
			toReturn.push(message);
	});
	return toReturn;
};

module.exports = MessageStore;
