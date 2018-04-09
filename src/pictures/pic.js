'use strict';

var getPictureElement = require('./get-picture-element');

var picturesContainer = document.querySelector('.pictures');

var Photo = function(data, container) {
  this.data = data;
  this.pictureElement = getPictureElement(this.data, container);
  this.pictureElement.addEventListener('click', this._onPhotoClick.bind(this));
  container.appendChild(this.pictureElement);
};

Photo.prototype._onPhotoClick = function(evt) {
  if (evt.target.src) {
    this.element = evt.target;
    this.elements = picturesContainer.querySelectorAll('img');
    for (var i in this.elements) {
      if (this.elements[i] === this.element) {
        break;
      }
    }
    location.hash = 'photo/' + this.data.id;
    evt.preventDefault();
  }
};

Photo.prototype.remove = function() {
  location.hash = '';
  this.pictureElement.removeEventListener('click', this._onPhotoClick);
  this.pictureElement.parentNode.removeChild(this.pictureElement);
};

module.exports = Photo;
