QUnit.module('JSHint | routes/signup.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/signup.js should pass jshint.\nroutes/signup.js: line 31, col 17, Expected \'===\' and instead saw \'==\'.\nroutes/signup.js: line 31, col 29, Expected \'{\' and instead saw \'callback\'.\nroutes/signup.js: line 40, col 20, Missing semicolon.\nroutes/signup.js: line 43, col 19, Missing semicolon.\nroutes/signup.js: line 46, col 2, Missing semicolon.\nroutes/signup.js: line 30, col 1, \'jQuery\' is not defined.\nroutes/signup.js: line 32, col 10, \'$\' is not defined.\n\n7 errors');
});
