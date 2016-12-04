QUnit.module('JSHint | routes/signup.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/signup.js should pass jshint.\nroutes/signup.js: line 18, col 9, Missing semicolon.\n\n1 error');
});
