'use strict';
(function () {
// Объявляем переменные
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  var ESC_KEYCODE = 27;

  // Функция для открытия окна Редактирования фото
  // Удаляем класс hidden и добавляем обработчик событий который закрывает
  // окна Редактирования фото по нажатию на Esc
  function openPopup(e) {
    e.preventDefault();
    uploadOverlay.classList.remove('hidden');
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

  // Фуекция для смены филтра на редактируемой картинке
  // Если id родителя перед элементом на который произошло нажатие
  // то добавляем картинке соответствующий класс
  function setFilterToImage(e) {
    effectImage.classList.add('effect-image-preview');
    var target = e.target.parentNode;
    for (var i = 0; i < ARR_OF_INPUT_IDS.length; i++) {
      if (target.previousElementSibling.id === ARR_OF_INPUT_IDS[i]) {
        effectImage.className = '';
        effectImage.classList.add(ARR_OF_IMAGE_CLASSES[i]);
      }
    }
  }

  // Навешиваем обработчики событий
  uploadEffectControls.addEventListener('click', setFilterToImage);
})();
