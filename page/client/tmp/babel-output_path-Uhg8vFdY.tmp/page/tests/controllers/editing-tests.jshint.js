define('page/tests/controllers/editing-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/editing-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/editing-tests.js should pass jshint.\ncontrollers/editing-tests.js: line 126, col 27, \'className\' is defined but never used.\ncontrollers/editing-tests.js: line 180, col 42, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 188, col 34, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 212, col 47, The \'__proto__\' property is deprecated.\ncontrollers/editing-tests.js: line 221, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 226, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 253, col 2, Missing semicolon.\ncontrollers/editing-tests.js: line 257, col 18, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 263, col 2, Missing semicolon.\ncontrollers/editing-tests.js: line 32, col 22, \'$\' is not defined.\ncontrollers/editing-tests.js: line 258, col 17, \'Page\' is not defined.\ncontrollers/editing-tests.js: line 259, col 22, \'Page\' is not defined.\ncontrollers/editing-tests.js: line 2, col 8, \'ClassListItemComponent\' is defined but never used.\ncontrollers/editing-tests.js: line 211, col 10, \'byValue\' is defined but never used.\n\n14 errors');
  });
});