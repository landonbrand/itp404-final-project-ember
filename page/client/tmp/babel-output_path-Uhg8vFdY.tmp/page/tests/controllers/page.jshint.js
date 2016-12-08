define('page/tests/controllers/page.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/page.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/page.js should pass jshint.\ncontrollers/page.js: line 371, col 22, \'Page\' is not defined.\ncontrollers/page.js: line 380, col 22, \'Page\' is not defined.\n\n2 errors');
  });
});