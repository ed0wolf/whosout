
function UserStore() {
	this.users = {};
}

UserStore.prototype.add = function (username, user) {
	if(!username || username in this.users) {
		return false;
	}
	this.users[username] = user;
	return true;
};

UserStore.prototype.get = function (username) {
	return this.users[username];
};

module.exports = UserStore;
