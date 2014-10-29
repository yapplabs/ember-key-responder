# Ember-key-responder

This README outlines the details of collaborating on this Ember addon.

## Usage

* `npm install --save-dev ember-key-responder`

```js
// app/views/key-reponder-base.js
import KeyResponderMixin from 'ember-key-responder/mixin';

export default Ember.View.extend(KeyResponderMixin, {
  acceptsKeyResponder: true,
  didInsertElement: function() {
    this.becomeKeyResponder();
    this._super();
  },
  
  willDestroyElement: function() {
    this.resignKeyResponder();
    this._super();
  }
});
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
