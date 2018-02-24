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

  var filters = document.querySelector('.filters');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var filterPopular = document.querySelector('#filter-popular');
  var filterRandom = document.querySelector('#filter-random');
  var filterRecommend = document.querySelector('#filter-recommend');
  var picElements = document.querySelector('.pictures');

  // Показываем фильтры
  filters.classList.remove('filters-inactive');

  // Функция сортировки массива по комментариям
  function getSortArrByComments(pictures) {
    var sortArr = pictures;
    sortArr.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return sortArr;
  }

  // Функция сортировки массива по лайкам
  function getSortArrByLikes(pictures) {
    var sortArr = pictures;
    sortArr.sort(function (a, b) {
      return b.likes - a.likes;
    });
    return sortArr;
  }

  // сброс картинок(удаление)
  function resetPicture(elem) {
    elem.innerHTML = '';
  }

  // Функция для выбора вид сортировки
  // Возвращает отсортированный массив
  function changeFilterSort() {
    var filterSortElements = document.querySelectorAll('.filters input');
    var filterSort;
    filterSortElements.forEach(function (sortElements) {
      if (sortElements.checked) {
        var filter = sortElements.value;
        var copyfilterSort = window.pictures.slice(0);
        console.log(window.pictures);
        switch (filter) {
          case 'recommend':
            filterSort = window.pictures;
            break;
          case 'popular':
            filterSort = getSortArrByLikes(copyfilterSort);
            break;
          case 'discussed':
            filterSort = getSortArrByComments(copyfilterSort);
            break;
          case 'random':
            filterSort = copyfilterSort.sort(window.util.compareRandom);
            break;
        }
      }
    });
    return filterSort;
  }

  // Функция для отрисовки отсортированных фото
  function setSortPicture() {
    resetPicture(picElements);
    drawPicture(changeFilterSort());
  }

  // Навешиваем обработчики
  filterDiscussed.addEventListener('click', setSortPicture);
  filterPopular.addEventListener('click', setSortPicture);
  filterRandom.addEventListener('click', setSortPicture);
  filterRecommend.addEventListener('click', setSortPicture);
})();
