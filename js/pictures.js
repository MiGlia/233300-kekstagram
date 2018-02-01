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
  var fotoArr = [];
  var fotoPicCount = [];

  function createNumberArr(count, arr) {
    for (var i = 1; i <= count; i++) {
      arr.push(i);
    }
    return arr;
  }

  createNumberArr(25, fotoPicCount);

  // Коприруем и возвращаем массив со случайной длиной
  function functionName(arr) {
    var newComentArr = arr.slice(0);
    newComentArr.length = getRandomValue(1, 3);
    return newComentArr;
  }

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
          {url: 'photos/' + getRandomNorepeatArrayIndex(fotoPicCount) + '.jpg',
            likes: getRandomValue(15, 200),
            comments: functionName([getRandomValueFromArr(COMMENTS), getRandomValueFromArr(COMMENTS)])
          }
      );
    }
  }

  createArr(25, fotoArr);

  var similarPicTemplate = document.querySelector('#picture-template').content;

  function renderPic(arr) {
    var picElement = similarPicTemplate.cloneNode(true);

    picElement.querySelector('img').src = arr.url;
    picElement.querySelector('.picture-likes').textContent = arr.likes;
    picElement.querySelector('.picture-comments').textContent = arr.comments;
    return picElement;
  }

  var fragment = document.createDocumentFragment();
  var picList = document.querySelector('.pictures');

  function drawPic(arr) {
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPic(arr[i]));
      picList.appendChild(fragment);
    }
  }
  drawPic(fotoArr);

  var mainPic = document.querySelector('.gallery-overlay');
  mainPic.classList.remove('hidden');

  function drawMainPic(arr) {

    mainPic.querySelector('img').src = arr[0].url;
    mainPic.querySelector('.likes-count').textContent = arr[0].likes;
    mainPic.querySelector('.comments-count').textContent = arr[0].comments;
  }

  drawMainPic(fotoArr);
})();
