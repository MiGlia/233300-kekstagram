'use strict';
(function () {

  // Создаем массив скомментариями
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  // Создаем пустой массив для объектов свойств фотографий
  var arrPhotos = [];
  // Создаем пустой массив для номеров файлов с фото
  var photoPicturesCount = [];
  var countOfPhotoFiles = 25;
  var countOfPhotos = 25;
  var likesCount = {
    min: 15,
    max: 200
  };

  // Функция для создания массива номеров для файлов фотографий
  function createNumberOfPicArr(countNumber, arr) {
    for (var i = 1; i <= countNumber; i++) {
      arr.push(i);
    }
    return arr;
  }

  createNumberOfPicArr(countOfPhotoFiles, photoPicturesCount);

  // Функция для создания массива обектов со свойствами фотографий
  function createPicturesArr(count, arr) {
    for (var i = 0; i < count; i++) {
      arr.push(
          {url: 'photos/' + window.util.getRandomNorepeatArrayIndex(photoPicturesCount) + '.jpg',
            likes: window.util.getRandomValue(likesCount.min, likesCount.max),
            comments: window.util.getNewOArrRandomLength([window.util.getRandomValueFromArr(COMMENTS), window.util.getRandomValueFromArr(COMMENTS)])
          }
      );
    }
  }

  createPicturesArr(countOfPhotos, arrPhotos);

  window.picturedata = {
    arrPhotos: arrPhotos
  };
})();
