define('page/tests/controllers/editing-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/editing-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/editing-tests.js should pass jshint.\ncontrollers/editing-tests.js: line 15, col 32, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 16, col 43, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 13, col 11, \'treeViewer\' is defined but never used.\ncontrollers/editing-tests.js: line 40, col 22, \'$\' is not defined.\n\n4 errors');
  });
});