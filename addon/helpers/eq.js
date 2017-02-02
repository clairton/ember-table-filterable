import Ember from 'ember';

export function eq() {
  return arguments[0] === arguments[1];
}

export default Ember.Helper.helper(eq);
