var express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    hbs = require('hbs'),
    authentication = require('./middleware/authentication'),
    UserStore = require('./userStore'),
    MessageStore = require('./messageStore');

var userStore = new UserStore(),
    messageStore = new MessageStore();

var site = require('./routes/site')(messageStore),
    messages = require('./routes/messages')(messageStore),
    monitor = require('./routes/monitor'),
    login = require('./routes/login')(userStore);

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authentication(userStore));

//Templating
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

var blocks = {};
hbs.registerHelper('extend', function(name, context) {
	var block = blocks[name];
	if (!block) {
		block = blocks[name] = [];
	}
	block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});
hbs.registerHelper('block', function(name) {
	var val = (blocks[name] || []).join('\n');
	// clear the block
	blocks[name] = [];
	return val;
});

//Routes
app.get('/', site.index);

app.get('/login', login.index);
app.post('/login', login.login);

app.get('/monitor', monitor.monitor);

app.post('/message/areyouout', messages.areYouOut);

//Start Server
var server = app.listen(3000, function(){ 
	console.log('listening on port %d', server.address().port);
});
