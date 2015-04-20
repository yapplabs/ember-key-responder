import Ember from 'ember';

export default {
  name: 'ember-key-responder',

  initialize: function(container, application) {
    application.inject('view', 'keyResponder', 'key-responder:main');
    application.inject('component', 'keyResponder', 'key-responder:main');
  }
};
