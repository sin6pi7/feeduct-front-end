(function() {
  var feedCtrl = function ($stateParams) {
    this.feedId = $stateParams.id;

    this.feed = {
      id: this.feedId,
      keywords: "czarne kapcie 37",
      description: "to tylko moczek moczunio :)"
    }
  };

  feedCtrl.$inject = ['$stateParams'];

  angular.module('feeductFrontEnd.feeds').controller('FeedCtrl', feedCtrl);
})();