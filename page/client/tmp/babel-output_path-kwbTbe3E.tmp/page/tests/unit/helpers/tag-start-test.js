define('page/tests/unit/helpers/tag-start-test', ['exports', 'page/helpers/tag-start', 'qunit'], function (exports, _pageHelpersTagStart, _qunit) {

  (0, _qunit.module)('Unit | Helper | tag start');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _pageHelpersTagStart.tagStart)([42]);
    assert.ok(result);
  });
});