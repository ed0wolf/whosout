var Message = require('../models/message');

module.exports = function(messageStore){
	return {
		areYouOut: function(req, res){
			var body = req.body;
			if(!req.user) {
				res.status(401).end();
				return;
			}
			if(!body.to) {
				res.status(400).end();
				return;
			}
			var messageIndex = messageStore.add(new Message(req.user.username, body.to, 'Are you out?'));
			res.redirect('/');
		}
	};
};