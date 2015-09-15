import Ember from 'ember';

const { Mixin, on } = Ember;

const ApplicationViewMixin = Mixin.create({
  delegateToKeyResponder: on('keyUp', function(event) {
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

export default {
  name: 'ember-key-responder-instance',

  initialize() {
    // Handle 1.12.x case, where signature is
    //  initialize(instance) {...}
    const instance = arguments[1] || arguments[0];
    const container = !!arguments[1] ? arguments[0] : instance.container;

    // Set up a handler on the ApplicationView for keyboard events that were
    // not handled by the current KeyResponder yet
    let ApplicationView = container.lookupFactory ?
      container.lookupFactory('view:application') :
      instance.resolveRegistration('view:application');

    ApplicationView = ApplicationView.extend(ApplicationViewMixin);

    //TextField/TextArea are currently uninjectable, so we're going to hack our
    //way in
    Ember.TextSupport.reopen({
      keyResponder: Ember.computed(function() {
        return container.lookup('key-responder:main');
      }).readOnly()
    });
  }
};
