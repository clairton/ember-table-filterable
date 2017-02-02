import { eq } from 'dummy/helpers/eq';
import { module, test } from 'qunit';

module('Unit | Helper | eq');

test('===', function(assert) {
  let result = eq(2, 2);
  assert.ok(result);
});

test('!==', function(assert) {
  let result = eq(2, 3);
  assert.ok(!result);
});

test('==', function(assert) {
  let result = eq(2, '2');
  assert.ok(!result);
});

test('!=', function(assert) {
  let result = eq(2, '3');
  assert.ok(!result);
});

