var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var http = require('http');

var morgan = require('morgan');
var passport = require('passport');
var config = require('./config/database');
var User = require('./model/user');
var jwt = require('jwt-simple');

var util = require('util');
var session = require('express-session');
var methodOverride = require('method-override');

var app = express();

var GITHUB_CLIENT_ID = "90c810f2ae9f6b8c1a9e";
var GITHUB_CLIENT_SECRET = "56acd69b369c551e85a624fd9b48249ff9bbfc85";


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

app.use(bodyParser.text({type:"*/*"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
mongoose.connect(config.database);

require('./config/passport')(passport);
app.use(passport.initialize());

app.get('/api/getuserspages', function(request, response) {
  var obj = {response: "got"};
  console.log("nickname: ", request.query.nickname, "\n");
  User.findOne({ 'nickname' : request.query.nickname }, function(err, doc){
    if (err) return handleError(err);
    if (doc == null || doc == undefined){
      console.log(request.query.nickname, "does not exist, making them now.");
      var newDoc = new User({ nickname: request.query.nickname });
      newDoc.pages = [];
      newDoc.save(function (err, updatedDoc) {
        if (err) return handleError(err);
        response.send(updatedDoc);
      });
    } else {
      console.log(request.query.nickname, "exists");
    }
  });
});

app.post('/api/adduserspage', function(request, response) {
  var obj = {response: "got"};
  console.log("nickname: ", request.query.nickname, "\n");
  User.findOne({ 'nickname' : request.query.nickname }, function(err, doc){
    if (err) return handleError(err);
    doc.pages.push(request.query.page);
    res.json(doc);
  });
});

app.get('/api/getpage', function (request, response) {
  var query = PageModel.findOne({ 'name' : request.query.name }, function(err, doc){
    if (err) return handleError(err);
    if(doc != null){
      response.json(doc);
    } else {
      doc = new PageModel({ name: request.query.name });
      doc.name = request.query.name;
      doc.html = "<h1>heading</h1>";
      doc.css = "";
      doc.save(function (err, updatedDoc) {
        if (err) return handleError(err);
        response.json(updatedDoc);
      });
    }
  });
});

app.post('/api/setpage', function (request, response) {
  var obj = JSON.parse(request.body);
  PageModel.findOne({ 'name' : obj.name }, function(err, doc){
    if (err) return handleError(err);
    if (doc == null){
      var newDoc = new PageModel({ name: request.query.name });
      newDoc.name = obj.name;
      newDoc.html = obj.html;
      newDoc.css = obj.css;
      newDoc.save(function (err, updatedDoc) {
        if (err) return handleError(err);
        response.send(updatedDoc);
      });
    } else {
      doc.name = obj.name;
      doc.html = obj.html;
      doc.css = obj.css;
      doc.save(function (err, updatedDoc) {
        if (err) return handleError(err);
        response.send(updatedDoc);
      });
    }
  });
});

app.listen(1111, function () {
  console.log('Pages listening on port 1111!');
});
