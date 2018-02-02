'use strict';
(function () {
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

  window.util = {
    getNewOArrRandomLength: getNewOArrRandomLength,
    getRandomNorepeatArrayIndex: getRandomNorepeatArrayIndex,
    getRandomValueFromArr: getRandomValueFromArr,
    getRandomValue: getRandomValue
  };
})();