'use strict';

var BaseComponent = require('./base-component');
var utils = require('./utils');

var ChildComponent = function(el) {
  BaseComponent(this, el);
};

utils.inherit(ChildComponent, BaseComponent);

ChildComponent.prototype.remove = function() {
  BaseComponent.prototype.remove.call(this);
};

module.exports = new ChildComponent();
