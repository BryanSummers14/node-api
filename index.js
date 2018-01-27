var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var config = require('./configs');

var app = express();

var uri = 'mongodb://'+config.username+':'+config.password+'@cluster0-shard-00-00-yoz5t.mongodb.net:27017,cluster0-shard-00-01-yoz5t.mongodb.net:27017,cluster0-shard-00-02-yoz5t.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

var dbPromise = mongoose.connect(uri, { useMongoClient: true });
dbPromise.then(function(db) {
});

var Book = require('./models/BookModel');
var User = require('./models/UserModel');

var userHandler = require('./controllers/userController');

var port = process.env.PORT || 3000;

var bookRouter = express.Router();
var authRouter = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')();
var authRouter = require('./routes/authRoutes')();

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

app.get('/', function(req, res) {
    res.json({ "helloWorld": "true" });
});

app.use('/api/books', bookRouter);
app.use('/api/auth', authRouter);

app.listen(port, function() {
    console.log('app running');
});