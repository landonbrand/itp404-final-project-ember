define('page/tests/unit/helpers/class-id-test', ['exports', 'page/helpers/class-id', 'qunit'], function (exports, _pageHelpersClassId, _qunit) {

  (0, _qunit.module)('Unit | Helper | class id');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _pageHelpersClassId.classId)([42]);
    assert.ok(result);
  });
});