QUnit.module('JSHint | routes/editing-tests.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/editing-tests.js should pass jshint.\nroutes/editing-tests.js: line 5, col 9, \'cursorPos\' is defined but never used.\nroutes/editing-tests.js: line 6, col 9, \'nodes\' is defined but never used.\nroutes/editing-tests.js: line 45, col 17, \'subText\' is already defined.\nroutes/editing-tests.js: line 53, col 15, \'obj\' is already defined.\nroutes/editing-tests.js: line 56, col 12, Missing semicolon.\nroutes/editing-tests.js: line 59, col 16, \'obj\' used out of scope.\nroutes/editing-tests.js: line 65, col 46, Expected \'!==\' and instead saw \'!=\'.\nroutes/editing-tests.js: line 82, col 29, \'response\' is defined but never used.\nroutes/editing-tests.js: line 8, col 20, \'$\' is not defined.\nroutes/editing-tests.js: line 77, col 22, \'$\' is not defined.\n\n10 errors');
});
