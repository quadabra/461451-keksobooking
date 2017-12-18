'use strict';

window.form = (function () {

  var myForm = document.querySelector('.notice__form');
  var inputTitle = myForm.querySelector('#title');
  var inputAddress = myForm.querySelector('#address');
  var inputType = myForm.querySelector('#type');
  var inputPrice = myForm.querySelector('#price');
  var inputCheckIn = myForm.querySelector('#timein');
  var inputCheckOut = myForm.querySelector('#timeout');
  var roomsNumber = myForm.querySelector('#room_number');
  var guestCapacity = myForm.querySelector('#capacity');
  var formSubmit = myForm.querySelector('.form__submit');
  var myInputs = document.querySelectorAll('fieldset');

  var timeIn = ['12:00', '13:00', '14:00'];
  var timeOut = ['12:00', '13:00', '14:00'];
  var apartmentTypes = ['bungalo', 'flat', 'house', 'palace'];
  var apartmentPrices = ['0', '1000', '5000', '10000'];

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var myInputsSwitch = function (arr, attr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = attr;
    }
  };

  var inputDisable = true;
  var inputEnable = false;

  myInputsSwitch(myInputs, inputDisable);

  inputTitle.required = true;
  inputAddress.setAttribute('readonly', 'readonly');
  inputAddress.required = true;
  var priceList = {
    '0': '1000',
    '1': '0',
    '2': '5000',
    '3': '10000'
  };
  var minPrice = priceList[inputType.selectedIndex];
  var maxPrice = 10000000;
  inputPrice.setAttribute('min', minPrice);
  inputPrice.setAttribute('max', maxPrice);
  inputPrice.required = true;

  inputTitle.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30 || target.value.length > 100) {
      target.setCustomValidity('От 30 до 100 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  inputType.addEventListener('change', function () {
    window.synchronizeFields(inputType, inputPrice, apartmentTypes, apartmentPrices, syncValueWithMin);
  });

  inputPrice.addEventListener('invalid', function (evt) {
    var target = evt.target;
    if (target.value < priceList[inputType.selectedIndex]) {
      target.setCustomValidity('Минимальное значение ' + priceList[inputType.selectedIndex]);
    } else {
      target.setCustomValidity('');
    }
  });

  inputCheckIn.addEventListener('change', function () {
    window.synchronizeFields(inputCheckIn, inputCheckOut, timeIn, timeOut, syncValues);
  });

  inputCheckOut.addEventListener('change', function () {
    window.synchronizeFields(inputCheckOut, inputCheckIn, timeOut, timeIn, syncValues);
  });

  var roomsValidate = function () {
    for (var i = 0; i < roomsNumber.options.length; i++) {
      guestCapacity.options[i].hidden = false;
    }
    switch (roomsNumber.selectedIndex) {
      case 0:
        guestCapacity.options[0].hidden = true;
        guestCapacity.options[1].hidden = true;
        guestCapacity.options[3].hidden = true;
        break;
      case 1:
        guestCapacity.options[0].hidden = true;
        guestCapacity.options[3].hidden = true;
        break;
      case 2:
        guestCapacity.options[3].hidden = true;
        break;
      case 3:
        guestCapacity.options[0].hidden = true;
        guestCapacity.options[1].hidden = true;
        guestCapacity.options[2].hidden = true;
    }
    for (var j = 0; j < roomsNumber.options.length; j++) {
      if (guestCapacity.options[j].hidden === true) {
        guestCapacity.options[j].removeAttribute('selected');
      } else {
        guestCapacity.options[j].selected = true;
      }
    }
  };
  roomsValidate();
  roomsNumber.addEventListener('change', roomsValidate);

  formSubmit.addEventListener('click', function () {
  });

  return {
    enable: function () {
      myInputsSwitch(myInputs, inputEnable);
      myForm.classList.remove('notice__form--disabled');
    },
    getAddress: function (x, y) {
      inputAddress.value = 'x: ' + x + ' y: ' + y;
    }
  };

})();
