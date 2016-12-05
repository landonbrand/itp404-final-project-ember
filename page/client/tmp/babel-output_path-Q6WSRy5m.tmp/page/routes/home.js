define("page/routes/home", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    actions: {
      goToPage: function goToPage() {
        var pageName = document.getElementById("pageName").value;
        console.log("Going to", pageName);
        this.transitionTo("/page/" + encodeURI(pageName));
      }
    }
  });
});