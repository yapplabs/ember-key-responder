import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | key responder', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /', function(assert) {
  visit('/');

  const textInputSelector = '#text-input input';
  const textInput = Ember.$(textInputSelector);

  andThen(function() {
    textInput.focusin();
  });

  fillIn(textInputSelector, 'taco');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
