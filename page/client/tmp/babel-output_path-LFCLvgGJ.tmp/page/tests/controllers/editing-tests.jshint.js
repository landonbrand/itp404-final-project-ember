define('page/tests/controllers/editing-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/editing-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/editing-tests.js should pass jshint.\ncontrollers/editing-tests.js: line 178, col 42, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 187, col 34, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 213, col 47, The \'__proto__\' property is deprecated.\ncontrollers/editing-tests.js: line 222, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 227, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 256, col 2, Missing semicolon.\ncontrollers/editing-tests.js: line 32, col 22, \'$\' is not defined.\ncontrollers/editing-tests.js: line 212, col 10, \'byValue\' is defined but never used.\n\n8 errors');
  });
});