(function () {
  var routes = function ($stateProvider) {
    $stateProvider
      .state('feeds.list', {
        url: '',
        templateUrl: 'feeds/list/partials/feeds.partial.html',
        controller: 'FeedsCtrl',
        controllerAs: 'feedsCtrl'
      })
      .state('feeds.feed', {
        url: '/:id',
        templateUrl: 'feeds/feed/partials/feed.partial.html',
        controller: 'FeedCtrl',
        controllerAs: 'feedCtrl'
      });
  };
  routes.$inject = ['$stateProvider'];

  angular.module('feeductFrontEnd.feeds', ['ui.router'])
    .config(routes);
})();