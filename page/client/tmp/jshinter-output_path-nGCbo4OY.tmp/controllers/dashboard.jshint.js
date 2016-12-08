QUnit.module('JSHint | controllers/dashboard.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/dashboard.js should pass jshint.\ncontrollers/dashboard.js: line 70, col 18, Expected \'{\' and instead saw \'return\'.\ncontrollers/dashboard.js: line 71, col 54, Missing semicolon.\ncontrollers/dashboard.js: line 65, col 32, \'e\' is defined but never used.\ncontrollers/dashboard.js: line 5, col 15, \'Auth0\' is not defined.\n\n4 errors');
});
