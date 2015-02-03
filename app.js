var express = require('express');
var mongoose = require('mongoose');
var auth = require("./utils/auth");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

mongoose.connect(process.env.MONGODB || 'mongodb://localhost/blog');

require("./models");

var errorHandler = require("./utils/error").errorHandler;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(auth.authorize);

app.use('/api/users', require("./routes/users"));
app.use('/api/posts', require("./routes/posts"));
app.use('/api/comments', require("./routes/comments"));

app.use(errorHandler);

app.use(express.static(__dirname + '/client/public'));

app.use(function(req, res) {
    res.sendFile(__dirname + '/client/public/404.html')
});

var port = process.env.PORT || '3000';

app.listen(port);