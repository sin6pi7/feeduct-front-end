(function () {
  var feedsCtrl = function (feedsFactory) {
    var that = this;
    init();

    function init() {
      this.newFeedFormVisible = false;
      this.feed = {};
      feedsFactory.getAll().then(function (feeds) {
        that.feeds = feeds;
      });
    }

    this.addFeed = function() {
      feedsFactory.addFeed(this.feed).then(
        function(response) {
          init();
          that.hideNewFeedForm();
        },
        function(error) {
          console.error(error);
        }
      );
    };

    this.showNewFeedForm = function () {
      this.newFeedFormVisible = true;
    };

    this.hideNewFeedForm = function () {
      this.newFeedFormVisible = false;
    };
  };

  feedsCtrl.$inject = ['FeedsFactory'];

  angular.module('feeductFrontEnd.feeds').controller('FeedsCtrl', feedsCtrl);
})();