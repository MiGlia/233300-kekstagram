'use strict';
(function () {
  // Заполняем превью выбранной фотографией
  window.preview = function (target, galleryOverlay, callback) {
    var targetData = target.dataSource || target.parentElement.dataSource;
    if (targetData) {
      galleryOverlay.querySelector('.gallery-overlay-image').src = targetData.url;
      galleryOverlay.querySelector('.likes-count').textContent = targetData.likes;
      galleryOverlay.querySelector('.comments-count').textContent = targetData.comments.length;

      if (typeof callback === 'function') {
        callback();
      }
    }
  };
})();
