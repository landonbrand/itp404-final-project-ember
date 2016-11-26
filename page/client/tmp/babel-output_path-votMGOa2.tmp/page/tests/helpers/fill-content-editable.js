define('page/tests/helpers/fill-content-editable', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = function (app, selector, content) {
    return andThen(function () {
      return app.testHelpers.click(selector);
    }).then(function () {
      $(selector).html(content);
      return app.testHelpers.keyEvent(selector, 'keyup', 13);
    }).then(function () {
      return app.testHelpers.triggerEvent(selector, 'blur');
    });
  };
});