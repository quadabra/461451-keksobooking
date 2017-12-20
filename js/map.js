'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapPins = mapBlock.querySelector('.map__pins');
  var myPin = mapBlock.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters-container');

  var makeFragment = function (arr, templates) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(templates(arr[i]));
    }
    return fragment;
  };

  var loadedHotels;

  var onLoad = function (hotels) {
    loadedHotels = hotels;
    return loadedHotels;
  };

  var onError = function (errorMessage) {
    var fragment = document.createElement('div');
    var errorImage = document.createElement('img');
    var errorText = document.createElement('p');
    fragment.appendChild(errorImage);
    fragment.appendChild(errorText);
    errorImage.src = 'img/error.jpg';
    errorImage.width = 360;
    errorImage.height = 240;
    errorImage.style = 'display: block; margin: 10px auto; border: 1px solid white;';
    errorText.textContent = 'Насяльника!!!11, ' + errorMessage;
    errorText.style = 'color: white; font-size: 18px;';
    fragment.style = 'width: 400px; text-align: center; z-index: 10; margin: 0; padding: 0; margin-right: auto; ' +
      'background-color : black; top: 30%; left: 50%; transform: translateX(-50%);';
    fragment.style.position = 'fixed';
    document.body.insertAdjacentElement('afterbegin', fragment);
  };

  window.backend.load(onLoad, onError);

  var renderMapPins = function () {
    mapPins.appendChild(makeFragment(loadedHotels || window.generatedHotels, window.pins.render));
  };

  var renderMapCards = function () {
    mapBlock.insertBefore(makeFragment(loadedHotels || window.generatedHotels, window.cards.render), mapFilters);
  };

  var onMapClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('popup__close')) {
      window.cards.popupClose(evt);
    } else {
      window.pins.pinSwitch(evt);
      window.cards.popupSwitch();
    }
  };

  var onPinSet = function () {
    renderMapPins();
    renderMapCards();
    window.form.enable();
    mapBlock.classList.remove('map--faded');
    mapBlock.addEventListener('click', onMapClick);
    document.addEventListener('keydown', window.cards.popupEsc);
    myPin.removeEventListener('mouseup', onPinSet);
  };

  myPin.addEventListener('mousedown', window.pins.move);
  myPin.addEventListener('mouseup', onPinSet);

})();
