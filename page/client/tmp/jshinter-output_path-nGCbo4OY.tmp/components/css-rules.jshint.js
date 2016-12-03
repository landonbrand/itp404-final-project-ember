QUnit.module('JSHint | components/css-rules.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/css-rules.js should pass jshint.\ncomponents/css-rules.js: line 22, col 31, \'event\' is defined but never used.\n\n1 error');
});
