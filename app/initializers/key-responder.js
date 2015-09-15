import Ember from 'ember';
import keyResponderInstanceInitializer from '../instance-initializers/key-responder';

var EMBER_VERSION_REGEX = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:(?:\-(alpha|beta)\.([0-9]+)(?:\.([0-9]+))?)?)?(?:\+(canary))?(?:\.([0-9abcdef]+))?(?:\-([A-Za-z0-9\.\-]+))?(?:\+([A-Za-z0-9\.\-]+))?$/;

/**
 * VERSION_INFO[i] is as follows:
 *
 * 0  complete version string
 * 1  major version
 * 2  minor version
 * 3  trivial version
 * 4  pre-release type (optional: "alpha" or "beta" or undefined for stable releases)
 * 5  pre-release version (optional)
 * 6  pre-release sub-version (optional)
 * 7  canary (optional: "canary", or undefined for stable releases)
 * 8  SHA (optional)
 */
var VERSION_INFO = EMBER_VERSION_REGEX.exec(Ember.VERSION);


export default {
  name: 'ember-key-responder',

  initialize() {
    const application = arguments[1] || arguments[0];
    const registry = !!arguments[1] ? arguments[0] : application.registry;
    var isPre1dot12 = parseInt(VERSION_INFO[1], 10) < 2 && parseInt(VERSION_INFO[2], 10) < 12;
    const container = application.__container__;

    application.inject('view', 'keyResponder', 'key-responder:main');
    application.inject('component', 'keyResponder', 'key-responder:main');

    // Set up a handler on the document for keyboard events that are not
    // handled by Ember's event dispatcher.
    Ember.$(document).on('keyup.outside_ember_event_delegation', null, event => {

      if (Ember.$(event.target).closest('.ember-view').length === 0) {
        var keyResponder = container.lookup('key-responder:main');
        var currentKeyResponder = keyResponder.get('current');
        if (currentKeyResponder && currentKeyResponder.get('isVisible')) {
          return currentKeyResponder.respondToKeyEvent(event, currentKeyResponder);
        }
      }

      return true;
    });

    if (isPre1dot12) {
      // For versions before 1.12.0, we have to call the instanceInitializer
      keyResponderInstanceInitializer.initialize(registry, application);
    }
  }
};
