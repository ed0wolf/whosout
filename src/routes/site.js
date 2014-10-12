module.exports = function(messageStore){
	if(!messageStore) throw new Error('parameters required');

	var getMessages = function(username) {
		var messagesFromUser = messageStore.fromUser(username).map(function(message) { 
			message.sentByMe = true;
			return message; 
		});
		var messagesToUser = messageStore.toUser(username).map(function(message) { 
			message.sentByMe = false; 
			return message;
		});
		return messagesToUser.concat(messagesFromUser);
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
