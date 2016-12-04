import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    authenticateUser: function() {
      console.log("Authenticating...");

      // Ember.$.getCORS("http://192.241.235.59:1111/auth/github", function(res){
      //   console.log(res);
      // });

      // Ember.$.ajax({
      //   url: "http://192.241.235.59:1111/auth/github",
      //   method: "GET",
      //   // crossDomain: true,
      //   xhrFields: {withCredentials: true},
      //   success: function (response) {
      //     console.log(response);
      //   },
      //   error: function (xhr, status) {
      //     console.log("XHR: ", xhr);
      //     console.log("status: ", status);
      //   }
      // });
      window.open("http://192.241.235.59:1111/auth/github");
    },
  }
});

jQuery.getCORS = function(url, callback) {
  if(callback == undefined) callback = function(){};
  return $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/x-www-form-urlencoded',
    // xhrFields: {
    //   withCredentials: true
    // },
    success: function(res) {
      callback(res)
    }, error: function() {
      console.log("ERROR on jQuery.getCORS");
      callback({})
    }
  });
}
