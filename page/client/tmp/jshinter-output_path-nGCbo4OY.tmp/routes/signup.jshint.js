QUnit.module('JSHint | routes/signup.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/signup.js should pass jshint.\nroutes/signup.js: line 29, col 17, Expected \'===\' and instead saw \'==\'.\nroutes/signup.js: line 29, col 29, Expected \'{\' and instead saw \'callback\'.\nroutes/signup.js: line 38, col 20, Missing semicolon.\nroutes/signup.js: line 41, col 19, Missing semicolon.\nroutes/signup.js: line 44, col 2, Missing semicolon.\nroutes/signup.js: line 28, col 1, \'jQuery\' is not defined.\nroutes/signup.js: line 30, col 10, \'$\' is not defined.\n\n7 errors');
});
