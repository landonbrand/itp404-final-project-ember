import Ember from 'ember';

export default Ember.Component.extend({
  // selectedTagsObserver: Ember.observer('selectedTags', function(){
  //   console.log(this.get('selectedTags'));
  // }),
  actions: {

    noStyle: function(){
      console.log("noStyle");
    },

    h1: function(){
      console.log(this.get("selectedTags"));
    },

    onChange: function(){
    }
  }
});
