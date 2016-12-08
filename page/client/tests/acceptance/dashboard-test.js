import { test } from 'qunit';
import moduleForAcceptance from 'page/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | dashboard');

test('visiting /dashboard', function(assert) {
  visit('/dashboard');

  andThen(function() {
    assert.equal(currentURL(), '/dashboard');
  });
});
