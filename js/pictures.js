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

  // ========================================================================
  var filters = document.querySelector('.filters');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var filterPopular = document.querySelector('#filter-popular');
  var filterRandom = document.querySelector('#filter-random');
  var filterRecommend = document.querySelector('#filter-recommend');
  var pic = document.querySelector('.pictures');

  filters.classList.remove('filters-inactive');

  function sortByComments(pictures) {
    var sortArr = pictures;
    sortArr.sort(function (a, b) {
      return a.comments.length - b.comments.length;
    });
    return sortArr;
  }

  function sortByLikes(a, b) {
    return b.likes - a.likes;
  }

  function reset(elem) {
    elem.innerHTML = '';
  }

  function changeFilterSort() {
    var filterSortElements = document.querySelectorAll('.filters input[type="radio"]');
    var filterSort;
    filterSortElements.forEach(function (sortElements) {
      if (sortElements.checked) {
        var filter = sortElements.value;
        var copyfilterSort = window.pictures.slice(0);
        // var filterSort;
        switch (filter) {
          case 'recommend':
            filterSort = copyfilterSort;
            break;
          case 'popular':
            filterSort = sortByLikes(copyfilterSort);
            break;
          case 'discussed':
            filterSort = sortByComments(copyfilterSort);
            break;
          // case 'random':
          //   filterSort = sortFilterRandomize(window.pictures);
          //   break;
        }

      }
      debugger;
    });
    return filterSort;
  }


  function UpdatePicture() {
    reset(pic);
    drawPicture(changeFilterSort());
  }

  filterDiscussed.addEventListener('click', UpdatePicture);
  // filterDiscussed.addEventListener('click', drawPicture());

  // filters.addEventListener('click', sortFilter);


  // filterPopular.addEventListener('click', function () {
  //   var vv = window.pictures.slice(0);
  //   // vv.sort(sortByLikes);
  //   reset(pic);
  //   drawPicture(vv);
  //   console.log(vv);
  // });
  //
  // filterDiscussed.addEventListener('click', function () {
  //   console.log(window.pictures);
  //   reset(pic);
  //   drawPicture(window.pictures);
  // });
  //
  // filterRandom.addEventListener('click', function () {
  //   var vvv = window.pictures.slice(0).sort(compareRandom).splice(0, 10);
  //   console.log(vvv);
  //   reset(pic);
  //   drawPicture(vvv);
  // });
})();
