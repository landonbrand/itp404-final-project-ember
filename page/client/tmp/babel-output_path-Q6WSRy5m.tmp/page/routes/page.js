define('page/routes/page', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      var cursorPos = 0;
      var nodes;
      var promise = _ember['default'].$.ajax({
        url: "http://192.241.235.59:1111/api/getPage",
        data: { name: params.page_name },
        type: 'get'
      });
      return promise.then(function (response) {
        return response;
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