import Ember from 'ember';
import layout from '../templates/components/table-filterable';

export default Ember.Component.extend({
  layout,
  store: Ember.inject.service(),
  type: null,
  page: 1,
  per_page: 10,
  direction: 'ASC',

  onInit: Ember.on('init', function(){
    this.send('createFilter');
  }),

  operators: ['=*'],
  directions: ['ASC', 'DESC'],

  filters: Ember.A([]),

  attributes: Ember.computed('type', function(){
    let attributes = [];
    if(!Ember.isNone(this.get('type'))){
      let model = this.get('store').modelFor(this.get('type'));
      attributes = Ember.get(model, 'attributes');
    }
    return attributes;
  }),

  params: Ember.computed('filters.[]', 'page', 'per_page', 'direction', function(){
    let params = {};
    this.get('filters').forEach((filter) => {
      params[filter.attribute] = `${filter.operator}${filter.value}`;
    });
    let self = this;
    ['page', 'per_page', 'direction'].forEach((p) => {
      params[p] = self.get(p);
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
