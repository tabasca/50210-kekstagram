'use strict';

var galleryContainer = document.querySelector('.gallery-overlay');
// var thumbnailsContainer = galleryContainer.querySelector('.gallery-overlay-preview');
// var closeGallery = galleryContainer.querySelector('.gallery-overlay-close');
var previewPicture = galleryContainer.querySelector('.gallery-overlay-image');

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

// var _onPhotoClick = function() {
//   galleryContainer.addEventListener('click', function() {
//     activePicture++;
//     showPicture();
//   });
// };

// var _onDocumentKeydown = function() {
//   if (utils.isActivationEvent(evt)) {
//       if (evt.target.classList.contains('picture')) {
//           evt.preventDefault();
//           hideGallery();
//       }
//   }
// };

var showPicture = function(currentPicture) {
  var photo = galleryPictures[currentPicture];
  previewPicture.src = photo.url;
};

// var hideGallery = function() {
//   galleryContainer.classList.add('invisible');
// };

module.exports = {
  showGallery: showGallery,
  gallery: gallery
};
