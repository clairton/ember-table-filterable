import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table-filterable', 'Integration | Component | table filterable', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{table-filterable type='pessoa'}}`);
  assert.ok(this.$());
});
