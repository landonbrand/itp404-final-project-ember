define('page/tests/acceptance/page/1-test', ['exports', 'qunit', 'page/tests/helpers/module-for-acceptance'], function (exports, _qunit, _pageTestsHelpersModuleForAcceptance) {

  (0, _pageTestsHelpersModuleForAcceptance['default'])('Acceptance | page/1');

  (0, _qunit.test)('visiting /page/1', function (assert) {
    visit('/page/1');
    click("#edit");

    andThen(function () {
      assert.equal(find("#newNode").text(), "create tag");
    });
  });

  (0, _qunit.test)('visiting /page/1', function (assert) {
    visit('/page/1');
    click("#edit");

    andThen(function () {
      assert.equal(find("#newClass").text(), "add class");
    });
  });

  (0, _qunit.test)('visiting /page/1', function (assert) {
    visit('/page/1');
    click("#edit");
    click("#newClass");

    andThen(function () {
      assert.equal(find(".class-list-item").text().trim(), "new-class");
    });
  });
});