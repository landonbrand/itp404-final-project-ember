define('page/tests/controllers/editing-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/editing-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/editing-tests.js should pass jshint.\ncontrollers/editing-tests.js: line 133, col 11, \'newClassList\' is defined but never used.\ncontrollers/editing-tests.js: line 192, col 42, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 200, col 34, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 224, col 47, The \'__proto__\' property is deprecated.\ncontrollers/editing-tests.js: line 233, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 238, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 265, col 2, Missing semicolon.\ncontrollers/editing-tests.js: line 269, col 18, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 275, col 2, Missing semicolon.\ncontrollers/editing-tests.js: line 32, col 22, \'$\' is not defined.\ncontrollers/editing-tests.js: line 270, col 17, \'Page\' is not defined.\ncontrollers/editing-tests.js: line 271, col 22, \'Page\' is not defined.\ncontrollers/editing-tests.js: line 2, col 8, \'ClassListItemComponent\' is defined but never used.\ncontrollers/editing-tests.js: line 223, col 10, \'byValue\' is defined but never used.\n\n14 errors');
  });
});