import { test } from 'qunit';
import moduleForAcceptance from 'page/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | page/1');

test('visiting /page/1', function(assert) {
  visit('/page/1');
  click("#edit");

  andThen(function() {
    assert.equal(find("#newNode").text(), "create tag");
  });
});

test('visiting /page/1', function(assert) {
  visit('/page/1');
  click("#edit");

  andThen(function() {
    assert.equal(find("#newClass").text(), "add class");
  });
});

test('visiting /page/1', function(assert) {
  visit('/page/1');
  click("#edit");
  click("#newClass");

  andThen(function() {
    assert.equal(find(".class-list-item").text().trim(), "new-class");
  });
});
