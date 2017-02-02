import Ember from 'ember';
import layout from '../templates/components/table-filterable';

export default Ember.Component.extend({
  layout,
  store: Ember.inject.service(),
  type: null,
  page: 1,
  per_page: 10,
  direction: 'ASC',
  operators: ['=*'],
  directions: ['ASC', 'DESC'],
  sort: 'id',
  filters: Ember.A([]),
  attributes: [],

  onInit: Ember.on('init', function(){
    this.send('createFilter');
    this.send('createAttributes');
  }),


  params: Ember.computed('filters.[]', 'page', 'per_page', 'direction', 'sort', function(){
    let params = {};
    this.get('filters').forEach((filter) => {
      params[filter.attribute] = `${filter.operator}${filter.value}`;
    });
    let self = this;
    ['page', 'per_page', 'direction', 'sort'].forEach((p) => {
      let value = self.get(p);
      if(!Ember.isEmpty(value)){
        params[p] = value;
      }
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

    createAttributes(){
      if(this.get('store') && Ember.isEmpty(this.get('attributes'))){
        if(!Ember.isNone(this.get('type'))){
            let model = this.get('store').modelFor(this.get('type'));
            let attributes = Ember.get(model, 'attributes');
            this.set('attributes', attributes);
        }
      }
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
