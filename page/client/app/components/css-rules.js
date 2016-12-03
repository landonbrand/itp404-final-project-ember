import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    change: function(event){
      var ruleName = event.target.previousElementSibling.textContent.trim();
      var selector = event.target.parentNode.children[0].textContent;
      var ruleValue = event.target.textContent;
      ruleName = ruleName.slice(0, -1);
      this.get("changeCssFunction")(selector, ruleName, ruleValue);
    },
    focus: function(event){
      this.get("focusFunction")(event);
    },
    blur: function(event){
      this.get("blurFunction")(event);
    },
    addRuleClicked: function(event){
      var selector = event.target.parentNode.children[0].textContent;
      this.get("addCssRuleFunction")(selector);
    },
    addStyleClicked: function(event){
      this.get("addCssStyleFunction")();
    },
    removeStyleClicked: function(event){
      var selector = event.target.parentNode.children[0].textContent;
      this.get("removeCssStyleFunction")(selector);
    }
  }
});
