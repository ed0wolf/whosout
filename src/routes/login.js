module.exports = function login(userStore){
	return {
		index: function(req, res){
			res.render('login', {});
		},
		login: function(req, res) {
			var body = req.body;
			if(!body.username){
				res.status(400).end();
				return;
			}
			var userkey = userStore.add({
				username: body.username,
			});
			res.cookie('userkey', userkey, {httpOnly: true});
			res.redirect('/');
		}
	};
};


