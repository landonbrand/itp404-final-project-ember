define('page/tests/routes/signup.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/signup.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/signup.js should pass jshint.\nroutes/signup.js: line 12, col 33, Missing semicolon.\nroutes/signup.js: line 17, col 16, Missing semicolon.\nroutes/signup.js: line 39, col 18, Expected \'{\' and instead saw \'return\'.\nroutes/signup.js: line 40, col 54, Missing semicolon.\nroutes/signup.js: line 20, col 32, \'e\' is defined but never used.\nroutes/signup.js: line 47, col 17, Expected \'===\' and instead saw \'==\'.\nroutes/signup.js: line 47, col 29, Expected \'{\' and instead saw \'callback\'.\nroutes/signup.js: line 56, col 20, Missing semicolon.\nroutes/signup.js: line 59, col 19, Missing semicolon.\nroutes/signup.js: line 62, col 2, Missing semicolon.\nroutes/signup.js: line 5, col 15, \'Auth0\' is not defined.\nroutes/signup.js: line 46, col 1, \'jQuery\' is not defined.\nroutes/signup.js: line 48, col 10, \'$\' is not defined.\n\n13 errors');
  });
});