'use strict';
(function () {
  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var inputNonFilter = document.querySelector('#upload-effect-none');
  // Объявляем Массивы классов и id и фильтров
  var ARR_OF_INPUT_IDS = ['upload-effect-none', 'upload-effect-chrome', 'upload-effect-sepia', 'upload-effect-marvin', 'upload-effect-phobos', 'upload-effect-heat'];
  var ARR_OF_IMAGE_CLASSES = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin', 'effect-phobos', 'effect-heat'];
  var ARR_OF_IMAGE_FILTERS = ['none', 'grayscale', 'sepia', 'invert', 'blur', 'brightness'];
  var MAX_SLIDER_VALUE = 455;
  var START_SLIDER_VALUE = '455px';

  // Фуекция для смены филтра на редактируемой картинке
  // Если id родителя перед элементом на который произошло нажатие и не равно DIV
  // то добавляем картинке соответствующий класс, id и значение фильтра и начальное значение фильтра
  function setFilterToImage(e) {
    window.picturesetup.effectImage.classList.add('effect-image-preview');
    var target = e.target.parentNode;
    for (var i = 0; i < ARR_OF_INPUT_IDS.length; i++) {
      if (target.tagName === 'DIV') {
        return;
      }
      if (target.previousElementSibling.id === ARR_OF_INPUT_IDS[i]) {
        if (target.previousElementSibling.id === 'upload-effect-none') {
          window.picturesetup.effectImage.style.filter = '';
        }
        window.picturesetup.effectImage.className = '';
        window.picturesetup.effectImage.classList.add(ARR_OF_IMAGE_CLASSES[i]);
        window.picturesetup.effectImage.id = ARR_OF_IMAGE_CLASSES[i];
        window.picturesetup.effectImage.style.filter = ARR_OF_IMAGE_FILTERS[i] + '(' + 1 + ')';
        setFilterStartValue();
      }
    }
  }

  // Функция задания стартовых координат пина слайдера
  // при переключении и соответственно стартого состояния интенсивности фильтров
  function setFilterStartValue() {
    window.slider.uploadEffectLevelPin.style.left = START_SLIDER_VALUE;
    window.slider.uploadEffectLevelVal.style.width = START_SLIDER_VALUE;

    for (var i = 0; i < ARR_OF_INPUT_IDS.length; i++) {
      if (window.picturesetup.effectImage.id === 'effect-phobos') {
        window.picturesetup.effectImage.style.filter = ARR_OF_IMAGE_FILTERS[i] + '(' + 3 + 'px' + ')';
      } else if (window.picturesetup.effectImage.id === 'effect-heat') {
        window.picturesetup.effectImage.style.filter = ARR_OF_IMAGE_FILTERS[i] + '(' + 3 + ')';
      }
    }
  }

  // Объект со свойствами интенсивности фильтров
  var filtrtImage = {
    chrome: {
      filter: 'grayscale',
      maxEffectValue: 1
    },
    sepia:
    {
      filter: 'sepia',
      maxEffectValue: 1
    },
    marvin:
      {
        filter: 'invert',
        maxEffectValue: 1
      },
    phobos:
    {
      filter: 'blur',
      maxEffectValue: 3
    },
    heat:
      {
        filter: 'brightness',
        maxEffectValue: 3
      }
  };


  // Функция сравнения
  // какие диапазоны нужно применять для каждлгл фильтра
  function setFilterEffectToImage() {
    switch (window.picturesetup.effectImage.id) {
      case 'effect-none':
        window.picturesetup.effectImage.style.filter = '';
        break;
      case 'effect-chrome':
        setCoefToSlider(filtrtImage.chrome.filter, filtrtImage.chrome.maxEffectValue, '');
        break;
      case 'effect-sepia':
        setCoefToSlider(filtrtImage.sepia.filter, filtrtImage.sepia.maxEffectValue, '');
        break;
      case 'effect-marvin':
        setCoefToSlider(filtrtImage.marvin.filter, filtrtImage.marvin.maxEffectValue, '');
        break;
      case 'effect-phobos':
        setCoefToSlider(filtrtImage.phobos.filter, filtrtImage.phobos.maxEffectValue, 'px');
        break;
      case 'effect-heat':
        setCoefToSlider(filtrtImage.heat.filter, filtrtImage.heat.maxEffectValue, '');
        break;
    }
  }

  // Функция для для определения коэффициента для рассчета интенсивности в фильтрах
  // переводим координаты пина в коэффициент
  // записываем в сили значение фильтра
  function setCoefToSlider(filterName, maxValue, simbol) {
    var coef = window.slider.uploadEffectLevelPin.offsetLeft / MAX_SLIDER_VALUE;
    window.picturesetup.effectImage.style.filter = filterName + '(' + (maxValue * coef) + simbol + ')';
  }

  // Функция для скрытия/показа слайдера
  function setClassHiddenToSlider() {
    if (inputNonFilter.checked === true) {
      uploadEffectLevel.classList.add('hidden');
    } else {
      uploadEffectLevel.classList.remove('hidden');
    }
  }

  // Сброс фильтров
  function resetFilter() {
    inputNonFilter.checked = true;
    window.picturesetup.effectImage.className = '';
    window.picturesetup.effectImage.style.filter = '';
  }

  // Навешиваем обработчики событий
  uploadEffectControls.addEventListener('click', setFilterToImage);
  uploadEffectControls.addEventListener('click', setClassHiddenToSlider);

  window.filtereffect = {
    setFilterEffectToImage: setFilterEffectToImage,
    uploadEffectLevel: uploadEffectLevel,
    resetFilter: resetFilter
  };

})();
