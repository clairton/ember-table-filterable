import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table-filterable', 'Integration | Component | table filterable', {
  integration: true
});

test('calc last_page', function(assert) {
  this.render(hbs`{{table-filterable type='pessoa' total=11 per_page=5}}`);
  assert.equal(this.$('.last_page').text().trim(), 3);
});
