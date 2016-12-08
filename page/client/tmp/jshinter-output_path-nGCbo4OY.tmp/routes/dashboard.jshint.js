QUnit.module('JSHint | routes/dashboard.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/dashboard.js should pass jshint.\nroutes/dashboard.js: line 6, col 33, Missing semicolon.\nroutes/dashboard.js: line 11, col 16, Missing semicolon.\nroutes/dashboard.js: line 16, col 17, Expected \'===\' and instead saw \'==\'.\nroutes/dashboard.js: line 16, col 29, Expected \'{\' and instead saw \'callback\'.\nroutes/dashboard.js: line 25, col 20, Missing semicolon.\nroutes/dashboard.js: line 28, col 19, Missing semicolon.\nroutes/dashboard.js: line 31, col 2, Missing semicolon.\nroutes/dashboard.js: line 15, col 1, \'jQuery\' is not defined.\nroutes/dashboard.js: line 17, col 10, \'$\' is not defined.\n\n9 errors');
});
