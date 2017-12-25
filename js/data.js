// файл не подключен. удалять в заданиях небыло.
'use strict';
window.generatedHotels = (function () {

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

  var timesCheck = ['12:00', '13:00', '14:00'];

  var featuresList = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];


  var generateFeatures = function (features, amount) {
    var list = [];
    for (var i = 0; i < amount; i++) {
      var count = getRandomValue(1, features.length);
      var featuresRandom = features.sort(function () {
        return 0.5 - Math.random();
      });
      var featuresNew = [];
      for (var j = 0; j < count; j++) {
        featuresNew[j] = featuresRandom[j];
      }
      list[i] = featuresNew;
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

  return generateHotels(generateObjects);

})();
