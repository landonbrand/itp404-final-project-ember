define('page/routes/editing-tests', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      var cursorPos = 0;
      var nodes;
      var promise = $.ajax({
        url: "http://localhost:3000/api/spoofhtml",
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