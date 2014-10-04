var uuid = require('uuid');

function UserStore() {
	this.users = {};
}

UserStore.prototype.add = function (userInfo) {
	if(!userInfo || !userInfo.username) {
		return null;
	}
	var userkey = uuid.v4();
	this.users[userkey] = userInfo;
	return userkey;
};

UserStore.prototype.get = function (userkey) {
	return this.users[userkey];
};

module.exports = UserStore;
