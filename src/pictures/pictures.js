'use strict';

var filter = require('../filter/filter');
var FilterType = require('../filter/filter-type');
var utils = require('../utils');
var Picture = require('./pic');
var load = require('./load-pictures');
var gallery = require('./gallery');


var filtersForm = document.querySelector('.filters');
var picturesContainer = document.querySelector('.pictures');
var elementAtTheBottom = document.querySelector('body');

filtersForm.classList.add('hidden');

var PAGE_SIZE = 12;

var DEFAULT_FILTER = FilterType.ALL;

var ACTIVE_FILTER_CLASSNAME = 'filter-active';

var PICTURES_LOAD_URL = '//o0.github.io/assets/json/pictures.json';

var pictures = []; //исходные данные

var filteredPictures = []; //отфильтрованные данные

var renderedPictures = []; //отрисованные данные

var currentPage = 0;

// ф-я отрисовки картинок по страницам
var renderPictures = function(pics, page) {
  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  var container = document.createDocumentFragment();

  pics.slice(from, to).forEach(function(pic) {
    renderedPictures.push(new Picture(pic, container));
  });

  picturesContainer.appendChild(container);
};

var renderNextPages = function(reset) {
  if (reset) {
    currentPage = 0;
    renderedPictures.forEach(function(pic) {
      pic.remove();
    });

    renderedPictures = [];
  }
  while (utils.isBottomReached(elementAtTheBottom) && utils.isNextPageAvailable(pictures.length, currentPage, PAGE_SIZE)) {
    renderPictures(filteredPictures, currentPage);
    currentPage++;
  }
};

// ф-я отрисовки отфильтрованных картинок по страницам
var setFilterEnabled = function(filterType) {
  filteredPictures = filter(pictures, filterType);
  renderNextPages(true);
  gallery.gallery(filteredPictures);


  var activeFilter = filtersForm.querySelector('.' + ACTIVE_FILTER_CLASSNAME);
  if (activeFilter) {
    activeFilter.classList.remove(ACTIVE_FILTER_CLASSNAME);
  }
  var filterToActivate = document.getElementById(filterType);
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
    if (evt.target.name === 'filter' && utils.isActivationEvent(event)) {
      evt.preventDefault();
      setFilterEnabled(evt.target.id);
    }
  });
};

// ф-я отрисовки картинок при скролле страницы при условии валидации по ф-ям isBottomReached() и isNextPageAvailable()
var setScrollEnabled = function() {
  var scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      renderNextPages();
    }, 100);
  });
};

load(PICTURES_LOAD_URL, picturesContainer, function(loadedPictures) {
  pictures = loadedPictures;

  setFiltersEnabled();
  setFilterEnabled(DEFAULT_FILTER);
  setScrollEnabled();
});

filtersForm.classList.remove('hidden');
