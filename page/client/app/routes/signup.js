import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    console.log("model running")
    var promise = Ember.$.ajax({
      url: "http://192.241.235.59:1111/api/getuser",
      type: 'get',
    });
    return "hi"
  },
  actions: {
    authenticateUser: function() {
      console.log("Authenticating...");
      window.open("http://192.241.235.59:1111/auth/github");
      var promise = Ember.$.ajax({
        url: "http://192.241.235.59:1111/api/getuser",
        type: 'get',
        success: function(res){
          console.log(res);
        }
      });
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
