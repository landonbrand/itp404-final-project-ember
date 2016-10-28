import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    var nodes;

    var promise =  $.ajax({
      url: "http://localhost:3000/api/spoofnodes",
      type: 'get'
    });
    return promise.then(function(response){
      return response;
    });
  },

  actions: {
    invalidateModel: function() {
      this.refresh();
    }
  }
});
