QUnit.module('JSHint | controllers/dashboard.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/dashboard.js should pass jshint.\ncontrollers/dashboard.js: line 88, col 8, Missing semicolon.\ncontrollers/dashboard.js: line 89, col 11, \'_this\' is already defined.\ncontrollers/dashboard.js: line 81, col 11, \'myPage\' is defined but never used.\ncontrollers/dashboard.js: line 5, col 15, \'Auth0\' is not defined.\ncontrollers/dashboard.js: line 90, col 22, \'$\' is not defined.\n\n5 errors');
});
