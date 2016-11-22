define('page/tests/routes/editing-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/editing-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/editing-tests.js should pass jshint.\nroutes/editing-tests.js: line 5, col 9, \'cursorPos\' is defined but never used.\nroutes/editing-tests.js: line 6, col 9, \'nodes\' is defined but never used.\nroutes/editing-tests.js: line 7, col 20, \'$\' is not defined.\n\n3 errors');
  });
});