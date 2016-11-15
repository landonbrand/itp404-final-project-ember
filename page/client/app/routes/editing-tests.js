import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    var cursorPos = 0;
    var nodes;

    var promise =  $.ajax({
      url: "http://localhost:3000/api/spoofhtml",
      type: 'get'
    });
    return promise.then(function(response){
      return response.html;
    });
  },

  actions: {
    cancelEditsOnModel: function() {
      console.log("refreshing...");
      this.refresh();
    },

    invalidateModel: function() {
      this.refresh();
    }
  }
});
