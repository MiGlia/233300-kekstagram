'use strict';
(function () {

  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  // var fotoNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  var NewArr = [];
  var fotoNumber = [];

  function createNumberArr(count, arr) {
    for (var i = 1; i <= count; i++) {
      arr.push(i);
    }
    return arr;
  }

  createNumberArr(50, fotoNumber);

  // Возвращаем случайный элемент в массиве и сразу его удаляем из массива
  function getRandomNorepeatArrayIndex(arr) {
    return arr.splice(Math.floor(Math.random() * arr.length), 1);
  }

  function getRandomValueFromArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Возвращаем ислучайное число между min (включительно) и max (не включая max)
  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function createArr(count, arr) {
    for (var i = 0; i < count; i++) {
      arr.push(
          {url: 'photos/' + getRandomNorepeatArrayIndex(fotoNumber) + '.jpg',
            likes: getRandomValue(15, 200),
            comments: [getRandomValueFromArr(COMMENTS)]
          }
      );
    }
  }

  createArr(50, NewArr);
})();
