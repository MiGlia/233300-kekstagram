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

  // Находим шаблон для копирования
  var similarPictureTemplate = document.querySelector('#picture-template').content;

  // Функция для копирования шаблона и вставки в него данных
  function renderPicture(arr) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = arr.url;
    pictureElement.querySelector('.picture-likes').textContent = arr.likes;
    pictureElement.querySelector('.picture-comments').textContent = arr.comments.length;
    return pictureElement;
  }

  // Создаем фрагмент для вставки фотографий
  var pictureFragment = document.createDocumentFragment();
  // Находим блок для вставки сгенерированных фотографий
  var pictureList = document.querySelector('.pictures');

  // Функция для вставки фотографий во фрагмент и отрисовки мх на странице
  function drawPicture(arr) {
    for (var i = 0; i < arr.length; i++) {
      pictureFragment.appendChild(renderPicture(arr[i]));
      pictureList.appendChild(pictureFragment);
    }
  }
  drawPicture(arrPhotos);

  // Находим блок с основным фото и показываем его
  var mainPic = document.querySelector('.gallery-overlay');
  // mainPic.classList.remove('hidden');

  // Вставляем первый элемент из сгенерированного массива в основной блок
  function drawMainPic(arr) {
    mainPic.querySelector('img').src = arr[0].url;
    mainPic.querySelector('.likes-count').textContent = arr[0].likes;
    mainPic.querySelector('.comments-count').textContent = arr[0].comments.length;
  }
  drawMainPic(arrPhotos);
})();

// ====================================================================================
// 1. Копируем шаблон элемента и вставляем в него данные и через dataset добавляем ему атрибут i;
// 2. Всталяем фото во фрагмент и отрисовываем их на странице
//    При этом ему должны добавляться атрибуты i (0,1,2,3...);
// 3. Далее повесить обработчик на контейнер с картинками и при нажатии отлаливать на какой картинке был клик
//   и открывать фото с соответствующим атрибутом
//   и вставлять соответствующую информацию в основной блок.
//   Это как я думаю, но что то не получается. Может вообще не так все понимаю?
//   Может логика другая
//   Подскажи пожалуйста.

// 1.// Функция для копирования шаблона и вставки в него данных
// function renderPicture(arr, i) {
//   var pictureElement = similarPictureTemplate.cloneNode(true);
//
//   pictureElement.querySelector('img').src = arr.url;
//   pictureElement.querySelector('.picture-likes').textContent = arr.likes;
//   pictureElement.querySelector('.picture-comments').textContent = arr.comments.length;
//   pictureElement.dataset.numPic = i;
//   return pictureElement;
// }

// 2. // Функция для вставки фотографий во фрагмент и отрисовки мх на странице
// function drawPicture() {
//   for (var i = 0; i < arrPhotos.length; i++) {
//     pictureFragment.appendChild(renderPicture(arrPhotos[i]));
//     pictureList.appendChild(pictureFragment);
//   }
// }
//
// // Вставляем элемент из сгенерированного массива в основной блок
// function drawMainPic(arr) {
//   mainPic.querySelector('img').src = arr.url;
//   mainPic.querySelector('.likes-count').textContent = arr.likes;
//   mainPic.querySelector('.comments-count').textContent = arr.comments.length;
// }

// Далее хочу повесит обработчик на контейнер с картинками и вставлять соответствующую информацию в основной блок.
// Что-то типа

// function setFilterToImage(evt, arr) {
//   effectImage.classList.add('effect-image-preview');
//   var target = evt.target;
//     if (target.tagName === 'IMG') {
//       drawMainPic(arr[target.dataset.numPic]);
//       openPopup();
//     }
//   }
// }
