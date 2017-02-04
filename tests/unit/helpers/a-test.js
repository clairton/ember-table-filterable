
import { a } from 'dummy/helpers/a';
import { module, test } from 'qunit';

module('Unit | Helper | a');

test('shoud be 3 elements in array', function(assert) {
  let result = a([42, 43, 44]);
  assert.deepEqual(result, [42, 43, 44]);
});

