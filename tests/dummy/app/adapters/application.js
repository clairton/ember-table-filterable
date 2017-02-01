import DS from 'ember-data';
import Config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: Config.host,
  namespace: Config.namespace
});
