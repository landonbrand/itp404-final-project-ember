import Ember from 'ember';

export default Ember.Component.extend({
  _onReady: function() {
    this.get("region");
  },

  changeObserver: Ember.observer('region', function() {
    var node = document.getElementById("tagName");
    node.textContent = this.get("region").anchorElement.nodeName;
  }),

  tagName: "span",

  actions: {
    keyUp: function(){
      this.get("changeTagFunction")();
    },
    fieldFocused: function(event){
      var node = document.getElementById("tagName");
      node.textContent = this.get("region").anchorElement.nodeName;
      this.get("focusFunction")(event);
      return false;
    },
    fieldBlurred: function(event){
      this.get("blurFunction")(event);
      var node = document.getElementById("tagName");
      node.textContent = this.get("region").anchorElement.nodeName;
      return false;
    }
  }
});
