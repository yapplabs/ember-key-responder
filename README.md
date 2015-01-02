# Ember-key-responder

This README outlines the details of collaborating on this Ember addon.

## Usage

* `ember install:npm ember-key-responder`

```js
// app/views/key-reponder-base.js

export default Ember.View.extend({
  acceptsKeyResponder: true,
  didInsertElement: function() {
    this.becomeKeyResponder();
    this._super();
  },
  
  willDestroyElement: function() {
    this.resignKeyResponder();
    this._super();
  },
  
  moveUp: function() {
    // do something
  },
  
  moveDown: function() {
    // do something
  }
});
```

Events:

```js
export var KEY_EVENTS = {
  8: 'deleteBackward',
  9: 'insertTab',
  13: 'insertNewline',
  27: 'cancel',
  32: 'insertSpace',
  37: 'moveLeft',
  38: 'moveUp',
  39: 'moveRight',
  40: 'moveDown',
  46: 'deleteForward'
};

export var MODIFIED_KEY_EVENTS = {
  8: 'deleteForward',
  9: 'insertBacktab',
  37: 'moveLeftAndModifySelection',
  38: 'moveUpAndModifySelection',
  39: 'moveRightAndModifySelection',
  40: 'moveDownAndModifySelection'
};
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
