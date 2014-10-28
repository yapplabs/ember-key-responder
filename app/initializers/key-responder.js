import Ember from 'ember';

export default {
  name: 'ember-key-responder',

  initialize: function(container, application) {
    application.inject('view', 'keyResponder', 'key-responder:main');
    application.inject('component', 'keyResponder', 'key-responder:main');

    //TextField/TextArea are currently uninjectable, so we're going to hack our
    //way in
    Ember.TextSupport.reopen({
      keyResponder: Ember.computed(function() {
        return this.container.lookup('key-responder:main');
      }).readOnly()
    });

    // Set up a handler on the document for keyboard events that are not
    // handled by Ember's event dispatcher.
    Ember.$(document).on('keyup.outside_ember_event_delegation', null,
                         function(event) {

      if (Ember.$(event.target).closest('.ember-view').length === 0) {
        var keyResponder = container.lookup('key-responder:main');
        var currentKeyResponder = keyResponder.get('current');
        if (currentKeyResponder && currentKeyResponder.get('isVisible')) {
          return currentKeyResponder.respondToKeyEvent(event, currentKeyResponder);
        }
      }

      return true;
    });

    // Set up a handler on the ApplicationView for keyboard events that were
    // not handled by the current KeyResponder yet
    container.lookupFactory('view:application').reopen({
      delegateToKeyResponder: function(event) {
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
      }.on('keyUp')
    });
  }
};
