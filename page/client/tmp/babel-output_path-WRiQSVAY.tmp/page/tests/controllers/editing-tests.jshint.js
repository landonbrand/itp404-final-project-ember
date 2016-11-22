define('page/tests/controllers/editing-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/editing-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/editing-tests.js should pass jshint.\ncontrollers/editing-tests.js: line 15, col 32, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 16, col 43, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 13, col 11, \'treeViewer\' is defined but never used.\ncontrollers/editing-tests.js: line 66, col 15, \'i\' is already defined.\ncontrollers/editing-tests.js: line 69, col 29, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 58, col 11, \'tags\' is defined but never used.\ncontrollers/editing-tests.js: line 40, col 22, \'$\' is not defined.\ncontrollers/editing-tests.js: line 76, col 18, \'elements\' is not defined.\ncontrollers/editing-tests.js: line 76, col 38, \'elements\' is not defined.\ncontrollers/editing-tests.js: line 76, col 57, \'elements\' is not defined.\n\n10 errors');
  });
});