function Message(from, to, body) {
	if(!from || !to || body == null ) throw new Error('requires parameters');

	this.from = from;
	this.to = to;
	this.body = body;
}

module.exports = Message;
