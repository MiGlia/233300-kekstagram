'use strict';
(function () {
// Объявляем переменные
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  var ESC_KEYCODE = 27;
  var uploadEffectLevel = document.querySelector('.upload-effect-level');

  // Функция для открытия окна Редактирования фото
  // Удаляем класс hidden и добавляем обработчик событий который закрывает
  // окна Редактирования фото по нажатию на Esc
  function openPopup(e) {
    e.preventDefault();
    uploadOverlay.classList.remove('hidden');
    uploadEffectLevel.classList.add('hidden');
    effectImage.id = 'effect-none';
    document.addEventListener('keydown', onPopupEscPress);
  }

  // Функция для закрытия окна Редактирования фото
  // Добавляем класс hidden и добавляем обработчик событий который закрывает
  // окна Редактирования фото по нажатию на Esc
  function closePopup() {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadFile.value = '';
  }

  // Функция для закрытия окна Редактирования фото с клавиши Esc
  // Если нажатие происходит в TEXTAREA, то отменяем закрытие окна
  function onPopupEscPress(e) {
    var target = e.target;
    if (e.keyCode === ESC_KEYCODE) {
      if (target.tagName === 'TEXTAREA') {
        e.preventDefault();
      } else {
        closePopup();
      }
    }
  }

  // Навешиваем обработчики событий
  uploadFile.addEventListener('change', openPopup);
  uploadFormCancel.addEventListener('click', closePopup);

  // Объявляем переменные для кнопок изменяющих масштаб
  var buttonDec = document.querySelector('.upload-resize-controls-button-dec');
  var buttonInc = document.querySelector('.upload-resize-controls-button-inc');

  var controlValue = document.querySelector('.upload-resize-controls-value');
  var effectImage = document.querySelector('.effect-image-preview');

  // Функции для изменеия надписи масштаба на кнопках и добавления
  // картинке соответствующего этому масштабу стиля scale
  function setControlValueInc(e) {
    e.preventDefault();
    switch (controlValue.value) {
      case '25%':
        controlValue.value = '50%';
        getTransformImage(effectImage, 0.5);
        break;
      case '50%':
        controlValue.value = '75%';
        getTransformImage(effectImage, 0.75);
        break;
      case '75%':
        controlValue.value = '100%';
        getTransformImage(effectImage, 1);
        break;
    }
  }

  function setControlValueDec(e) {
    e.preventDefault();
    switch (controlValue.value) {
      case '50%':
        controlValue.value = '25%';
        getTransformImage(effectImage, 0.25);
        break;
      case '75%':
        controlValue.value = '50%';
        getTransformImage(effectImage, 0.5);
        break;
      case '100%':
        controlValue.value = '75%';
        getTransformImage(effectImage, 0.75);
        break;
    }
  }

  // Функция для изменеия значения масштаба в силях элемента
  function getTransformImage(elementOfTransform, valueOfScale) {
    elementOfTransform.style.transform = 'scale(' + (valueOfScale) + ')';
  }

  // Навешиваем обработчики событий на кнопки
  buttonInc.addEventListener('click', setControlValueInc);
  buttonDec.addEventListener('click', setControlValueDec);

  // Объявляем Массивы классов и id
  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var ARR_OF_INPUT_IDS = ['upload-effect-none', 'upload-effect-chrome', 'upload-effect-sepia', 'upload-effect-marvin', 'upload-effect-phobos', 'upload-effect-heat'];
  var ARR_OF_IMAGE_CLASSES = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin', 'effect-phobos', 'effect-heat'];
  var ARR_OF_IMAGE_FILTERS = ['none', 'grayscale', 'sepia', 'invert', 'blur', 'brightness'];

  // Фуекция для смены филтра на редактируемой картинке
  // Если id родителя перед элементом на который произошло нажатие
  // то добавляем картинке соответствующий класс
  function setFilterToImage(e) {
    effectImage.classList.add('effect-image-preview');
    var target = e.target.parentNode;
    for (var i = 0; i < ARR_OF_INPUT_IDS.length; i++) {
      if (target.tagName === 'DIV') {
        return;
      }
      if (target.previousElementSibling.id === ARR_OF_INPUT_IDS[i]) {
        if (target.previousElementSibling.id === 'upload-effect-none') {
          effectImage.style.filter = '';
        }
        effectImage.className = '';
        effectImage.classList.add(ARR_OF_IMAGE_CLASSES[i]);
        effectImage.id = ARR_OF_IMAGE_CLASSES[i];
        effectImage.style.filter = ARR_OF_IMAGE_FILTERS[i] + '(' + 1 + ')';
        if (effectImage.id === 'effect-phobos') {
          effectImage.style.filter = ARR_OF_IMAGE_FILTERS[i] + '(' + 3 + 'px' + ')'
        }
        if (effectImage.id === 'effect-heat') {
          effectImage.style.filter = ARR_OF_IMAGE_FILTERS[i] + '(' + 3 + ')'
        }
        window.slider.uploadEffectLevelPin.style.left = '455px';
        window.slider.uploadEffectLevelVal.style.width = '455px';
      }
    }
  }

  // Навешиваем обработчики событий
  uploadEffectControls.addEventListener('click', setFilterToImage);


  function setControlValueDecGGG() {

    switch (window.ps.effectImage.id) {

      case 'effect-none':
        effectImage.style.filter = '';
        break;
      case 'effect-chrome':
        window.slider.functionName2('grayscale', 1, '');
        break;
      case 'effect-sepia':
        window.slider.functionName2('sepia', 1, '');
        break;
      case 'effect-marvin':
        window.slider.functionName2('invert', 1, '');
        break;
      case 'effect-heat':
        window.slider.functionName2('brightness', 3, '');
        break;
      case 'effect-phobos':
        window.slider.functionName2('blur', 3, 'px');
        break;
    }
  }

  // function sliderHidden(e) {
  //   var target = e.target.parentNode;
  //   if (target.previousElementSibling.id !== 'upload-effect-none') {
  //     uploadEffectLevel.classList.toggle('.hidden');
  //   } else {
  //     uploadEffectLevel.classList.add('.hidden');
  //   }
  // }

  function sliderHidden(e) {
    var target = e.target.parentNode;
    if (target.previousElementSibling.value === 'none') {
      uploadEffectLevel.classList.add('hidden');
    } else {
      uploadEffectLevel.classList.remove('hidden');
    }

  }


  uploadEffectControls.addEventListener('click', sliderHidden);

  window.ps = {
    effectImage: effectImage,
    setControlValueDecGGG: setControlValueDecGGG
  };

})();
