QUnit.module('JSHint | routes/signup.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/signup.js should pass jshint.\nroutes/signup.js: line 5, col 33, Missing semicolon.\nroutes/signup.js: line 10, col 16, Missing semicolon.\nroutes/signup.js: line 6, col 9, \'promise\' is defined but never used.\nroutes/signup.js: line 16, col 11, \'promise\' is defined but never used.\nroutes/signup.js: line 32, col 17, Expected \'===\' and instead saw \'==\'.\nroutes/signup.js: line 32, col 29, Expected \'{\' and instead saw \'callback\'.\nroutes/signup.js: line 41, col 20, Missing semicolon.\nroutes/signup.js: line 44, col 19, Missing semicolon.\nroutes/signup.js: line 47, col 2, Missing semicolon.\nroutes/signup.js: line 31, col 1, \'jQuery\' is not defined.\nroutes/signup.js: line 33, col 10, \'$\' is not defined.\n\n11 errors');
});
