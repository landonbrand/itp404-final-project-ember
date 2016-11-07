QUnit.module('JSHint | routes/editing-tests.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/editing-tests.js should pass jshint.\nroutes/editing-tests.js: line 5, col 9, \'cursorPos\' is defined but never used.\nroutes/editing-tests.js: line 6, col 9, \'nodes\' is defined but never used.\nroutes/editing-tests.js: line 66, col 15, \'obj\' is already defined.\nroutes/editing-tests.js: line 69, col 12, Missing semicolon.\nroutes/editing-tests.js: line 71, col 16, \'obj\' used out of scope.\nroutes/editing-tests.js: line 76, col 46, Expected \'!==\' and instead saw \'!=\'.\nroutes/editing-tests.js: line 92, col 29, \'response\' is defined but never used.\nroutes/editing-tests.js: line 8, col 20, \'$\' is not defined.\nroutes/editing-tests.js: line 87, col 22, \'$\' is not defined.\n\n9 errors');
});
