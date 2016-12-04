import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    authenticateUser: function() {
      console.log("Authenticating...");
    },
  }
});
