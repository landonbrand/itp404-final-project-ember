define('page/components/tag-id', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: "span",

    changeObserver: _ember['default'].observer('region', function () {
      var node = document.getElementById("tagId-unfocusable");
      node.textContent = this.get("region").anchorElement.id;
    }),

    actions: {
      changeId: function changeId() {
        this.get("changeIdFunction")();
      },
      fieldFocused: function fieldFocused(event) {
        this.get("focusFunction")(event);
        console.log(this.get("region"));
        return false;
      },
      fieldBlurred: function fieldBlurred(event) {
        this.get("blurFunction")(event);
        return false;
      }
    }
  });
});