define("page/routes/signup", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    model: function model() {
      console.log("model running");
      var promise = _ember["default"].$.ajax({
        url: "http://192.241.235.59:1111/api/getuser",
        type: 'get'
      });
      return "hi";
    },
    actions: {
      authenticateUser: function authenticateUser() {
        console.log("Authenticating...");
        // window.open("http://192.241.235.59:1111/api/signup");
        var promise = _ember["default"].$.ajax({
          url: "http://192.241.235.59:1111/api/signup",
          type: 'post',
          data: {
            name: "Landon",
            password: "pass"
          },
          dataType: "JSON",
          success: function success(res) {
            console.log(res);
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