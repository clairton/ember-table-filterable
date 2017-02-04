import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('table-filterable', 'Unit | Component | table filterable', {
  // Specify the other units that are required for this test
  needs: ['model:pessoa'],
  unit: true
});

test('build params', function(assert) {
  let component = this.subject({
    type: 'pessoa',
    filters: [
      {attribute: 'nome', operator: '==', value:'Clairton'}
    ],
    page: 12,
    per_page: 100,
    direction: 'DESC',
    sort: 'id'
  });
  assert.deepEqual(component.get('params'), {
    nome: '==Clairton',
    page: 12,
    per_page: 100,
    direction: 'DESC',
    sort: 'id'
  });
});

test('calc last_page', function(assert) {
  let component = this.subject({total:11, per_page: 5});
  assert.equal(component.get('last_page'), 3);
});
