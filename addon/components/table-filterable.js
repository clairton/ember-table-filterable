import Ember from 'ember';
import layout from '../templates/components/table-filterable';

export default Ember.Component.extend({
  layout,
  store: Ember.inject.service(),
  type: null,
  filters: [
    {path: 'nome', operator: '=*', value: 'Clairton'}
  ],

  attributes: Ember.computed('type', function(){
    let model = this.get('store').modelFor(this.get('type'));
    var attributes = Ember.get(model, 'attributes');
    return attributes;
  }),

  params: Ember.computed('filters', function(){
    let params = {};
    this.get('filters').forEach((filter) => {
      params[filter.path] = `${filter.operator}${filter.value}`;
    });
    return params;
  }),

  records: Ember.computed('type', 'params', function(){
    return this.get('store').query(this.get('type'), this.get('params'));
  }),
});
