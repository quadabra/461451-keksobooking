'use strict';

window.backend = (function () {
  return {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError(xhr.response);
        }
        xhr.addEventListener('error', function () {
          onError('Поломалося');
        });
        xhr.addEventListener('timeout', function () {
          onError('Люди ау ' + xhr.timeout + 'мс');
        });

        xhr.timeout = 10000;

        return xhr;
      });
    },
    save: function () {

    }
  };
})();
