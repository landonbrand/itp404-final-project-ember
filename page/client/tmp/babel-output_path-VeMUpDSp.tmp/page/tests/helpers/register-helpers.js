define('page/tests/helpers/register-helpers', ['exports', 'ember', 'page/tests/helpers/fill-content-editable'], function (exports, _ember, _pageTestsHelpersFillContentEditable) {
  var registerAsyncHelper = _ember['default'].Test.registerAsyncHelper;

  exports['default'] = function () {
    registerAsyncHelper('fillContentEditable', _pageTestsHelpersFillContentEditable['default']);
  };
});