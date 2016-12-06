var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jwt-simple');

var User = require('../model/user');
var jwtconfig = require('./jwtconfig').jwtconfig;


module.exports = function (passport) {
    var opts = {};

    opts.secretOrKey = jwtconfig.secret;
    // opts.issuer = jwtconfig.issuer;
    // opts.audience = jwtconfig.audience;
    opts.jwtFromRequest = ExtractJwt.fromHeader("Authorization");

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
      console.log("passport use jTW strategy");
        console.log(`PAYLOAD: ${jwt_payload}`);
        User.findOne({userName: jwt_payload.sub}, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            }
            else done(null, false, 'User found in token not found');
        });
    }));
};
