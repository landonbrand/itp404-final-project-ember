import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    change: function(event){
      var ruleName = event.target.previousElementSibling.textContent.trim();
      var selector = event.target.parentNode.children[0].textContent;
      var ruleValue = event.target.textContent;
      ruleName = ruleName.slice(0, -1);
      console.log("ruleName:", ruleName);
      this.get("changeCssFunction")(selector, ruleName, ruleValue);
    },
    focus: function(event){
      this.get("focusFunction")(event);
    },
    blur: function(event){
      this.get("blurFunction")(event);
    },
    click: function(event){
      var selector = event.target.parentNode.children[0].textContent;
      this.get("addCssRuleFunction")(selector);
    }
  }
});
