'use strict';
(function () {
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
        getOverlayPhoto(window.pictures[i]);
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

  window.previewpictures = {
    pictureContainer: pictureContainer
  };
})();
