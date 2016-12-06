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
mongoose.connect(config.database);
require('./config/passport')(passport);

// connect the api routes under /api/*
var app = express();

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("we're connected to the database!");
//   // console.log(db);
// });

// var pageSchema = new mongoose.Schema({
//   name: String,
//   html: String,
//   css: String
// });
//
// pageSchema.plugin(findOrCreate);
// var PageModel = mongoose.model('Page', pageSchema);

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
app.use(passport.initialize());
var apiRoutes = express.Router();
app.use('/api', apiRoutes);

// create a new user account (POST http://localhost:8080/api/signup)
apiRoutes.post('/signup', function(req, res) {
  console.log("req: ", req, "\n");
  console.log("req body: ", JSON.parse(req.body), "\n");
  var obj = JSON.parse(req.body);
  if (!obj.name || !obj.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: obj.name,
      password: obj.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

apiRoutes.post('/authenticate', function(req, res) {
  var obj = JSON.parse(req.body);
  User.findOne({
    name: obj.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(obj.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


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
