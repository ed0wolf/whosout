module.exports = function authentication(userStore) {
	if(!userStore) throw new Error('requires parameters');
	return function(req, res, next) {
		req.user = userStore.get(req.cookies.userkey);
		next();
	};
};
