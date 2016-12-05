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

var spoofHTML = {
  html: "<h1 id='title-block'>Title</h1><h2 class='big other red item'>subtitle</h2><p>Lorem Ipsum is simply dummy text of the printing and <a href='#'>typesetting industry</a>. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
  css: "p { font-family: times-new-roman }"
}


app.get('/api/spoofnodes', function (request, response) {
  response.json(spoofNodes);
});
app.get('/api/spoofhtml', function (request, response) {
  response.json(spoofHTML);
});

app.get('/api/getpage', function (request, response) {
  console.log("Request Body", request.query);
  var document = PageModel.findOne({ 'name' : request.query.name }, function(err, doc){
    console.log("doc", doc);
    response.json(doc);
  });
});

app.post('/api/setpage', function (request, response) {
  console.log("Json body", JSON.parse(request.body), "\n\n");
  // var newPage = new PageModel(JSON.parse(request.body));
  var obj = JSON.parse(request.body);
  PageModel.findOne({ 'name' : request.query.name }, function(err, doc){
    if (err) return handleError(err);
    if (doc == null){
      var newDoc = new PageModel({ name: request.query.name });
      newDoc.save(function (err, updatedDoc) {
        if (err) return handleError(err);
        console.log("new updatedDoc", updatedDoc, "\n");
        res.send(updatedDoc);
      });
      console.log("newDoc", newDoc, "\n");
    } else {
      doc.save(function (err, updatedDoc) {
        if (err) return handleError(err);
        console.log("updatedDoc", updatedDoc, "\n");
        res.send(updatedDoc);
      });
      console.log("doc", doc, "\n");
    }
  });
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

app.listen(1111, function () {
  console.log('Pages listening on port 1111!');
});
