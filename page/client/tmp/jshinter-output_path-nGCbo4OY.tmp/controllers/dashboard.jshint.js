QUnit.module('JSHint | controllers/dashboard.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/dashboard.js should pass jshint.\ncontrollers/dashboard.js: line 56, col 18, Expected \'{\' and instead saw \'return\'.\ncontrollers/dashboard.js: line 57, col 54, Missing semicolon.\ncontrollers/dashboard.js: line 51, col 32, \'e\' is defined but never used.\ncontrollers/dashboard.js: line 81, col 8, Missing semicolon.\ncontrollers/dashboard.js: line 5, col 15, \'Auth0\' is not defined.\ncontrollers/dashboard.js: line 82, col 22, \'$\' is not defined.\n\n6 errors');
});
