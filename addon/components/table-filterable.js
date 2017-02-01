import Ember from 'ember';
import layout from '../templates/components/table-filterable';

export default Ember.Component.extend({
  layout,
  store: Ember.inject.service(),
  type: null,

  onInit: Ember.on('init', function(){
    this.send('createFilter');
  }),

  operators: ['=*'],

  filters: Ember.A([
    {attribute: 'nome', operator: '=*', value: 'Clairton'}
  ]),

  attributes: Ember.computed('type', function(){
    let attributes = [];
    if(!Ember.isNone(this.get('type'))){
      let model = this.get('store').modelFor(this.get('type'));
      attributes = Ember.get(model, 'attributes');
    }
    return attributes;
  }),

  params: Ember.computed('filters.[]', function(){
    let params = {};
    this.get('filters').forEach((filter) => {
      params[filter.attribute] = `${filter.operator}${filter.value}`;
    });
    return params;
  }),

  records: Ember.computed('type', 'params.[]', function(){
    return this.get('store').query(this.get('type'), this.get('params'));
  }),

  actions: {
    createFilter(){
      let filter = Ember.Object.create({
          attribute: null, operator: null, value: null
      });
      this.set('filter', filter);
    },

    pushFilter(filter){
      this.get('filters').pushObject(filter);
      this.send('createFilter');
    },

    removeFilter(filter){
      this.get('filters').removeObject(filter);
    }
  }
});
