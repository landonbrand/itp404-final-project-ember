define('page/components/class-list-item', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    shouldBeShown: _ember['default'].computed('className', function () {
      if (this.get("className") === 'selected-region') {
        return false;
      } else {
        return true;
      }
      return true;
    }),
    actions: {
      changeClass: function changeClass() {
        this.get("changeClassFunction")();
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