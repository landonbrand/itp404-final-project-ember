QUnit.module('JSHint | controllers/page.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/page.js should pass jshint.\ncontrollers/page.js: line 53, col 29, \'response\' is defined but never used.\ncontrollers/page.js: line 356, col 22, \'Page\' is not defined.\ncontrollers/page.js: line 365, col 22, \'Page\' is not defined.\ncontrollers/page.js: line 380, col 5, \'cssPage\' is defined but never used.\n\n4 errors');
});
