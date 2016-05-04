'use strict';

var utils = require('../utils');

var Gallery = function() {
  this.galleryContainer = document.querySelector('.gallery-overlay');
  this.closeGallery = this.galleryContainer.querySelector('.gallery-overlay-close');
  this.previewPicture = this.galleryContainer.querySelector('.gallery-overlay-image');
  this.galleryLikes = this.galleryContainer.querySelector('.likes-count');
  this.galleryComments = this.galleryContainer.querySelector('.comments-count');

  this.galleryPictures = [];
  this.currentPictureNmbr = 0;

  window.addEventListener('hashchange', this._onHashChange.bind(this));
  this._onPhotoClick = this._onPhotoClick.bind(this);
  this._onCloseBtnClick = this._onCloseBtnClick.bind(this);
  this._onDocumentKeydown = this._onDocumentKeydown.bind(this);
  this.showPicture = this.showPicture.bind(this);
  this.hideGallery = this.hideGallery.bind(this);
  this.showGallery = this.showGallery.bind(this);
  this.gallery = this.gallery.bind(this);
  this._onHashChange = this._onHashChange.bind(this);
};

Gallery.prototype.gallery = function(pictures) {
  this.galleryPictures = pictures;
};

Gallery.prototype.showGallery = function(currentPictureHash) {
  this.galleryContainer.classList.remove('invisible');
  this.showPicture(currentPictureHash);

  window.addEventListener('keydown', this._onDocumentKeydown);
  this.galleryContainer.addEventListener('click', this._onCloseBtnClick);
  this.galleryContainer.addEventListener('click', this._onPhotoClick);
};

Gallery.prototype._onPhotoClick = function(evt) {
  if (evt.target.classList.contains('gallery-overlay-image') && this.currentPictureNmbr <= this.galleryPictures.length) {
    this.currentPictureNmbr++;
    location.hash = 'photo/' + this.galleryPictures[this.currentPictureNmbr].url;
  } else {
    evt.preventDefault();
    this.hideGallery();
  }
};

Gallery.prototype._onCloseBtnClick = function(evt) {
  if (evt.target.classList.contains('gallery-overlay-close')) {
    this.closeGallery.addEventListener('click', function(evtt) {
      evtt.preventDefault();
      this.hideGallery();
    });
  } else {
    return;
  }
};

Gallery.prototype._onDocumentKeydown = function(e) {
  if (utils.isEscEvent(e)) {
    e.preventDefault();
    this.hideGallery();
  }
};

Gallery.prototype.showPicture = function(currentPictureHash) {
  var currentPicture;

  if (currentPictureHash) {
    currentPicture = this.galleryPictures.find(function(picture) {
      return currentPictureHash.indexOf(picture.url) !== -1;
    });
  } else {
    currentPicture = this.galleryPictures[this.currentPictureNmbr];
  }
  this.currentPictureNmbr = this.galleryPictures.indexOf(currentPicture);
  if (currentPicture) {
    this.previewPicture.src = currentPicture.url;
    this.galleryLikes.innerHTML = currentPicture.likes;
    this.galleryComments.innerHTML = currentPicture.comments;
  }
};

Gallery.prototype.hideGallery = function() {
  location.hash = '';
  this.galleryContainer.classList.add('invisible');

  this.galleryContainer.removeEventListener('click', this._onCloseBtnClick);
  this.galleryContainer.removeEventListener('click', this._onPhotoClick);
};

Gallery.prototype._onHashChange = function() {
  this.currentHash = location.hash;
  this.hashRegExp = new RegExp(/#photo\/(\S+)/);
  if (this.currentHash.match(this.hashRegExp)) {
    this.showGallery(this.currentHash);
  } else {
    this.hideGallery();
  }
};

module.exports = new Gallery();
