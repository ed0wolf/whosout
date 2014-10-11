module.exports = function(messageStore){
	var getMessages = function(username) {
		return messageStore.toUser(username).concat(messageStore.fromUser(username)).map(function(message) {
			message.sentByMe = message.from === username;
			return message;
		});
	};

	return {
		index: function(req, res){
			if(!req.user) {
				res.redirect('/login');
				return;
			}
			var username = req.user.username;
			res.render('index', {
				username: username,
				messages: getMessages(username),
				users: ['', 'bill', 'tim', 'bob']
			});
		}
	};
};
