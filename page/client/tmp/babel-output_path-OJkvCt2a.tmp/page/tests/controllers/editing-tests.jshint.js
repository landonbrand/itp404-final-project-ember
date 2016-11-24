define('page/tests/controllers/editing-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/editing-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/editing-tests.js should pass jshint.\ncontrollers/editing-tests.js: line 38, col 32, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 39, col 43, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 37, col 11, \'treeViewer\' is defined but never used.\ncontrollers/editing-tests.js: line 106, col 39, \'newType\' is defined but never used.\ncontrollers/editing-tests.js: line 136, col 47, The \'__proto__\' property is deprecated.\ncontrollers/editing-tests.js: line 68, col 22, \'$\' is not defined.\ncontrollers/editing-tests.js: line 135, col 10, \'byValue\' is defined but never used.\n\n7 errors');
  });
});