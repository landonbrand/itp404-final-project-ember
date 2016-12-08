define('page/routes/signup', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({

    auth0: new Auth0({
      domain: 'landonbrand.auth0.com',
      clientID: 'JLAa4IzlUImrFFUqkri3OFyeCRgDArox',
      callbackURL: 'http://localhost:4200/dashboard',
      responseType: 'token'
    }),
    model: function model() {
      console.log("model running");
      // var promise = Ember.$.ajax({
      //   url: "http://192.241.235.59:1111/api/getuser",
      //   type: 'get',
      // });
      return "hi";
    },
    actions: {
      authenticateUser: function authenticateUser(e) {
        // console.log("Authenticating...");
        // // window.open("http://192.241.235.59:1111/api/signup");
        // var promise = Ember.$.ajax({
        //   url: "http://192.241.235.59:1111/api/signup",
        //   type: 'post',
        //   data: {
        //     name: "Landon",
        //     password: "pass"
        //   },
        //   dataType: "JSON",
        //   success: function(res){
        //     console.log(res);
        //   }
        // });
        this.get("auth0").login({
          connection: 'github'
        }, function (err) {
          console.log(err);
          if (err) return alert('Something went wrong: ' + err.message);
          return alert('success signup without login!');
        });
      }
    }
  });

  jQuery.getCORS = function (url, callback) {
    if (callback == undefined) callback = function () {};
    return $.ajax({
      type: 'GET',
      url: url,
      contentType: 'application/x-www-form-urlencoded',
      // xhrFields: {
      //   withCredentials: true
      // },
      success: function success(res) {
        callback(res);
      }, error: function error() {
        console.log("ERROR on jQuery.getCORS");
        callback({});
      }
    });
  };
});