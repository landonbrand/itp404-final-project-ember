import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    authenticateUser: function() {
      console.log("Authenticating...");
      Ember.$.ajax({
        url: "http://192.241.235.59:1111/auth/github",
        method: "GET",
        crossDomain: true,
        success: function (response) {
          console.log(response);
        },
        error: function (xhr, status) {
          console.log("XHR: ", xhr);
          console.log("status: ", status);
        }
      })
    },
  }
});
