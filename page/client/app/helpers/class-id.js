import Ember from 'ember';

export function classId(params) {

  return "class-id-" + params;
}

export default Ember.Helper.helper(classId);
