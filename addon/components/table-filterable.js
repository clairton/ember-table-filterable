import Ember from 'ember';
import layout from '../templates/components/table-filterable';

export default Ember.Component.extend({
  layout,
  store: Ember.inject.service(),
  type: null,
  page: 1,
  per_page: 10,
  direction: 'ASC',
  operators: {
    '==':  'Igual',
    '=*': 'Igual ignorando maisculas e minusculas',
    '*': 'Contém',
    '!*':  'Não Contém',
    '^':  'Começa Com',
    '$':  'Termina Com',
    '!^':  'Não Começa Com',
    '!$':  'Não Termina Com',
    '<>':  'Diferente',
    '∃':  'Existe',
    '∅':  'Nulo',
    '!∅':  'Não Nulo',
    '>':  'Maior',
    '>=':  'Maior ou Igual',
    '<':  'Menor',
    '<=':  'Menor ou Igual'
  },
  directions: ['ASC', 'DESC'],
  sort: 'id',
  filters: Ember.A([]),
  attributes: [],
  meta: {total: 0},
  total: Ember.computed.alias('meta.total'),

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

  setMeta: Ember.observer('records.[]', function(){
    let self = this;
    this.get('records').then((records) => {
      self.set('meta', records.get('meta'));
    });
  }),

  records: Ember.computed('type', 'params.[]', function(){
    let self = this;
    return self.get('store').query(self.get('type'), self.get('params'));
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
