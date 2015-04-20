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
  }
};
