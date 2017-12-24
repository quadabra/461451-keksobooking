'use strict';

window.form = (function () {

  var MAX_PRICE = 10000000;

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
  var formReset = myForm.querySelector('.form__reset');

  var timeIn = ['12:00', '13:00', '14:00'];
  var timeOut = ['12:00', '13:00', '14:00'];
  var apartmentTypes = ['bungalo', 'flat', 'house', 'palace'];
  var apartmentPrices = ['0', '1000', '5000', '10000'];
  var rooms = ['1', '2', '3', '100'];
  var guests = ['2', '1, 2', '0, 1, 2', '3'];

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var syncValueWithOption = function (element, value) {
    for (var i = 0; i < element.options.length; i++) {
      if (value.indexOf(i) !== -1) {
        element.options[i].hidden = false;
        element.options[i].selected = true;
      } else {
        element.options[i].hidden = true;
      }
    }
  };

  var myInputsSwitch = function (inputFields, attribute) {
    for (var i = 0; i < inputFields.length; i++) {
      inputFields[i].disabled = attribute;
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
  inputPrice.setAttribute('min', minPrice);
  inputPrice.setAttribute('max', MAX_PRICE);
  inputPrice.required = true;

  inputPrice.addEventListener('invalid', function (evt) {
    if (!evt.target.value) {
      evt.target.setCustomValidity('Установите цену');
    } else {
      evt.target.setCustomValidity('');
    }
  });

  inputTitle.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30 || target.value.length > 100) {
      target.setCustomValidity('От 30 до 100 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  inputAddress.addEventListener('invalid', function (evt) {
    if (!evt.target.value) {
      evt.target.setCustomValidity('Установите пин');
    } else {
      evt.target.setCustomValidity('');
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

  roomsNumber.addEventListener('change', function () {
    window.synchronizeFields(roomsNumber, guestCapacity, rooms, guests, syncValueWithOption);
  });

  var onSave = function () {
    formSubmit.style = 'background-color: green;';
    formSubmit.textContent = 'Отправлено';
  };

  var onError = function (message) {
    formSubmit.style = 'background-color: red;';
    formSubmit.textContent = message;
  };

  formSubmit.addEventListener('click', function (evt) {
    if (inputAddress.validity.valid && inputTitle.validity.valid && inputPrice.validity.valid) {
      var data = new FormData(myForm);
      evt.preventDefault();
      window.backend.save(data, onSave, onError);
    }
  });

  formReset.addEventListener('click', function () {
    formSubmit.style = 'none';
    formSubmit.textContent = 'Опубликовать';
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
