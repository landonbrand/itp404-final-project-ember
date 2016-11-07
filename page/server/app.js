var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.text({type:"*/*"}));

var spoofNodes = {
  data: [
    {
      tag: "h1",
      content: "Hello, World!"
    },
    {
      tag: "h2",
      content: "This is the first page I'm trying to create."
    },
    {
      tag: "p",
      content: "Let's see if this works.... I guess."
    },
    {
      tag: "p",
      content: [
        {
          tag: "",
          content: "In this sentence, there is"
        },
        {
          tag: "a href='#'",
          content: "a link"
        },
        {
          tag: "",
          content: "."
        }
      ]
    },
    {
      tag: "p",
      content: [
        {
          tag: "h1",
          content: "what does this heading look like"
        },
        {
          tag: "p",
          content: [
            {
              tag: "a href='#'",
              content: "what happens to dis link"
            },
            {
              tag: "b",
              content: [
                {
                  tag: "i",
                  content: "How deep can we go??"
                },
                {
                  tag: "a style='color:red'",
                  content: "ITS USING THE API!!!!"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      tag:"p",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
  ]
};

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
app.post('/api/saveTest', function (req, res) {
  console.log("\n\n\n");
  console.log(spoofNodes);
  console.log("\n\n");
  console.log("Request Body", req.body);
  spoofNodes = JSON.parse(req.body);
  console.log("\n\n");
  console.log(spoofNodes);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
      body: req.body || null
  }));
  // console.log("response", response);
});

app.listen(3000, function () {
  console.log('Pages listening on port 3000!');
});
