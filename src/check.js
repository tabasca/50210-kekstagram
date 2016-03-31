'use strict';
(function () {

  var getMessage = function(a, b) {
    var sum = 0;
    var square = 0;

    if (typeof a === "boolean") {
      if (a) {
        return "Переданное GIF-изображение анимировано и содержит " + b + " кадров";
      }
      else if (a === false) {
        return "Переданное GIF-изображение не анимировано";
      }
    }
    else if (typeof a === "number") {
      return "Переданное SVG-изображение содержит " + a + " объектов и " + b * 4 + " атрибутов";
    }
    else if (Array.isArray(a) && Array.isArray(b) === false) {
      for (i = 0; i < a.length; i++) {
        sum += a[i];
      }
      return "Количество красных точек во всех строчках изображения: " + sum;
    }
    else if (Array.isArray(a) && Array.isArray(b)) {
      for (i = 0, j = 0; i < a.length; i++) {
        square += a[i] * b[j];
        j++;
      }
      return "Общая площадь артефактов сжатия: " + square + " пикселей";
    }
  };
})();
