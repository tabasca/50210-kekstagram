'use strict';

var utils = require('./utils');
var bodyElement = document.querySelector('body');
var exampleForDel = document.querySelector('.filters');

var Component = function(el) {
  this.componentElement = el;
  this.componentElement = document.createElement('div');
  this.componentElement.innerHTML = 'Ololo trololo';
  this.componentElement.classList.add('ololowe4kilolo');;
  bodyElement.appendChild(this.componentElement);

  this.componentElement.addEventListener('click', this._onComponentClick.bind(this));
  exampleForDel.addEventListener('click', this.remove.bind(this));
};

Component.prototype._onComponentClick = function(evt) {
  if (evt.target.classList.contains('ololowe4kilolo')) {
    evt.preventDefault();
    this.componentElement.innerHTML = 'trololooooooooooooo';
  }
};

Component.prototype.remove = function(evt) {
  if (!evt.target.classList.contains('ololowe4kilolo')) {
    evt.preventDefault();
    this.componentElement.removeEventListener('click', this._onComponentClick);
    exampleForDel.removeEventListener('click', this.remove);
    this.componentElement.parentNode.removeChild(this.componentElement);
  }
};

module.exports = new Component();
