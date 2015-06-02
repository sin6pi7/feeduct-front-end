(function() {
  var feedCtrl = function ($stateParams, feedsfactory) {
    var that = this;
    this.feedId = $stateParams.id;

    feedsfactory.getById(this.feedId).then(
      function (data) {
        that.feed = data[0];
        console.log(that.feed);
      }
    );
  };

  feedCtrl.$inject = ['$stateParams', 'FeedsFactory'];

  angular.module('feeductFrontEnd.feeds').controller('FeedCtrl', feedCtrl);
})();