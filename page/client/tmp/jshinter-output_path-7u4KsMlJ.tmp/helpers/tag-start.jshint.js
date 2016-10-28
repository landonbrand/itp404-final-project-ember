QUnit.module('JSHint | helpers/tag-start.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'helpers/tag-start.js should pass jshint.\nhelpers/tag-start.js: line 10, col 14, Expected \'!==\' and instead saw \'!=\'.\nhelpers/tag-start.js: line 19, col 14, Expected \'!==\' and instead saw \'!=\'.\nhelpers/tag-start.js: line 34, col 4, Missing semicolon.\nhelpers/tag-start.js: line 37, col 37, Missing semicolon.\n\n4 errors');
});
