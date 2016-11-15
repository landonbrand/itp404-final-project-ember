define("page/components/side-bar", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    // selectedTagsObserver: Ember.observer('selectedTags', function(){
    //   console.log(this.get('selectedTags'));
    // }),
    actions: {

      noStyle: function noStyle() {
        console.log("noStyle");
      },

      h1: function h1() {
        console.log(this.get("selectedTags"));
      },

      onChange: function onChange() {}
    }
  });
});