define('page/tests/controllers/editing-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/editing-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/editing-tests.js should pass jshint.\ncontrollers/editing-tests.js: line 121, col 13, \'el\' is defined but never used.\ncontrollers/editing-tests.js: line 170, col 42, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 178, col 34, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 202, col 47, The \'__proto__\' property is deprecated.\ncontrollers/editing-tests.js: line 211, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 216, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 243, col 2, Missing semicolon.\ncontrollers/editing-tests.js: line 30, col 22, \'$\' is not defined.\ncontrollers/editing-tests.js: line 123, col 50, \'$\' is not defined.\ncontrollers/editing-tests.js: line 122, col 21, \'Page\' is not defined.\ncontrollers/editing-tests.js: line 201, col 10, \'byValue\' is defined but never used.\n\n11 errors');
  });
});