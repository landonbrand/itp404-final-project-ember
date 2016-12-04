define("page/routes/signup", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    actions: {
      authenticateUser: function authenticateUser() {
        console.log("Authenticating...");
      }
    }
  });
});