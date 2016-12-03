define("page/components/css-rules", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    actions: {
      change: function change(event) {
        var ruleName = event.target.previousElementSibling.textContent.trim();
        var selector = event.target.parentNode.children[0].textContent;
        var ruleValue = event.target.textContent;
        ruleName = ruleName.slice(0, -1);
        this.get("changeCssFunction")(selector, ruleName, ruleValue);
      },
      focus: function focus(event) {
        this.get("focusFunction")(event);
      },
      blur: function blur(event) {
        this.get("blurFunction")(event);
      },
      addRuleClicked: function addRuleClicked(event) {
        var selector = event.target.parentNode.children[0].textContent;
        this.get("addCssRuleFunction")(selector);
      },
      addStyleClicked: function addStyleClicked(event) {
        this.get("addCssStyleFunction")();
      },
      removeStyleClicked: function removeStyleClicked(event) {
        var selector = event.target.parentNode.children[0].textContent;
        this.get("removeCssStyleFunction")(selector);
      }
    }
  });
});