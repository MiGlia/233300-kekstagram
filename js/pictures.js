'use strict';
(function () {
  // Находим шаблон для копирования
  var similarPictureTemplate = document.querySelector('#picture-template').content;
  // Создаем фрагмент для вставки фотографий
  var pictureFragment = document.createDocumentFragment();
  var filtersBlock = document.querySelector('.filters');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var filterPopular = document.querySelector('#filter-popular');
  var filterRandom = document.querySelector('#filter-random');
  var filterRecommend = document.querySelector('#filter-recommend');
  var picElements = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  // Функция для копирования шаблона и вставки в него данных
  function renderPicture(arr) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = arr.url;
    pictureElement.querySelector('.picture-likes').textContent = arr.likes;
    pictureElement.querySelector('.picture-comments').textContent = arr.comments.length;
    return pictureElement;
  }

  // Функция для вставки фотографий во фрагмент и отрисовки мх на странице
  function drawPicture() {
    var pictures = changeFilterSort();
    pictures.forEach(function (elemPhotoArr) {
      pictureFragment.appendChild(renderPicture(elemPhotoArr));
      picElements.appendChild(pictureFragment);
    });

    Array.prototype.forEach.call(picElements.querySelectorAll('.picture'), function (item, index) {
      item.dataSource = pictures[index];
    });

    return pictures;
  }

  // Загрузка с сервера
  window.backend.load(onSucsessfulLoad, window.backend.onErrorHandler);

  // Успешная загрузка
  function onSucsessfulLoad(pictures) {
    window.pictures = pictures;
    filtersBlock.classList.remove('filters-inactive');
    drawPicture();
  }

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
    drawPicture();
  }

  filtersBlock.addEventListener('change', function () {
    window.debounce(setSortPicture);
  });

  // Навешиваем обработчики
  filterDiscussed.addEventListener('click', setSortPicture);
  filterPopular.addEventListener('click', setSortPicture);
  filterRandom.addEventListener('click', setSortPicture);
  filterRecommend.addEventListener('click', setSortPicture);

  function onGalleryOverlayEscPress(evt) {
    window.util.isEscEvent(evt, onGalleryOverlayClose);
  }

  function onGalleryOverlayClose() {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onGalleryOverlayEscPress);
  }

  function onGalleryOverlayOpen() {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onGalleryOverlayEscPress);
  }


  // Обработчик по клику на фотографию на фазе захвата
  picElements.addEventListener('click', function (evt) {
    evt.preventDefault(); // чтобы клик по ссылке не перезагружал страницу
    window.preview(evt.target, galleryOverlay, onGalleryOverlayOpen);
  });

  // Обработчик по нажатию на ENTER, когда фотография в фокусе
  picElements.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      evt.preventDefault(); // чтобы клик по ссылке не перезагружал страницу
      window.preview(evt.target, galleryOverlay, onGalleryOverlayOpen);
    });
  });

  // Обработчик по клику на крестик в галерее
  galleryOverlayClose.addEventListener('click', onGalleryOverlayClose);

  // Обработчик по нажатию на ENTER, когда крестик в галерее в фокусе
  galleryOverlayClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onGalleryOverlayClose);
  });

})();
