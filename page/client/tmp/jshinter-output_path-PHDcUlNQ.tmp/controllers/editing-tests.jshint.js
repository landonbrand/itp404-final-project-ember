QUnit.module('JSHint | controllers/editing-tests.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/editing-tests.js should pass jshint.\ncontrollers/editing-tests.js: line 18, col 32, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 19, col 43, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 16, col 11, \'treeViewer\' is defined but never used.\ncontrollers/editing-tests.js: line 70, col 15, \'i\' is already defined.\ncontrollers/editing-tests.js: line 73, col 29, Expected \'===\' and instead saw \'==\'.\ncontrollers/editing-tests.js: line 61, col 11, \'tags\' is defined but never used.\ncontrollers/editing-tests.js: line 43, col 22, \'$\' is not defined.\n\n7 errors');
});
