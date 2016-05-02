'use strict';

var getPictureElement = require('./get-picture-element');
var gallery = require('./gallery');

var picturesContainer = document.querySelector('.pictures');

var Photo = function(data, container) {
  var pictureElement = getPictureElement(data, container);
  var _onPhotoClick = function(evt) {
    if (evt.target.src) {
      var element = evt.target;
      var elements = picturesContainer.querySelectorAll('img');
      for (var i in elements) {
        if (elements[i] === element) {
          break;
        }
      }
      gallery.showGallery(i);
      evt.preventDefault();
    }
  };

  this.remove = function() {
    pictureElement.removeEventListener('click', _onPhotoClick);
    pictureElement.parentNode.removeChild(pictureElement);
  };

  pictureElement.addEventListener('click', _onPhotoClick);
  container.appendChild(pictureElement);
};

module.exports = Photo;
