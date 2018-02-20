'use strict';
(function () {

  // Находим шаблон для копирования
  var similarPictureTemplate = document.querySelector('#picture-template').content;
  // Создаем фрагмент для вставки фотографий
  var pictureFragment = document.createDocumentFragment();
  var arrPhotos = [];

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
      window.previewpictures.pictureContainer.appendChild(pictureFragment);
      arrPhotos = arr;
    }
    return arrPhotos;
    debugger;
  }
  // drawPicture(window.picturedata.arrPhotos);

  window.backend.load(drawPicture, window.backend.errorHandler);

  window.pictures = {
    arrPhotos: arrPhotos
  };

})();
