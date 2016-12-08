define('page/tests/acceptance/dashboard-test', ['exports', 'qunit', 'page/tests/helpers/module-for-acceptance'], function (exports, _qunit, _pageTestsHelpersModuleForAcceptance) {

  (0, _pageTestsHelpersModuleForAcceptance['default'])('Acceptance | dashboard');

  (0, _qunit.test)('visiting /dashboard', function (assert) {
    visit('/dashboard');

    andThen(function () {
      assert.equal(currentURL(), '/dashboard');
    });
  });
});