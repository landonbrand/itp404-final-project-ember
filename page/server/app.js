var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.text({type:"*/*"}));

var spoofHTML = {
  html: "<h1 id='title-block'>Title</h1><h2 class='big'>subtitle</h2><p>Lorem Ipsum is simply dummy text of the printing and <a href='#'>typesetting industry</a>. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>"
}

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// app.configure(function() {
//
// });
app.use(allowCrossDomain);
app.get('/api/spoofnodes', function (request, response) {
  response.json(spoofNodes);
});
app.get('/api/spoofhtml', function (request, response) {
  response.json(spoofHTML);
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
  // console.log("response", response);
});

app.listen(3000, function () {
  console.log('Pages listening on port 3000!');
});
