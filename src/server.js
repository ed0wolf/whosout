var express = require('express');
var app = express();

var messageStore = require('./messageStore');

app.get('/monitor', function(req, res) {
	res.status(200).end();
});

app.get('/requests/:username', function(req, res) {
	//user's key will be passed as a header
	var userKey = 'blah';
	var requests = requestStore.get(userKey);
	if(requests == null) {
		res.status(404).end();
		return;
	}
	res.send(user);
});

app.post('/requests', function(req, res) {
	var request = {
		question: 'You out tonight?',
		to: 'joebloggs'
	};
	var userKey = 'blah';
	if(!requestStore.add(userKey, request)){
		res.status(400).end();
		return;
	}
	res.status(201).end();
});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
