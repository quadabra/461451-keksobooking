'use strict';

var generateObjects = 8;

var getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var generateAvatars = function (amount) {
  var list = [];
  for (var i = 0; i < amount; i++) {
    list[i] = 'img/avatars/user' + '0' + (i + 1) + '.png';
  }
  return list;
};
var avatarList = generateAvatars(generateObjects).sort(function () {
  return 0.5 - Math.random();
});

var titlesList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

titlesList.sort(function () {
  return 0.5 - Math.random();
});

var typeList = ['flat', 'house', 'bungalo'];
var typeEqual = ['Квартира', 'Дом', 'Бунгало'];

var replace = function (type) {
  var equal;
  for (var i = 0; i < typeList.length; i++) {
    if (type === typeList[i]) {
      equal = typeEqual[i];
    }
  }
  return equal;
};

var timesCheck = ['12:00', '13:00', '14:00'];

var featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];


var generateFeatures = function (arr, amount) {
  var list = [];
  for (var i = 0; i < amount; i++) {
    var count = getRandomValue(1, arr.length);
    var arrRandom = arr.sort(function () {
      return 0.5 - Math.random();
    });
    var arrNew = [];
    for (var j = 0; j < count; j++) {
      arrNew[j] = arrRandom[j];
    }
    list[i] = arrNew.join(', ');
  }
  return list;
};

var randomFeatures = generateFeatures(featuresList, generateObjects);

var photosList = [];

var generateLocations = function (min, max, amount) {
  var coordinates = [];
  for (var i = 0; i < amount; i++) {
    coordinates[i] = getRandomValue(min, max);
  }
  return coordinates;
};
var minX = 300;
var maxX = 900;
var minY = 100;
var maxY = 500;
var locationsX = generateLocations(minX, maxX, generateObjects);
var locationsY = generateLocations(minY, maxY, generateObjects);

var generateHotels = function (objectsAmount) {
  var objects = [];
  for (var i = 0; i < objectsAmount; i++) {
    objects[i] = {
      'author': {
        'avatar': avatarList[i]
      },
      'offer': {
        'title': titlesList[i],
        'address': locationsX[i] + ', ' + locationsY[i],
        'price': getRandomValue(1000, 1000000),
        'type': typeList[getRandomValue(0, 2)],
        'rooms': getRandomValue(1, 5),
        'guests': getRandomValue(1, 10),
        'checkin': timesCheck[getRandomValue(0, 2)],
        'checkout': timesCheck[getRandomValue(0, 2)],
        'features': randomFeatures[i],
        'description': '',
        'photos': photosList[i]
      },
      'location': {
        'x': locationsX[i],
        'y': locationsY[i]
      }
    };
  }
  return objects;
};

var hotels = generateHotels(generateObjects);

var makeFragment = function (arr, templates) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(templates(arr[i]));
  }
  return fragment;
};

var makeFeatureFragment = function (str) {
  var arr = str.split(', ');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var item = document.createElement('li');
    item.classList.add('feature');
    item.classList.add('feature--' + arr[i]);
    fragment.appendChild(item);
  }
  return fragment;
};

var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var renderMapPin = function (hotel) {
  var mapPin = mapPinTemplate.cloneNode(true);
  mapPin.style.left = (hotel.location.x - 20) + 'px';
  mapPin.style.top = (hotel.location.y - 40) + 'px';
  mapPin.querySelector('img').src = hotel.author.avatar;
  return mapPin;
};

var mapBlock = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var renderMapCard = function (hotel) {
  var mapCard = mapCardTemplate.cloneNode(true);
  var featureList = mapCard.querySelector('.popup__features');
  while (featureList.firstChild) {
    featureList.removeChild(featureList.firstChild);
  }
  mapCard.querySelector('img').src = hotel.author.avatar;
  mapCard.querySelector('h3').textContent = hotel.offer.title;
  mapCard.querySelector('small').textContent = hotel.offer.address;
  mapCard.querySelector('.popup__price').textContent = hotel.offer.price + '\u20BD/ночь';
  mapCard.querySelector('h4').textContent = replace(hotel.offer.type);
  mapCard.querySelector('p:nth-of-type(3)').textContent = hotel.offer.rooms + ' комнаты для '
    + hotel.offer.guests + ' гостей';
  mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + hotel.offer.checkin +
    ', выезд до ' + hotel.offer.checkout;
  featureList.appendChild(makeFeatureFragment(hotel.offer.features));
  mapCard.querySelector('p:last-of-type').textContent = hotel.offer.description;
  return mapCard;
};

mapBlock.insertBefore(makeFragment(hotels, renderMapCard), mapFilters);
mapPins.appendChild(makeFragment(hotels, renderMapPin));

var myPin = mapBlock.querySelector('.map__pin--main');
var mapPinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
var myForm = document.querySelector('.notice__form');
var myInputs = document.querySelectorAll('fieldset');
var inputDisable = true;
var inputEnable = false;
var myInputsSwitch = function (arr, attr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = attr;
  }
};

myInputsSwitch(myInputs, inputDisable);

var popupCards = mapBlock.querySelectorAll('.map__card');
var classAddArray = function (arr, cls) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].classList.add(cls);
  }
};
var classRemoveArray = function (arr, cls) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].classList.remove(cls);
  }
};

classAddArray(popupCards, 'hidden');
classAddArray(mapPinList, 'hidden');

var onPinSet = function () {
  mapBlock.classList.remove('map--faded');
  myForm.classList.remove('notice__form--disabled');
  myInputsSwitch(myInputs, inputEnable);
  classRemoveArray(mapPinList, 'hidden');
  myPin.removeEventListener('mouseup', onPinSet);
};
myPin.addEventListener('mouseup', onPinSet);

mapPins.addEventListener('click', function (evt) {
  var target = evt.target;
  while (target !== mapPins) {
    if (target.className === 'map__pin') {
      target.classList.add('map__pin--active');
      for (var i = 0; i < mapPinList.length; i++) {
        if (mapPinList[i].className === 'map__pin map__pin--active') {
          popupCards[i].classList.remove('hidden');
          if (mapPinList[i] !== target) {
            mapPinList[i].classList.remove('map__pin--active');
            popupCards[i].classList.add('hidden');
          }
        }
      }
      return;
    }
    if (target.className === 'map__pin map__pin--active') {
      target.classList.remove('map__pin--active');
      for (var j = 0; j < mapPinList.length; j++) {
        if (mapPinList[j].className === 'map__pin') {
          popupCards[j].classList.add('hidden');
        }
      }
    }
    target = target.parentNode;
  }
});

mapBlock.addEventListener('click', function (evt) {
  var target = evt.target;
  if (!target.classList.contains('popup__close')) {
    return;
  }
  target.parentNode.classList.toggle('hidden');
  for (var i = 0; i < popupCards.length; i++) {
    if (target.parentNode === popupCards[i]) {
      mapPinList[i].classList.remove('map__pin--active');
    }
  }
});

var ESC_KEY = 27;
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY) {
    for (var i = 0; i < popupCards.length; i++) {
      if (!popupCards[i].classList.contains('hidden')) {
        popupCards[i].classList.add('hidden');
        mapPinList[i].classList.remove('map__pin--active');
      }
    }
  }
});


var inputTitle = myForm.querySelector('#title');
var inputAddress = myForm.querySelector('#address');
var inputType = myForm.querySelector('#type');
var inputPrice = myForm.querySelector('#price');
var inputCheckIn = myForm.querySelector('#timein');
var inputCheckOut = myForm.querySelector('#timeout');
var roomsNumber = myForm.querySelector('#room_number');
var guestCapacity = myForm.querySelector('#capacity');
var formSubmit = myForm.querySelector('.form__submit');
inputTitle.required = true;
inputAddress.setAttribute('readonly', 'readonly');
inputAddress.required = true;
var minPrice = 5000;
var maxPrice = 10000000;
inputPrice.setAttribute('min', minPrice);
inputPrice.setAttribute('max', maxPrice);
inputPrice.required = true;

inputTitle.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 30 || target.value.length > 100) {
    target.setCustomValidity('От 30 до 100 символов')
  } else {
    target.setCustomValidity('');
  }
});

inputType.addEventListener('change', function (evt) {
  var target = evt.target;
  switch (target.selectedIndex) {
    case 0:
      minPrice = 1000;
      break;
    case 1:
      minPrice = 0;
      break;
    case 2:
      minPrice = 5000;
      break;
    case 3:
      minPrice = 10000;
      break;
    default:
      minPrice = 5000;
  }
  inputPrice.setAttribute('min', minPrice);
});

inputPrice.addEventListener('invalid', function (evt) {
  var target = evt.target;
  if (target.value < minPrice) {
    target.setCustomValidity('Минимальное значение ' + minPrice);
  } else {
    target.setCustomValidity('')
  }
});

inputCheckIn.addEventListener('change', function (evt) {
  inputCheckOut.selectedIndex = evt.target.selectedIndex;
});

inputCheckOut.addEventListener('change', function (evt) {
  inputCheckIn.selectedIndex = evt.target.selectedIndex;
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
