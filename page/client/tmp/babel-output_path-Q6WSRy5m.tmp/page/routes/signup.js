define("page/routes/signup", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    actions: {
      authenticateUser: function authenticateUser() {
        console.log("Authenticating...");
        _ember["default"].$.ajax({
          url: "http://192.241.235.59:1111/auth/github",
          method: "GET",
          crossDomain: true,
          success: function success(response) {
            console.log(response);
          },
          error: function error(xhr, status) {
            console.log("XHR: ", xhr);
            console.log("status: ", status);
          }
        });
      }
    }
  });
});