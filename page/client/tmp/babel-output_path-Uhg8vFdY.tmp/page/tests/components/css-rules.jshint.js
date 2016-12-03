define('page/tests/components/css-rules.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/css-rules.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/css-rules.js should pass jshint.');
  });
});