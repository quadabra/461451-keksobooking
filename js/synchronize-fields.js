'use strict';

window.synchronizeFields = (function () {
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');
  var apartmentType = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');
  var timeIn = ['12:00', '12:00', '14:00'];
  var timeOut = ['12:00', '12:00', '14:00'];
  var apartmentTypes = ['bungalo', 'flat', 'house', 'palace'];
  var apartmentPrices = ['0', '1000', '5000', '10000'];

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(checkinTime, checkoutTime, timeIn, timeOut, syncValues);
  window.synchronizeFields(checkoutTime, checkinTime, timeOut, timeIn, syncValues);
  window.synchronizeFields(apartmentType, pricePerNight, apartmentTypes, apartmentPrices, syncValueWithMin);
  return function (inputElem, outElem, valuesIn, valuesOut, callback) {
      var valueIndex = valuesIn.indexOf(inputElem.value);
      callback(outElem, valuesOut[valueIndex]);
  };
})();
