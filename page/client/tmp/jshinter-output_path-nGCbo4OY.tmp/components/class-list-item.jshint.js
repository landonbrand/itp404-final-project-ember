QUnit.module('JSHint | components/class-list-item.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/class-list-item.js should pass jshint.\ncomponents/class-list-item.js: line 5, col 32, Expected \'===\' and instead saw \'==\'.\n\n1 error');
});
