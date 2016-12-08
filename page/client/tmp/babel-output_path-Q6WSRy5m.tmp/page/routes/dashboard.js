define("page/routes/dashboard", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({

    model: function model() {
      console.log("model running");
      // var promise = Ember.$.ajax({
      //   url: "http://192.241.235.59:1111/api/getuser",
      //   type: 'get',
      // });
      return "hi";
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