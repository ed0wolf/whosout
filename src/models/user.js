function User(username, email) {
	if(!username || !email) throw new Error('requires parameters');

	this.username = username;
	this.email = email;
	this.inbox = [];
	this.outbox = [];
}

module.exports = User;
