'use strict';

var load = function(url, picsContainer, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };

  xhr.open('GET', url);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      picsContainer.classList.remove('pictures-loading');
    }
    return;
  };
  picsContainer.classList.add('pictures-loading');

  xhr.onerror = function() {
    picsContainer.classList.add('pictures-failure');
  };
};

module.exports = load;
