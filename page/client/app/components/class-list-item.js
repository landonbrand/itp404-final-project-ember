import Ember from 'ember';

export default Ember.Component.extend({
  shouldBeShown: Ember.computed('className', function() {
    if(this.get("className") == 'selected-region'){
      return false;
    } else {
      return true;
    }
    return true;
  }),
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
