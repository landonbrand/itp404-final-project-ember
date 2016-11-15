QUnit.module('JSHint | helpers/tag-start.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'helpers/tag-start.js should pass jshint.\nhelpers/tag-start.js: line 5, col 14, Missing semicolon.\n\n1 error');
});
