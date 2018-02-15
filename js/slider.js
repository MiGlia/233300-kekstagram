'use strict';
(function () {
  var uploadEffectLevelPin = document.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelVal = document.querySelector('.upload-effect-level-val');

  uploadEffectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    function onMouseMove(moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      uploadEffectLevelPin.style.left = (uploadEffectLevelPin.offsetLeft - shift.x) + 'px';
      uploadEffectLevelVal.style.width = (uploadEffectLevelPin.offsetLeft - shift.x) + 'px';
      functionName();
      functionName2(1);
    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);


  });


  function functionName() {
    if (uploadEffectLevelPin.offsetLeft < 0) {
      uploadEffectLevelPin.style.left = '0px';
    }
    if (uploadEffectLevelPin.offsetLeft > 455) {
      uploadEffectLevelPin.style.left = '455px';
    }
  }

  function functionName2(max) {
    var coef = uploadEffectLevelPin.offsetLeft / 455;
    window.ps.effectImage.filter = 'sepia(' + (max * coef) + ')';
  }


})();
