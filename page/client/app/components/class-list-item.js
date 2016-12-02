import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    changeClass: function(){
      this.get("changeClassFunction")();
    },
    fieldFocused: function(event){
      this.get("focusFunction")(event);
      return false;
    },
    fieldBlurred: function(event){
      this.get("blurFunction")(event);
      return false;
    }
  }
});
