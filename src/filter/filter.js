'use strict';

var FilterType = require('./filter-type');

var filter = function(pics, filterType) {
  var picturesToFilter = pics.slice(0);

  switch (filterType) {
    case FilterType.DATE:
      var picturesFilteredByTwoWeeks = picturesToFilter.filter(function(pic) {
        var twoWeeksAgo = +new Date() - 14 * 24 * 60 * 60 * 1000;
        var picDate = +new Date(pic.date);
        if (picDate >= twoWeeksAgo) {
          return pic;
        } else {
          return false;
        }
      });
      picturesFilteredByTwoWeeks.sort(function(a, b) {
        var dateOne = +new Date(a.date);
        var dateTwo = +new Date(b.date);
        return dateTwo - dateOne;
      });
      return picturesFilteredByTwoWeeks;
    case FilterType.COMMENTS:
      picturesToFilter.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;
  }
  return picturesToFilter;
};

module.exports = filter;
