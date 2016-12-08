define('page/tests/controllers/dashboard.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/dashboard.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/dashboard.js should pass jshint.\ncontrollers/dashboard.js: line 24, col 55, \'profile\' is defined but never used.\ncontrollers/dashboard.js: line 24, col 50, \'err\' is defined but never used.\ncontrollers/dashboard.js: line 44, col 18, Expected \'{\' and instead saw \'return\'.\ncontrollers/dashboard.js: line 45, col 54, Missing semicolon.\ncontrollers/dashboard.js: line 39, col 32, \'e\' is defined but never used.\ncontrollers/dashboard.js: line 7, col 15, \'Auth0\' is not defined.\n\n6 errors');
  });
});