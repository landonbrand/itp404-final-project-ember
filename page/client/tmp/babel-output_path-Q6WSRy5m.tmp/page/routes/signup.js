define("page/routes/signup", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    actions: {
      authenticateUser: function authenticateUser() {
        console.log("Authenticating...");

        // Ember.$.getCORS("http://192.241.235.59:1111/auth/github", function(res){
        //   console.log(res);
        // });

        _ember["default"].$.ajax({
          url: "http://192.241.235.59:1111/auth/github",
          method: "GET",
          // crossDomain: true,
          xhrFields: { withCredentials: true },
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

  jQuery.getCORS = function (url, callback) {
    if (callback == undefined) callback = function () {};
    return $.ajax({
      type: 'GET',
      url: url,
      contentType: 'application/x-www-form-urlencoded',
      // xhrFields: {
      //   withCredentials: true
      // },
      success: function success(res) {
        callback(res);
      }, error: function error() {
        console.log("ERROR on jQuery.getCORS");
        callback({});
      }
    });
  };
});