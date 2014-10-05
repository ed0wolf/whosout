module.exports = function(messageStore){
	return {
		index: function(req, res){
			if(!req.user) {
				res.redirect('/login');
				return;
			}
			console.log(req.user);
			var username = req.user.username;
			res.render('index', {
				username: username,
				messages: {
					to: messageStore.toUser(username),
					from: messageStore.fromUser(username)
				}
			});
		}
	};
};
