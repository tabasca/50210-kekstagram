'use strict';

var getPictureElement = require('./get-picture-element');

var picturesContainer = document.querySelector('.pictures');

var Photo = function(data, container) {
  var pictureElement = getPictureElement(data, container);
  this._onPhotoClick = function(evt) {
    if (evt.target.src) {
      var element = evt.target;
      var elements = picturesContainer.querySelectorAll('img');
      for (var i in elements) {
        if (elements[i] === element) {
          break;
        }
      }
      location.hash = 'photo/' + data.url;
      evt.preventDefault();
    }
  };

  this.remove = function() {
    location.hash = '';
    pictureElement.removeEventListener('click', this._onPhotoClick);
    pictureElement.parentNode.removeChild(pictureElement);
  };

  pictureElement.addEventListener('click', this._onPhotoClick);
  container.appendChild(pictureElement);
};

module.exports = Photo;
