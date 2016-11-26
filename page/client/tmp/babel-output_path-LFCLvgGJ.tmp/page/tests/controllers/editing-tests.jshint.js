define('page/tests/controllers/editing-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/editing-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/editing-tests.js should pass jshint.\ncontrollers/editing-tests.js: line 87, col 42, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 90, col 13, \'node\' is already defined.\ncontrollers/editing-tests.js: line 92, col 20, \'node\' used out of scope.\ncontrollers/editing-tests.js: line 93, col 25, \'node\' used out of scope.\ncontrollers/editing-tests.js: line 101, col 7, \'node\' used out of scope.\ncontrollers/editing-tests.js: line 105, col 54, \'node\' used out of scope.\ncontrollers/editing-tests.js: line 158, col 42, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 165, col 34, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 195, col 47, The \'__proto__\' property is deprecated.\ncontrollers/editing-tests.js: line 32, col 22, \'$\' is not defined.\ncontrollers/editing-tests.js: line 194, col 10, \'byValue\' is defined but never used.\n\n11 errors');
  });
});