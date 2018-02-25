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
  function drawPicture() {
    var pictures = changeFilterSort();
    pictures.forEach(function (elemPhotoArr) {
      pictureFragment.appendChild(renderPicture(elemPhotoArr));
      pictureContainer.appendChild(pictureFragment);
    });
    return pictures;
  }

  // Загрузка с сервера
  window.backend.load(sucsessfulLoad, window.backend.errorHandler);

  // Успешная загрузка
  function sucsessfulLoad(pictures) {
    window.pictures = pictures;
    filtersBlock.classList.remove('filters-inactive');
    drawPicture();
  }

  var filtersBlock = document.querySelector('.filters');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var filterPopular = document.querySelector('#filter-popular');
  var filterRandom = document.querySelector('#filter-random');
  var filterRecommend = document.querySelector('#filter-recommend');
  var picElements = document.querySelector('.pictures');

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


  // Находим блок для вставки сгенерированных фотографий
  var pictureContainer = document.querySelector('.pictures');
  // Находим блок с увеличенным фото
  var overlayElement = document.querySelector('.gallery-overlay');

  // Функция для открытя увеличенной картинки по клику на соответствующую картинку в галерее
  function onShowPhoto(e) {
    e.preventDefault();
    var target = e.target; // определяем картинку по которой был клик
    for (var i = 0; i < pictureContainer.children.length; i++) {
      if (pictureContainer.children[i].querySelector('img') === target) { // Если картинка совпадает с картинкой по которой был сделан клик, то вставляем данные элемента в блок с увеличенным фото
        getOverlayPhoto(drawPicture()[i]);
        openOverlay();
      }
    }
  }

  // Вставляем элемент из сгенерированного массива в блок с увеличенным фото
  function getOverlayPhoto(photo) {
    overlayElement.querySelector('img').src = photo.url;
    overlayElement.querySelector('.likes-count').textContent = photo.likes;
    overlayElement.querySelector('.comments-count').textContent = photo.comments;
    return overlayElement;
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
