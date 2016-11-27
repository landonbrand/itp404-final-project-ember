define('page/tests/controllers/editing-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/editing-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/editing-tests.js should pass jshint.\ncontrollers/editing-tests.js: line 180, col 42, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 189, col 34, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 215, col 47, The \'__proto__\' property is deprecated.\ncontrollers/editing-tests.js: line 224, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 229, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 32, col 22, \'$\' is not defined.\ncontrollers/editing-tests.js: line 77, col 26, \'tagNameElement\' is not defined.\ncontrollers/editing-tests.js: line 214, col 10, \'byValue\' is defined but never used.\n\n8 errors');
  });
});