define('page/tests/controllers/page.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/page.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/page.js should pass jshint.\ncontrollers/page.js: line 36, col 47, Missing semicolon.\ncontrollers/page.js: line 40, col 17, \'i\' is already defined.\ncontrollers/page.js: line 50, col 14, \'pageCSS\' used out of scope.\ncontrollers/page.js: line 160, col 76, Expected \'!==\' and instead saw \'!=\'.\ncontrollers/page.js: line 160, col 86, Missing semicolon.\ncontrollers/page.js: line 178, col 50, Expected \'===\' and instead saw \'==\'.\ncontrollers/page.js: line 179, col 25, Expected \'===\' and instead saw \'==\'.\ncontrollers/page.js: line 179, col 44, Expected \'===\' and instead saw \'==\'.\ncontrollers/page.js: line 200, col 50, Expected \'===\' and instead saw \'==\'.\ncontrollers/page.js: line 214, col 47, Expected \'!==\' and instead saw \'!=\'.\ncontrollers/page.js: line 225, col 50, Expected \'===\' and instead saw \'==\'.\ncontrollers/page.js: line 225, col 12, Confusing use of \'!\'.\ncontrollers/page.js: line 240, col 50, Expected \'===\' and instead saw \'==\'.\ncontrollers/page.js: line 242, col 35, Missing semicolon.\ncontrollers/page.js: line 249, col 46, Missing semicolon.\ncontrollers/page.js: line 298, col 42, Expected \'===\' and instead saw \'==\'.\ncontrollers/page.js: line 306, col 34, Expected \'===\' and instead saw \'==\'.\ncontrollers/page.js: line 330, col 47, The \'__proto__\' property is deprecated.\ncontrollers/page.js: line 339, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/page.js: line 344, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/page.js: line 371, col 2, Missing semicolon.\ncontrollers/page.js: line 375, col 18, Expected \'===\' and instead saw \'==\'.\ncontrollers/page.js: line 380, col 2, Missing semicolon.\ncontrollers/page.js: line 383, col 19, Expected \'===\' and instead saw \'==\'.\ncontrollers/page.js: line 429, col 2, Missing semicolon.\ncontrollers/page.js: line 52, col 22, \'$\' is not defined.\ncontrollers/page.js: line 403, col 16, \'$\' is not defined.\ncontrollers/page.js: line 376, col 22, \'Page\' is not defined.\ncontrollers/page.js: line 385, col 22, \'Page\' is not defined.\ncontrollers/page.js: line 2, col 8, \'ClassListItemComponent\' is defined but never used.\ncontrollers/page.js: line 329, col 10, \'byValue\' is defined but never used.\n\n31 errors');
  });
});