(function() {
  var feedsCtrl = function () {
    this.feeds = [
      {
        "id": "1",
        "keywords": "rolki 42-45 damskie",
        "description": "Szukam damskich rolek w rozmiarze 42-45, najlepiej różowe z logiem Hello Kitty."
      },
      {
        "id": "2",
        "keywords": "narty atomic gigantki 170cm",
        "description": "Jestem zainteresowany nartami atomic na wzrost 170cm do slalomu gigant"
      }
    ];
  };

  angular.module('feeductFrontEnd.feeds').controller('FeedsCtrl', feedsCtrl);
})();