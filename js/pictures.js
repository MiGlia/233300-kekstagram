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


  // ================================================================
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  // var loadEffect = document.querySelector('.upload-effect');
  var uploadFormCancel = document.querySelector('.upload-form-cancel');

  function openPopup() {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }

  function closePopup() {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === 27) {
      closePopup();
    }
  }

  // function onUploadEnterPress(evt) {
  //   if (evt.keyCode === 13) {
  //     openPopup();
  //   }
  // }

  uploadFile.addEventListener('change', openPopup);
  uploadFormCancel.addEventListener('click', closePopup);
  // uploadFile.addEventListener('keydown', onUploadEnterPress);


  var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
  var buttonInc = document.querySelector('.upload-resize-controls-button-inc');
  var controlValue = document.querySelector('.upload-resize-controls-value');


  function setControlValue() {
    switch (controlValue.value) {
      case '25%':
        controlValue.value = '50%';
        getTransformImage(effectImage, 0.5);
        break;
      case '50%':
        controlValue.value = '75%';
        getTransformImage(effectImage, 0.75);
        break;
      case '75%':
        controlValue.value = '100%';
        getTransformImage(effectImage, 1);
        break;
    }
  }


  function getTransformImage(elementOfTransform, valueOfScale) {
    elementOfTransform.style.transform = 'scale(' + (valueOfScale) + ')';
  }

  function setControlValue2() {
    switch (controlValue.value) {
      case '50%':
        controlValue.value = '25%';
        getTransformImage(effectImage, 0.25);
        break;
      case '75%':
        controlValue.value = '50%';
        getTransformImage(effectImage, 0.5);
        break;
      case '100%':
        controlValue.value = '75%';
        getTransformImage(effectImage, 0.75);
        break;
    }
  }

  buttonInc.addEventListener('click', setControlValue);
  buttonDec.addEventListener('click', setControlValue2);

  var effectImage = document.querySelector('.effect-image-preview');


  // функция для добавления классов фильтров
  // function getFilterClass() {
  //
  // }

  var arr1 = ['upload-effect-none', 'upload-effect-chrome', 'upload-effect-sepia', 'upload-effect-marvin', 'upload-effect-phobos', 'upload-effect-heat'];
  var arr2 = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin', 'effect-phobos', 'effect-heat'];
  var uploadEffectControls = uploadOverlay.querySelector('.upload-effect-controls');


  function functionName2(evt) {
    effectImage.classList.add('effect-image-preview');
    var target = evt.target.parentNode;
    for (var i = 0; i < arr1.length; i++) {
      if (target.previousElementSibling.id === arr1[i]) {
        effectImage.className = '';
        effectImage.classList.add(arr2[i]);
      }
    }
  }

  // function functionName3() {
  //   effectImage.classList.remove('effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin', 'effect-phobos', 'effect-heat');
  // }

  uploadEffectControls.addEventListener('click', functionName2);
})();
