define('page/tests/controllers/editing-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/editing-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/editing-tests.js should pass jshint.\ncontrollers/editing-tests.js: line 195, col 42, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 203, col 34, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 227, col 47, The \'__proto__\' property is deprecated.\ncontrollers/editing-tests.js: line 236, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 241, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 268, col 2, Missing semicolon.\ncontrollers/editing-tests.js: line 272, col 18, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 277, col 2, Missing semicolon.\ncontrollers/editing-tests.js: line 280, col 19, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 40, col 22, \'$\' is not defined.\ncontrollers/editing-tests.js: line 273, col 22, \'Page\' is not defined.\ncontrollers/editing-tests.js: line 282, col 22, \'Page\' is not defined.\ncontrollers/editing-tests.js: line 2, col 8, \'ClassListItemComponent\' is defined but never used.\ncontrollers/editing-tests.js: line 226, col 10, \'byValue\' is defined but never used.\n\n14 errors');
  });
});