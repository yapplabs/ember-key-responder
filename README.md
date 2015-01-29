# Ember-key-responder

Cocoa inspried keyResponder for Ember.js.

ember-key-responder will delegate keyEvents to the current keyResponder.  Typically a
keyResponder is a `view`, or a `component`. As in complex applications various
keyResponders enter and leave the system, but only 1 keyResponder can be active
at any given point in time a stack of them is maintained. They top of the stack is
considered the current keyResponder.

This allows for modals, or other UI components to naturally become the default
responder, as they enter they are pushed onto the stack, and resign themselves
as they are dropped from the stack.

## Example

Given, the following components `component-a` and `component-b`

```js
// component-a.js | component-b.js
export default Ember.Component.extend({
  acceptsKeyResponder: true,
  didInsertElement: function() {
    this.becomeKeyResponder(false /* true: replace | false: pushOnToStack*/);
    this._super();
  },
  
  willDestroyElement: function() {
    this.resignKeyResponder();
    this._super();
  },

  moveUp: function() {
    // do something
  }
});
```

the template layout of:

```hbs
{{#component-a}
  {{#if showB}}
    {{#component-b}
    {{/component-b}

  {{/if}}
{{/component-a}
```

and `showB` is `true

the stack of key responders is

```
component-b // <= current keyResponder 
component-a
```

key events captured will be delegated to `component-b`

if `showB` becomes `false` then `component-b` will be removed and the stack becomes

```
component-a // <- current keyResponder
```

at this point in time, key events will be delegated to `component-a`

## Further Usage

* `ember install:npm ember-key-responder`

```js
// app/views/key-reponder-base.js

export default Ember.View.extend({
  acceptsKeyResponder: true,
  didInsertElement: function() {
    this.becomeKeyResponder(false /* true: replace | false: pushOnToStack*/);
    this._super();
  },
  
  willDestroyElement: function() {
    this.resignKeyResponder();
    this._super();
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
