QUnit.module('JSHint | routes/page.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/page.js should pass jshint.\nroutes/page.js: line 5, col 9, \'cursorPos\' is defined but never used.\nroutes/page.js: line 6, col 9, \'nodes\' is defined but never used.\n\n2 errors');
});
