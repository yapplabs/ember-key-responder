import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this.set('events', Ember.A());
  }
});
