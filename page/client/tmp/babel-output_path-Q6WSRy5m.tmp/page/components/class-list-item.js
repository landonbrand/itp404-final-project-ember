define("page/components/class-list-item", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    actions: {
      changeClass: function changeClass() {
        this.get("changeClassFunction")(this.get("className"));
      },
      fieldFocused: function fieldFocused(event) {
        this.get("focusFunction")(event);
        return false;
      },
      fieldBlurred: function fieldBlurred(event) {
        this.get("blurFunction")(event);
        return false;
      }
    }
  });
});