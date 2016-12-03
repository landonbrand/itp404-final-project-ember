define('page/tests/controllers/editing-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/editing-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/editing-tests.js should pass jshint.\ncontrollers/editing-tests.js: line 37, col 47, Missing semicolon.\ncontrollers/editing-tests.js: line 39, col 15, \'i\' is already defined.\ncontrollers/editing-tests.js: line 160, col 11, Unreachable \'console\' after \'return\'.\ncontrollers/editing-tests.js: line 164, col 76, Expected \'!==\' and instead saw \'!=\'.\ncontrollers/editing-tests.js: line 164, col 86, Missing semicolon.\ncontrollers/editing-tests.js: line 199, col 47, Expected \'!==\' and instead saw \'!=\'.\ncontrollers/editing-tests.js: line 205, col 46, Missing semicolon.\ncontrollers/editing-tests.js: line 254, col 42, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 262, col 34, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 286, col 47, The \'__proto__\' property is deprecated.\ncontrollers/editing-tests.js: line 295, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 300, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 327, col 2, Missing semicolon.\ncontrollers/editing-tests.js: line 331, col 18, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 336, col 2, Missing semicolon.\ncontrollers/editing-tests.js: line 339, col 19, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 384, col 2, Missing semicolon.\ncontrollers/editing-tests.js: line 49, col 22, \'$\' is not defined.\ncontrollers/editing-tests.js: line 359, col 16, \'$\' is not defined.\ncontrollers/editing-tests.js: line 332, col 22, \'Page\' is not defined.\ncontrollers/editing-tests.js: line 341, col 22, \'Page\' is not defined.\ncontrollers/editing-tests.js: line 2, col 8, \'ClassListItemComponent\' is defined but never used.\ncontrollers/editing-tests.js: line 285, col 10, \'byValue\' is defined but never used.\n\n23 errors');
  });
});