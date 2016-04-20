'use strict';

(function() {

  // переменные
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

  var currentPage = 0;

  var pictures = []; //исходные данные

  var filteredPictures = []; //отфильтрованные данные

  var Filter = {
    'ALL': 'filter-popular',
    'DATE': 'filter-new',
    'COMMENTS': 'filter-discussed'
  };

  var picturesPosition = picturesContainer.getBoundingClientRect();

  var elementAtTheBottom = document.querySelector('body');

  var elementAtTheBottomPosition = elementAtTheBottom.getBoundingClientRect();

  // константы
  var PICTURES_LOAD_URL = '//o0.github.io/assets/json/pictures.json';

  var PAGE_SIZE = 12;

  var DEFAULT_FILTER = Filter.ALL;

  var ACTIVE_FILTER_CLASSNAME = 'filter-active';

  // создаем html-разметку и располагаем в ней полученные от сервера данные
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


  // ф-я отрисовки картинок по страницам
  var renderPictures = function(pics, page, replace) {
    if (replace) {
      picturesContainer.innerHTML = '';
    }
    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;

    pics.slice(from, to).forEach(function(pic) {
      getPictureElement(pic, picturesContainer);
    });

    renderNextPages();
  };

  // ф-я фильтрации картинок
  var getFilteredPictures = function(pics, filter) {
    var picturesToFilter = pics.slice(0);

    switch (filter) {
      case Filter.DATE:
        var picturesFilteredByTwoWeeks = picturesToFilter.filter(function(pic) {
          var twoWeeksAgo = +new Date() - 14 * 24 * 60 * 60 * 1000;
          var picDate = +new Date(pic.date);
          if (picDate >= twoWeeksAgo) {
            return pic;
          } else {
            return false;
          }
        });
        console.log('filter', picturesToFilter);
        console.log('filtered pics', picturesFilteredByTwoWeeks);
        picturesFilteredByTwoWeeks.sort(function(a, b) {
          var dateOne = +new Date(a.date);
          var dateTwo = +new Date(b.date);
          return dateTwo - dateOne;
        });
        return picturesFilteredByTwoWeeks;
        break;
      case Filter.COMMENTS:
        picturesToFilter.sort(function(a, b) {
          return b.comments - a.comments;
        });
        return picturesToFilter;
        break;
    }
    return picturesToFilter;
  };

  // ф-я отрисовки отфильтрованных картинок по страницам
  var setFilterEnabled = function(filter) {
    filteredPictures = getFilteredPictures(pictures, filter);
    currentPage = 0;
    renderPictures(filteredPictures, currentPage, true);

    var activeFilter = filtersForm.querySelector('.' + ACTIVE_FILTER_CLASSNAME);
    if (activeFilter) {
      activeFilter.classList.remove(ACTIVE_FILTER_CLASSNAME);
    }
    var filterToActivate = document.getElementById(filter);
    filterToActivate.classList.add(ACTIVE_FILTER_CLASSNAME);
  };

  // ф-я активации фильтрации по нажатию на выбранный фильтр
  var setFiltersEnabled = function() {
    filtersForm.addEventListener('click', function(evt) {
      if (evt.target.name === 'filter') {
        setFilterEnabled(evt.target.id);
      }
    });
    filtersForm.addEventListener('keydown', function(evt) {
      if (evt.target.name === 'filter' && [13, 32].indexOf(evt.keyCode) > -1) {
        evt.preventDefault();
        setFilterEnabled(evt.target.id);
      }
    });
  };

  // ф-я получения картинок с сервера (ajax)
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

  // ф-я проверки на валидность для setScrollEnabled
  var isBottomReached = function() {
    return elementAtTheBottomPosition.top - picturesPosition.top <= 0;
  };

  var isNextPageNeeded = function() {
    return elementAtTheBottom.clientHeight - picturesContainer.clientHeight - 60 > 0;
  };

  var renderNextPages = function() {
    while (isNextPageNeeded() && isNextPageAvailable(pictures, currentPage, PAGE_SIZE)) {
      currentPage++;
      renderPictures(filteredPictures, currentPage);
    }
  };

  // ф-я проверки на валидность для setScrollEnabled
  var isNextPageAvailable = function(pics, page, pageSize) {
    return page < Math.floor(pics.length / pageSize);
  };

  // ф-я отрисовки картинок при скролле страницы при условии валидации по ф-ям isBottomReached() и isNextPageAvailable()
  var setScrollEnabled = function() {
    var scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        if (isBottomReached() && isNextPageAvailable(pictures, currentPage, PAGE_SIZE)) {
          currentPage++;
          renderPictures(filteredPictures, currentPage);
        }
      }, 100);
    });
  };


  // вызываем отрисовку загруженных картинок
  getPictures(function(loadedPictures) {
    pictures = loadedPictures;
    setFiltersEnabled();
    setFilterEnabled(DEFAULT_FILTER);
    setScrollEnabled();
  });



  filtersForm.classList.remove('hidden');


}());
