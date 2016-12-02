define('page/components/tag-name', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    _onReady: function _onReady() {
      this.get("region");
    },

    changeObserver: _ember['default'].observer('region', function () {
      var node = document.getElementById("tagName");
      node.textContent = this.get("region").anchorElement.nodeName;
    }),

    tagName: "span",

    actions: {
      keyUp: function keyUp() {
        this.get("changeTagFunction")();
      },
      fieldFocused: function fieldFocused(event) {
        var node = document.getElementById("tagName");
        node.textContent = this.get("region").anchorElement.nodeName;
        this.get("focusFunction")(event);
        return false;
      },
      fieldBlurred: function fieldBlurred(event) {
        this.get("blurFunction")(event);
        var node = document.getElementById("tagName");
        node.textContent = this.get("region").anchorElement.nodeName;
        return false;
      }
    }
  });
});