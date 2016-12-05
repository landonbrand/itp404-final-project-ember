var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var http = require('http');

var util = require('util');
var session = require('express-session');
var methodOverride = require('method-override');
mongoose.connect('mongodb://192.241.235.59/pagedb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected to the database!");
  // console.log(db);
});

var pageSchema = new mongoose.Schema({
  name: String,
  html: String,
  css: String
});

pageSchema.plugin(findOrCreate);
var PageModel = mongoose.model('Page', pageSchema);

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

app.use(bodyParser.text({type:"*/*"}));

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
