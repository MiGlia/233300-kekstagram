'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var arrLength = {
    min: 1,
    max: 3
  };

  // Коприруем и возвращаем массив со случайной длиной
  function getNewOArrRandomLength(arr) {
    var newComentArr = arr.slice(0);
    newComentArr.length = getRandomValue(arrLength.min, arrLength.max);
    return newComentArr;
  }

  // Возвращаем случайный элемент в массиве и сразу его удаляем из массива
  function getRandomNorepeatArrayIndex(arr) {
    return arr.splice(Math.floor(Math.random() * arr.length), 1);
  }

  // Функция для возврата случайного элемента из массива
  function getRandomValueFromArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Возвращаем ислучайное число между min (включительно) и max (не включая max)
  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Функция для перемешивания массива
  function compareRandom(a, b) {

    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return Math.random() - 0.5;
  }

  // Функция по нажатию на ESC
  function isEscEvent(evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  }

  // Функция по нажатию на ENTER
  function isEnterEvent(evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  }

  window.util = {
    getNewOArrRandomLength: getNewOArrRandomLength,
    getRandomNorepeatArrayIndex: getRandomNorepeatArrayIndex,
    getRandomValueFromArr: getRandomValueFromArr,
    getRandomValue: getRandomValue,
    compareRandom: compareRandom,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
