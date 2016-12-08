import Ember from 'ember';

export default Ember.Controller.extend({

  auth0 : new Auth0({
    domain:       'landonbrand.auth0.com',
    clientID:     'JLAa4IzlUImrFFUqkri3OFyeCRgDArox',
    callbackURL:  'http://localhost:4200/dashboard',
    responseType: 'token'
  }),

  isLoggedIn: Ember.computed('auth0', function(){
    var auth0 = this.get("auth0");
    var result = auth0.parseHash(window.location.hash);
    if(result != null){
      return true;
    } else {
      return false;
    }
  }),

  nickname: "",
  pages: [],

  init: function(){
    console.log("hi!");

    var auth0 = this.get("auth0");
    var result = auth0.parseHash(window.location.hash);
    console.log("result: ", result);
    //use result.idToken to call your rest api
    var _this = this;

    if (result && result.idToken) {
      // optionally fetch user profile
      auth0.getProfile(result.idToken, function (err, profile) {
        console.log(profile);
        // alert('hello ' + profile.name);
        _this.set("nickname", profile.nickname);

        var obj = {nickname: _this.get("nickname")};
        var promise =  Ember.$.ajax({
          url: "http://192.241.235.59:1111/api/getuserspages",
          data: obj,
          dataType: "text",
          type: 'get'
        });
        return promise.then(function(response){
          console.log("Response pages: ", JSON.parse(response));
          _this.set("pages", JSON.parse(response).pages);
        });
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

    getPages: function(_this) {
      console.log("getting pages!");
      var obj = {nickname: _this.get("nickname")};
      var promise =  Ember.$.ajax({
        url: "http://192.241.235.59:1111/api/getuserspages",
        data: obj,
        dataType: "text",
        type: 'get'
      });
      return promise.then(function(response){
        console.log("Response pages from getPages: ", JSON.parse(response));
        _this.set("pages", JSON.parse(response).pages);
      });
    },

    addPage: function() {
      var pageToAdd = document.getElementById("page-to-add");
      console.log(pageToAdd);
      var _this = this;
      var data = {
        nickname: this.get("nickname"),
        page: document.getElementById("page-to-add").value
      };
      var promise =  Ember.$.post({
        url: "http://192.241.235.59:1111/api/addUsersPage",
        data: JSON.stringify(data),
        dataType: "text"
      });
      promise.then(function(response){
        console.log("promise returned: ", response);
        _this.send("getPages", _this);
      });
    }
  }
});
