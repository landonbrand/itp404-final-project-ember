import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    change: function(event){
      var ruleName = event.target.parentNode.children[2].textContent;
      ruleName = ruleName.slice(0, -1);
      var ruleValue = event.target.textContent;
      this.get("changeCssFunction")(ruleName, ruleValue);
    },
    focus: function(event){
      this.get("focusFunction")(event);
    },
    blur: function(event){
      this.get("blurFunction")(event);
    }
  }
});
