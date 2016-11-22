define('page/tests/routes/navtest.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/navtest.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/navtest.js should pass jshint.');
  });
});