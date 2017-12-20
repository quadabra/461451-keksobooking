'use strict';

window.synchronizeFields = (function () {
  return function (inputElem, outElem, valuesIn, valuesOut, callback) {
    var valueIndex = valuesIn.indexOf(inputElem.value);
    callback(outElem, valuesOut[valueIndex]);
  };
})();
