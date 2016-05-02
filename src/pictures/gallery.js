'use strict';

var utils = require('../utils');

var Gallery = function() {
  var self = this;

  var galleryContainer = document.querySelector('.gallery-overlay');
  var closeGallery = galleryContainer.querySelector('.gallery-overlay-close');
  var previewPicture = galleryContainer.querySelector('.gallery-overlay-image');
  var galleryLikes = galleryContainer.querySelector('.likes-count');
  var galleryComments = galleryContainer.querySelector('.comments-count');

  var galleryPictures = [];
  var activePicture = 0;

  this.gallery = function(pictures) {
    galleryPictures = pictures;
  };

  this.showGallery = function(i) {
    activePicture = i;
    galleryContainer.classList.remove('invisible');
    self.showPicture(activePicture);

    window.addEventListener('keydown', this._onDocumentKeydown);
    galleryContainer.addEventListener('click', this._onCloseBtnClick);
    galleryContainer.addEventListener('click', this._onPhotoClick);
  };

  this._onPhotoClick = function(evt) {
    if (evt.target.classList.contains('gallery-overlay-image')) {
      activePicture++;
      self.showPicture();
    } else {
      evt.preventDefault();
      self.hideGallery();
    }
  };

  this._onCloseBtnClick = function(evt) {
    if (evt.target.classList.contains('gallery-overlay-close')) {
      closeGallery.addEventListener('click', function(evtt) {
        evtt.preventDefault();
        self.hideGallery();
      });
    } else {
      return;
    }
  };

  this._onDocumentKeydown = function(e) {
    if (utils.isEscEvent(e)) {
      e.preventDefault();
      self.hideGallery();
    }
  };

  this.showPicture = function(currentPicture) {
    currentPicture = activePicture;
    var photo = galleryPictures[currentPicture];
    if (photo) {
      previewPicture.src = photo.url;
      galleryLikes.innerHTML = photo.likes;
      galleryComments.innerHTML = photo.comments;
    }
  };

  this.hideGallery = function() {
    galleryContainer.classList.add('invisible');

    galleryContainer.removeEventListener('click', this._onCloseBtnClick);
    galleryContainer.removeEventListener('click', this._onPhotoClick);
  };
};

module.exports = new Gallery();
