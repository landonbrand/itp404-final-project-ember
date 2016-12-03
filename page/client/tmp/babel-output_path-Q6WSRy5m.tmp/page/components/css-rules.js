define("page/components/css-rules", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    actions: {
      change: function change(event) {
        var ruleName = event.target.parentNode.children[2].textContent;
        ruleName = ruleName.slice(0, -1);
        var ruleValue = event.target.textContent;
        this.get("changeCssFunction")(ruleName, ruleValue);
      },
      focus: function focus(event) {
        this.get("focusFunction")(event);
      },
      blur: function blur(event) {
        this.get("blurFunction")(event);
      }
    }
  });
});