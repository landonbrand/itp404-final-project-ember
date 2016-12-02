define('page/tests/helpers/tag-start.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/tag-start.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/tag-start.js should pass jshint.');
  });
});