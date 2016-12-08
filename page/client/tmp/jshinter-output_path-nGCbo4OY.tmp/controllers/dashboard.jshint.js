QUnit.module('JSHint | controllers/dashboard.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/dashboard.js should pass jshint.\ncontrollers/dashboard.js: line 53, col 18, Expected \'{\' and instead saw \'return\'.\ncontrollers/dashboard.js: line 54, col 54, Missing semicolon.\ncontrollers/dashboard.js: line 49, col 32, \'e\' is defined but never used.\ncontrollers/dashboard.js: line 83, col 29, \'response\' is defined but never used.\ncontrollers/dashboard.js: line 72, col 11, \'pageToAdd\' is defined but never used.\ncontrollers/dashboard.js: line 5, col 15, \'Auth0\' is not defined.\n\n6 errors');
});
