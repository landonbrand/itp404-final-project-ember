define('page/tests/controllers/dashboard.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/dashboard.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/dashboard.js should pass jshint.\ncontrollers/dashboard.js: line 69, col 18, Expected \'{\' and instead saw \'return\'.\ncontrollers/dashboard.js: line 70, col 54, Missing semicolon.\ncontrollers/dashboard.js: line 64, col 32, \'e\' is defined but never used.\ncontrollers/dashboard.js: line 96, col 8, Missing semicolon.\ncontrollers/dashboard.js: line 90, col 11, \'myPage\' is defined but never used.\ncontrollers/dashboard.js: line 5, col 15, \'Auth0\' is not defined.\ncontrollers/dashboard.js: line 97, col 22, \'$\' is not defined.\n\n7 errors');
  });
});