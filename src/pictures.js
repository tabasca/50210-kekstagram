'use strict';

(function() {
  var picturesContainer = document.querySelector('.pictures');
  var templateElement = document.querySelector('#picture-template');
  var filtersForm = document.querySelector('.filters');

  filtersForm.classList.add('hidden');

  var elementToClone;

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.picture');
  } else {
    elementToClone = templateElement.querySelector('.picture');
  }


  var getPictureElement = function(data, container) {
    var element = elementToClone.cloneNode(true);
    element.querySelector('.picture-comments').textContent = data.comments;
    element.querySelector('.picture-likes').textContent = data.likes;
    container.appendChild(element);

    var backgroundImage = new Image();

    backgroundImage.onload = function(evt) {
      element.firstChild.nextSibling.src = evt.target.src;

      element.firstChild.nextSibling.style.width = '182px';
      element.firstChild.nextSibling.style.height = '182px';
    };

    backgroundImage.onerror = function() {
      element.classList.add('picture-load-failure');
    };

    backgroundImage.src = data.url;

    return element;
  };

  window.pictures.forEach(function(picture) {
    getPictureElement(picture, picturesContainer);
  });

  filtersForm.classList.remove('hidden');
}());
