'use strict';

var generateObjects = 8;
var getRandomArray = function (arr) {
  var randomArr = [];
  for (var i = 0; i < arr.length; i++) {
    var index = Math.floor(Math.random() * arr.length);
    randomArr[i] = arr[index];
    arr.splice(index, 1);
  }
  return randomArr;
};

var avatarList = (function () {
  var list = [];
  for (var i = 0; i < generateObjects; i++) {
    list[i] = 'img/avatars/user' + '0' + (i + 1) + '.png';
  }
  return list;
}());

var titleList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var addressList = (function () {
  var list = [];
  var x = 0;
  var y = 0;
  for (var i = 0; i < generateObjects; i++) {
    x = Math.round(Math.random() * 600) + 300;
    y = Math.round(Math.random() * 400) + 100;
    list[[i][1]] = x;
    list[[i][2]] = y;
  }
  return list;
});
