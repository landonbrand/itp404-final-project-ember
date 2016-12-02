QUnit.module('JSHint | routes/template-tests.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/template-tests.js should pass jshint.\nroutes/template-tests.js: line 5, col 9, \'nodes\' is defined but never used.\nroutes/template-tests.js: line 7, col 20, \'$\' is not defined.\n\n2 errors');
});
