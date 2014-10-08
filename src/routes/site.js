module.exports = function(messageStore){
	return {
		index: function(req, res){
			if(!req.user) {
				res.redirect('/login');
				return;
			}
			var username = req.user.username;
			res.render('index', {
				username: username,
				messages:  messageStore.toUser(username).concat(messageStore.fromUser(username))
			});
		}
	};
};
