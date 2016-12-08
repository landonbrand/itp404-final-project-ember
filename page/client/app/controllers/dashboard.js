import Ember from 'ember';

export default Ember.Controller.extend({

  isLoggedIn: true,

  auth0 : new Auth0({
    domain:       'landonbrand.auth0.com',
    clientID:     'JLAa4IzlUImrFFUqkri3OFyeCRgDArox',
    callbackURL:  'http://localhost:4200/dashboard',
    responseType: 'token'
  }),

  init: function(){
    console.log("hi!");

    var auth0 = this.get("auth0");
    var result = auth0.parseHash(window.location.hash);
    console.log("result: ", result);
    //use result.idToken to call your rest api

    if (result && result.idToken) {
      // optionally fetch user profile
      auth0.getProfile(result.idToken, function (err, profile) {
        // alert('hello ' + profile.name);
        // this.set("isLoggedIn", true);
      });

      // If offline_access was a requested scope
      // You can grab the result.refresh_token here

    } else if (result && result.error) {
      // alert('error: ' + result.error);
    } else {
      // this.set("isLoggedIn", false);
    }
  },
  actions: {
    authenticateUser: function(e) {
      this.get("auth0").login({
        connection: 'github'
      }, function (err) {
        console.log(err);
        if (err) return alert('Something went wrong: ' + err.message);
        return alert('success signup without login!')
      });
    },
  }
});