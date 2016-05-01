'use strict';

var KeyCode = {
  ENTER: 13,
  ESC: 27,
  SPACE: 32
};

var FileType = {
  'GIF': '',
  'JPEG': '',
  'PNG': '',
  'SVG+XML': ''
};

module.exports = {
  isBottomReached: function(element) {
    var elementPosition = element.getBoundingClientRect();
    return elementPosition.bottom - window.innerHeight <= 0;
  },

  isNextPageAvailable: function(listSize, page, pageSize) {
    return page < Math.ceil(listSize / pageSize);
  },

  isActivationEvent: function(evt) {
    return [KeyCode.ENTER, KeyCode.SPACE].indexOf(evt.KeyCode) > -1;
  },

  isEscEvent: function(evt) {
    return evt.KeyCode === KeyCode.ESC;
  },

  isFileTypeAppropriate: function(element) {
    var fileRegExp = new RegExp('^image/(' + Object.keys(FileType).join('|').replace('\+', '\\+') + ')$', 'i');
    return fileRegExp.test(element.files[0].type) > -1;
  },

  calculateDateToExpire: function() {
    var today = new Date();
    var myBirthday = new Date();
    myBirthday.setMonth(7, 23);

    if (myBirthday.getMonth() < today.getMonth() && myBirthday.getDate() < today.getDate()) {
      myBirthday.setFullYear(today.getFullYear());
    } else {
      myBirthday.setFullYear(today.getFullYear() - 1);
    }

    var dateToExpire = Date.now() + (today - myBirthday);
    var formattedDateToExpire = new Date(dateToExpire).toUTCString();

    return formattedDateToExpire;
  },

  removeElement: function(element) {
    if (element) {
      element.remove();
      element = null;
    }
  }
};
