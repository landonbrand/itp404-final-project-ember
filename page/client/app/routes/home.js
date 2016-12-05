import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    goToPage: function(){
      var pageName = document.getElementById("pageName").value;
      console.log("Going to", pageName);
      this.transitionTo("/page/" + encodeURI(pageName));
    }
  }
});
