import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    var promise =  Ember.$.ajax({
      url: "http://192.241.235.59:1111/api/getPage",
      data: {name: params.page_name},
      type: 'get'
    });
    return promise.then(function(response){
      return response;
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
