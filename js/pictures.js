'use strict';
(function () {

  // Находим шаблон для копирования
  var similarPictureTemplate = document.querySelector('#picture-template').content;
  // Создаем фрагмент для вставки фотографий
  var pictureFragment = document.createDocumentFragment();

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
    arr.forEach(function (elemPhotoArr) {
      pictureFragment.appendChild(renderPicture(elemPhotoArr));
      window.previewpictures.pictureContainer.appendChild(pictureFragment);
    });
    window.pictures = arr;
    return arr;
  }

  // Загрузка с сервера
  window.backend.load(drawPicture, window.backend.errorHandler);
})();
