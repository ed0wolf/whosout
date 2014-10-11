var Message = require('../models/message');

module.exports = function(messageStore) {
	if(!messageStore)
		throw new Error('requires messageStore parameters');

	return {
		areYouOut: function(req, res) {
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
		},
		reply: function(req, res) {
			var body = req.body;
			if(!req.user) {
				res.status(401).end();
				return;
			}
			console.log(req.params);
			if(!req.params.originalMessageId) {
				res.status(400).end();
				return
			}
			var reply = new Message(req.user.username, body.to, body.hasAccepted, req.params.originalMessageId);
			var messageIndex = messageStore.add(reply);
			res.redirect('/');
		}
	};
};
