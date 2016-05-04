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
  var currentPictureNmbr = 0;

  this.gallery = function(pictures) {
    galleryPictures = pictures;
  };

  this.showGallery = function(currentPictureHash) {
    galleryContainer.classList.remove('invisible');
    self.showPicture(currentPictureHash);

    window.addEventListener('keydown', this._onDocumentKeydown);
    galleryContainer.addEventListener('click', this._onCloseBtnClick);
    galleryContainer.addEventListener('click', this._onPhotoClick);
  };

  this._onPhotoClick = function(evt) {
    if (evt.target.classList.contains('gallery-overlay-image') && currentPictureNmbr <= galleryPictures.length) {
      currentPictureNmbr++;
      location.hash = 'photo/' + galleryPictures[currentPictureNmbr].url;
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

  this.showPicture = function(currentPictureHash) {
    var currentPicture = galleryPictures[currentPictureNmbr];

    if (currentPictureHash) {
      currentPicture = galleryPictures.find(function(picture) {
        return currentPictureHash.indexOf(picture.url) !== -1;
      });
    } else {
      currentPicture = galleryPictures[currentPictureNmbr];
    }
    currentPictureNmbr = galleryPictures.indexOf(currentPicture);
    if (currentPicture) {
      previewPicture.src = currentPicture.url;
      galleryLikes.innerHTML = currentPicture.likes;
      galleryComments.innerHTML = currentPicture.comments;
    }
  };

  this.hideGallery = function() {
    location.hash = '';
    galleryContainer.classList.add('invisible');

    galleryContainer.removeEventListener('click', this._onCloseBtnClick);
    galleryContainer.removeEventListener('click', this._onPhotoClick);
  };

  this._onHashChange = function() {
    var currentHash = location.hash;
    var hashRegExp = new RegExp(/#photo\/(\S+)/);
    if (currentHash.match(hashRegExp)) {
      self.showGallery(currentHash);
    } else {
      self.hideGallery();
    }
  };

  window.addEventListener('hashchange', this._onHashChange);
};

module.exports = new Gallery();
