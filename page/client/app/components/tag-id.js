import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span",

  changeObserver: Ember.observer('region', function() {
    var node = document.getElementById("tagId-unfocusable");
    node.textContent = this.get("region").anchorElement.id;
  }),

  actions: {
    changeId: function(){
      this.get("changeIdFunction")();
    },
    fieldFocused: function(event){
      this.get("focusFunction")(event);
      console.log(this.get("region"));
      return false;
    },
    fieldBlurred: function(event){
      this.get("blurFunction")(event);
      return false;
    }
  }
});
