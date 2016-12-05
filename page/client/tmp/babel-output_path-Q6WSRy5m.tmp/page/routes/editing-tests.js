define("page/routes/editing-tests", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    model: function model() {
      var cursorPos = 0;
      var nodes;
      var promise = _ember["default"].$.ajax({
        url: "http://192.241.235.59:1111/api/getPage",
        data: { name: "newPage" },
        type: 'get'
      });
      return promise.then(function (response) {
        return response.html;
      });
    },

    actions: {
      cancelEditsOnModel: function cancelEditsOnModel() {
        console.log("refreshing...");
        this.refresh();
      },

      invalidateModel: function invalidateModel() {
        this.refresh();
      }
    }
  });
});