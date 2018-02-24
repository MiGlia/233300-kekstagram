'use strict';
(function () {
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
