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

  function drawPictureR(arr) {
    arr.forEach(function (elemPhotoArr) {
      pictureFragment.appendChild(renderPicture(elemPhotoArr));
      window.previewpictures.pictureContainer.appendChild(pictureFragment);
    });
  }

  // ========================================================================
  var filters = document.querySelector('.filters');
  var filterDiscussed = document.querySelector('#filter-discussed');
  filters.classList.remove('filters-inactive');

  var pic = document.querySelector('.pictures');

  function functionName(a, b) {
    return a.comments.length - b.comments.length;
  }

  function reset(elem) {
    elem.innerHTML = '';
  }

  filterDiscussed.addEventListener('click', function () {
    var vv = window.pictures.slice(0);
    vv.sort(functionName);
    reset(pic);
    drawPictureR(vv);
    console.log(vv);
  });


  var filterPopular = document.querySelector('#filter-popular');

  filterPopular.addEventListener('click', function () {
    console.log(window.pictures);
    reset(pic);
    drawPictureR(window.pictures);
  });

  var filterRandom = document.querySelector('#filter-random');

  function compareRandom(a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return Math.random() - 0.5;
  }

  // filterRandom.addEventListener('click', function () {
  //   var vvv = window.pictures.slice(0).sort(compareRandom).splice(0, 10);
  //   console.log(vvv);
  //   reset(pic);
  //   drawPictureR(vvv);
  // });
})();
