import Ember from 'ember';

export default Ember.Component.extend({
acceptsKeyResponder: true,
  didInsertElement: function() {
    this.becomeKeyResponder(false /* true: replace | false: pushOnToStack*/);
    this._super(...arguments);
  },

  willDestroyElement: function() {
    this.resignKeyResponder();
    this._super(...arguments);
  },

  deleteBackward: log('deleteBackward'),
  insertTab:      log('insertTab'),
  insertNewline:  log('insertNewline'),
  cancel:         log('cancel'),
  insertSpace:    log('insertSpace'),
  moveLeft:       log('moveLeft'),
  moveUp:         log('moveUp'),
  moveRight:      log('moveRight'),
  moveDown:       log('moveDown'),
  deleteForward:  log('deleteForward')
});

function log(eventName) {
  return function() {
    this.container.lookup('controller:application').get('events').unshiftObject({
      viewName: this.get('name'),
      eventName: eventName
    });
  };
}
