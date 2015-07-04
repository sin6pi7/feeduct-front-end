(function () {
    var feedsCtrl = function (feedsFactory) {
        var that = this;
        init();

        function init() {
            this.newFeedFormVisible = false;
            this.feed = {};
            loadAllFeeds();
        }

        function loadAllFeeds() {
            feedsFactory.getAll()
                .then(function (feeds) {
                    that.feeds = feeds;
                });
        }

        this.loadingNewFeed = false;

        this.addFeed = function () {
            that.loadingNewFeed = true;
            feedsFactory.addFeed(this.feed)
                .success(function () {
                    that.loadingNewFeed = false;
                    that.hideNewFeedForm();
                    loadAllFeeds();
                })
                .error(function (error) {
                    console.error(error);
                });
        };

        this.showNewFeedForm = function () {
            this.newFeedFormVisible = true;
        };

        this.hideNewFeedForm = function () {
            this.newFeedFormVisible = false;
        };

        this.remove = function (feed) {
            feedsFactory.removeFeed(feed.id.id)
                .success(function () {
                    loadAllFeeds();
                })
                .error(function (error) {
                    console.error(error);
                });
        }
    };

    feedsCtrl.$inject = ['FeedsFactory'];

    angular.module('feeductFrontEnd.feeds').controller('FeedsCtrl', feedsCtrl);
})();