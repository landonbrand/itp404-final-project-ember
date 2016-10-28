QUnit.module('JSHint | routes/template-tests.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/template-tests.js should pass jshint.\nroutes/template-tests.js: line 70, col 6, Missing semicolon.\n\n1 error');
});
