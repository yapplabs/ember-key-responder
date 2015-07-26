import Ember from 'ember';

import startApp from '../../tests/helpers/start-app';
import { module, test } from 'qunit';

var App;

module('Acceptance - Demo page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

function pressTab() {
  let e = Ember.$.Event("keyup", {keyCode: 9, which: 9});
  Ember.$('body').trigger(e);
}

test('Load the demo page', function(assert) {
  visit('/');

  andThen(function () {
    let eventLiArray = find('#events ul li');
    assert.equal(eventLiArray.length, 0, 'No events fired yet');

    const componentC = find('.component-c');
    assert.equal(componentC.length, 0, 'Component c is initially inactive');

    pressTab();

    eventLiArray = find('#events ul li');
    assert.equal(eventLiArray.length, 1, '1 event fired');
    assert.equal(eventLiArray[0].innerText, 'a - insertTab', 'correct event name and key responder');
  });

  click('#example label:first-child .ember-checkbox');

  andThen(function () {
    const componentC = find('.component-c');
    assert.ok(componentC, 'Component c is active, after user activation');

    pressTab();
    pressTab();

    let eventLiArray = find('#events ul li');
    assert.equal(eventLiArray.length, 3, '3 events fired');

    eventLiArray = find('#events ul li');
    assert.equal(eventLiArray[1].innerText, 'c - insertTab', 'correct event name and key responder');
  });
});
