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

  // Создаем фрагмент для вставки фотографий
  var pictureFragment = document.createDocumentFragment();
  // Находим блок для вставки сгенерированных фотографий
  var pictureContainer = document.querySelector('.pictures');

  // Функция для копирования шаблона и вставки в него данных
  function renderPicture(arr) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = arr.url;
    pictureElement.querySelector('.picture-likes').textContent = arr.likes;
    pictureElement.querySelector('.picture-comments').textContent = arr.comments.length;
    return pictureElement;
  }

  // Функция для вставки фотографий во фрагмент и отрисовки мх на странице
  function drawPicture(arr) {
    for (var i = 0; i < arr.length; i++) {
      pictureFragment.appendChild(renderPicture(arr[i]));
      pictureContainer.appendChild(pictureFragment);
    }
  }
  drawPicture(arrPhotos);

  // Находим блок с увеличенным фото
  var overlayElement = document.querySelector('.gallery-overlay');

  // Вставляем элемент из сгенерированного массива в блок с увеличенным фото
  function getOverlayPhoto(photo) {
    overlayElement.querySelector('img').src = photo.url;
    overlayElement.querySelector('.likes-count').textContent = photo.likes;
    overlayElement.querySelector('.comments-count').textContent = photo.comments.length;
    return overlayElement;
  }

  // Функция для открытя увеличенной картинки по клику на соответствующую картинку в галерее
  function onShowPhoto(e) {
    e.preventDefault();
    var target = e.target; // определяем картинку по которой был клик
    for (var i = 0; i < pictureContainer.children.length; i++) {
      if (pictureContainer.children[i].querySelector('img') === target) { // Если картинка совпадает с картинкой по которой был сделан клик, то вставляем данные элемента в блок с увеличенным фото
        getOverlayPhoto(arrPhotos[i]);
        openOverlay();
      }
    }
  }

  // Объявляем переменные
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  // Функция для открытия окна с увеличенным фото
  function openOverlay() {
    overlayElement.classList.remove('hidden');
    document.addEventListener('keydown', onOverlayEscPress);
  }

  // Функция для закрытия окна с увеличенным фото
  function closeOverlay() {
    overlayElement.classList.add('hidden');
    document.removeEventListener('keydown', onOverlayEscPress);
  }

  // Функция для закрытия окна с увеличенным фото с клавиши Esc
  function onOverlayEscPress(e) {
    if (e.keyCode === 27) {
      closeOverlay();
    }
  }

  // Навешиваем обработчики событий
  pictureContainer.addEventListener('click', onShowPhoto);
  galleryOverlayClose.addEventListener('click', closeOverlay);
})();
