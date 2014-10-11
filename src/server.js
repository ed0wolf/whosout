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
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authentication(userStore));

//Templating
require('./templating')(app);

//Routes
app.get('/', site.index);

app.get('/login', login.index);
app.post('/login', login.login);

app.get('/monitor', monitor);

app.post('/message/areyouout', messages.areYouOut);
app.post('/message/reply/:orignalMessageId', messages.reply);

//Start Server
var server = app.listen(3000, function(){ 
	console.log('listening on port %d', server.address().port);
});
