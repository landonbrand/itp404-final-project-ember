define('page/tests/controllers/dashboard.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/dashboard.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/dashboard.js should pass jshint.\ncontrollers/dashboard.js: line 56, col 18, Expected \'{\' and instead saw \'return\'.\ncontrollers/dashboard.js: line 57, col 54, Missing semicolon.\ncontrollers/dashboard.js: line 51, col 32, \'e\' is defined but never used.\ncontrollers/dashboard.js: line 80, col 8, Missing semicolon.\ncontrollers/dashboard.js: line 90, col 2, Expected \'}\' to match \'{\' from line 3 and instead saw \')\'.\ncontrollers/dashboard.js: line 90, col 3, Expected \')\' and instead saw \';\'.\ncontrollers/dashboard.js: line 90, col 4, Missing semicolon.\ncontrollers/dashboard.js: line 5, col 15, \'Auth0\' is not defined.\ncontrollers/dashboard.js: line 81, col 22, \'$\' is not defined.\n\n9 errors');
  });
});