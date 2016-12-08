var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var User = require('./model/user');
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

app.use(bodyParser.text({type:"*/*"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect({
  'database': 'mongodb://192.241.235.59'
});


var pageSchema = new mongoose.Schema({
  name: String,
  html: String,
  css: String
});

pageSchema.plugin(findOrCreate);
var PageModel = mongoose.model('Page', pageSchema);

app.get('/api/getuserspages', function(request, response) {
  User.findOne({ 'nickname' : request.query.nickname }, function(err, doc){
    if (err) return handleError(err);
    if (doc == null || doc == undefined){
      var newDoc = new User({ nickname: request.query.nickname });
      newDoc.pages = [];
      newDoc.save(function (err, updatedDoc) {
        if (err) return handleError(err);
        response.send(updatedDoc);
      });
    } else {
      User.findOne({'nickname' : request.query.nickname }, function(err, doc){
        response.json(doc);
      });
    }
  });
});

app.post('/api/adduserspage', function(request, response) {
  var bod = JSON.parse(request.body);
  User.findOne({ 'nickname' : bod.nickname }, function(err, doc){
    if (err) return handleError(err);
    if(doc.pages.indexOf(bod.page) > -1){
    } else {
      doc.pages.push(bod.page);
    }
    doc.save(function(err, updatedDoc) {
      response.json(doc);
    });
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
