var express = require('express');
var bodyParser = require('body-parser');
var db = require('./model/db');
var account = require('./model/accounts');
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var http = require('http');

var passport = require('passport');
var util = require('util');
var session = require('express-session');
var methodOverride = require('method-override');
var GitHubStrategy = require('passport-github2').Strategy;
mongoose.connect('mongodb://192.241.235.59/pagedb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected to the database!");
});

var userSchema = new mongoose.Schema({
  githubId: String,
  sites: [{
    name: String,
    data: {
      html: String,
      css: String
    }
  }]
});

userSchema.plugin(findOrCreate);
var UserModel = mongoose.model('User', userSchema);

var GITHUB_CLIENT_ID = "90c810f2ae9f6b8c1a9e";
var GITHUB_CLIENT_SECRET = "56acd69b369c551e85a624fd9b48249ff9bbfc85";

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
       res.send(200);
   } else {
       next();
   }
});

app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.text({type:"*/*"}));

var spoofHTML = {
  html: "<h1 id='title-block'>Title</h1><h2 class='big other red item'>subtitle</h2><p>Lorem Ipsum is simply dummy text of the printing and <a href='#'>typesetting industry</a>. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
  css: "p { font-family: times-new-roman }"
}

// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }
// app.use(allowCrossDomain);

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// config
passport.use(new GitHubStrategy({
    clientID: "90c810f2ae9f6b8c1a9e",
    clientSecret: "56acd69b369c551e85a624fd9b48249ff9bbfc85",
    callbackURL: "http://192.241.235.59:1111/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    UserModel.findOrCreate({ githubId: profile.username }, function (err, user) {
      console.log("findOrCreate running!");
      return done(err, user);
    });
  }
));


app.get('/api/spoofnodes', function (request, response) {
  response.json(spoofNodes);
});
app.get('/api/spoofhtml', function (request, response) {
  response.json(spoofHTML);
});

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.json(req.user);
  });

app.get("/page", function(req, res){
  res.send({});
});

app.get("/failed", function(req, res){
  res.send({});
});

app.post('/api/saveTest', function (req, res) {
  console.log("\n\n\n");
  // console.log(spoofNodes);
  console.log("\n\n");
  console.log("Request Body", req.body);
  spoofHTML = JSON.parse(req.body);
  console.log("\n\n");
  console.log(spoofHTML);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
      body: req.body || null
  }));
});

app.get('/api/users', function(request, response) {
  mongoose.model('User').find({}, function (err, blobs) {
    if (err) {
      return console.error(err);
    } else {
      console.log(blobs);
    }
  });
});

app.listen(1111, function () {
  console.log('Pages listening on port 1111!');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}
