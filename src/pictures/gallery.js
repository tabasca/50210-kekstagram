'use strict';

var utils = require('../utils');

var galleryContainer = document.querySelector('.gallery-overlay');
var closeGallery = galleryContainer.querySelector('.gallery-overlay-close');
var previewPicture = galleryContainer.querySelector('.gallery-overlay-image');
var galleryLikes = galleryContainer.querySelector('.likes-count');
var galleryComments = galleryContainer.querySelector('.comments-count');

var galleryPictures = [];
var activePicture = 0;

var gallery = function(pictures) {
  galleryPictures = pictures;
};

var showGallery = function(i) {
  activePicture = i;
  galleryContainer.classList.remove('invisible');
  showPicture(activePicture);
};

var _onPhotoClick = function() {
  galleryContainer.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('gallery-overlay-image')) {
      activePicture++;
      showPicture();
    } else {
      evt.preventDefault();
      hideGallery();
    }
  });
};

var _onCloseBtnClick = function(evt) {
  if (evt.target.classList.contains('gallery-overlay-close')) {
    closeGallery.addEventListener('click', function(evtt) {
      evtt.preventDefault();
      hideGallery();
    });
  } else {
    return;
  }
};

var _onDocumentKeydown = function(e) {
  if (utils.isEscEvent(e)) {
    e.preventDefault();
    hideGallery();
  }
};

var showPicture = function(currentPicture) {
  currentPicture = activePicture;
  var photo = galleryPictures[currentPicture];
  if (photo) {
    previewPicture.src = photo.url;
    galleryLikes.innerHTML = photo.likes;
    galleryComments.innerHTML = photo.comments;
  }
};

var hideGallery = function() {
  galleryContainer.classList.add('invisible');

  galleryContainer.removeEventListener('click', _onCloseBtnClick);
  galleryContainer.removeEventListener('click', _onPhotoClick(activePicture));
};

window.addEventListener('keydown', _onDocumentKeydown);
galleryContainer.addEventListener('click', _onCloseBtnClick);
galleryContainer.addEventListener('click', _onPhotoClick(activePicture));

module.exports = {
  showGallery: showGallery,
  gallery: gallery
};
