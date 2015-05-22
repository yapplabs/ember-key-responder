import Ember from 'ember';

export default {
  name: 'ember-key-responder-instance',

  initialize(instance) {

    // Set up a handler on the ApplicationView for keyboard events that were
    // not handled by the current KeyResponder yet
    instance.container.lookupFactory('view:application').reopen({
      delegateToKeyResponder: Ember.on('keyUp', function(event) {
        var currentKeyResponder = this.get('keyResponder.current');
        if (currentKeyResponder && currentKeyResponder.get('isVisible')) {
          // check to see if the event target is the keyResponder or the
          // keyResponders parents.  if so, no need to dispatch as it has
          // already had a chance to handle this event.
          var id =  '#' + currentKeyResponder.get('elementId');
          if (Ember.$(event.target).closest(id).length === 1) {
            return true;
          }
          return currentKeyResponder.respondToKeyEvent(event, currentKeyResponder);
        }
        return true;
      })
    });
  }
};
