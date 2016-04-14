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

  var PICTURES_LOAD_URL = '//o0.github.io/assets/json/pictures.json';

  var pictures = [];

  var Filter = {
    'All': 'filter-popular',
    'DATE': 'filter-new',
    'COMMENTS': 'filter-discussed'
  };

  var DEFAULT_FILTER = Filter.ALL;

  var ACTIVE_FILTER_CLASSNAME = 'filter-active';

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

  filtersForm.classList.remove('hidden');


  var renderPictures = function(pics) {
    picturesContainer.innerHTML = '';

    pics.forEach(function(pic) {
      getPictureElement(pic, picturesContainer);
    });
  };

  var getFilteredPictures = function(pics, filter) {
    var picturesToFilter = pics.slice(0);

    switch (filter) {
      case Filter.DATE:
        picturesToFilter.filter(function(pic) {
          var twoWeeksAgo = +new Date() - 14 * 24 * 60 * 60 * 1000;
          var picDate = +new Date(pic.date);
          if (picDate >= twoWeeksAgo) {
            return pic;
          } else {
            return false;
          }
        });
        picturesToFilter.sort(function(a, b) {
          var dateOne = +new Date(a.date);
          var dateTwo = +new Date(b.date);
          return dateTwo - dateOne;
        });
        break;
      case Filter.COMMENTS:
        picturesToFilter.sort(function(a, b) {
          return b.comments - a.comments;
        });
        break;
    }
    return picturesToFilter;
  };

  var setFilterEnabled = function(filter) {
    var filteredPictures = getFilteredPictures(pictures, filter);
    renderPictures(filteredPictures);

    var activeFilter = filtersForm.querySelector('.' + ACTIVE_FILTER_CLASSNAME);
    if (activeFilter) {
      activeFilter.classList.remove(ACTIVE_FILTER_CLASSNAME);
    }
    var filterToActivate = document.getElementById(filter);
    filterToActivate.classList.add(ACTIVE_FILTER_CLASSNAME);
  };

  var setFiltersEnabled = function(enabled) {
    var filters = filtersForm.querySelectorAll('.filters-item');
    for (var i = 0; i < filters.length; i++) {
      filters[i].onclick = enabled ? function() {
        setFilterEnabled(this.previousElementSibling.id);
      } : null;
    }
  };

  var getPictures = function(callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    };

    xhr.open('GET', PICTURES_LOAD_URL);
    xhr.send();

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        picturesContainer.classList.remove('pictures-loading');
      }
      return;
    };
    picturesContainer.classList.add('pictures-loading');

    xhr.onerror = function() {
      picturesContainer.classList.add('pictures-failure');
    };
  };

  getPictures(function(loadedPictures) {
    pictures = loadedPictures;
    setFiltersEnabled(true);
    setFilterEnabled(DEFAULT_FILTER);
  });

}());
