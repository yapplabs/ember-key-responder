import Ember from 'ember';

export default Ember.Component.extend({
acceptsKeyResponder: true,
  didInsertElement: function() {
    this.becomeKeyResponder(false /* true: replace | false: pushOnToStack*/);
    this._super.apply(this, arguments);
  },

  willDestroyElement: function() {
    this.resignKeyResponder();
    this._super.apply(this, arguments);
  },
});
