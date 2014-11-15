module.exports = function(messageStore){
	if(!messageStore) throw new Error('parameters required');

	return {
		index: function(req, res){
			if(!req.user) {
				res.redirect('/login');
				return;
			}
			var username = req.user.username;
			res.render('index', {
				username: username,
				threads: messageStore.threadsByUser(username),
				users: ['', 'bill', 'tim', 'bob']
			});
		}
	};
};
