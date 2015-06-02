(function () {
  var routes = function ($stateProvider) {
    $stateProvider.
      state('feeds.list', {
        url: '',
        views: {
          'feeds-list': {
            templateUrl: 'feeds/partials/feeds.partial.html',
            controller: 'FeedsCtrl',
            controllerAs: 'feedsCtrl'
          }
        }
      });
  };
  routes.$inject = ['$stateProvider'];

  angular.module('feeductFrontEnd.feeds', ['ui.router'])
    .config(routes);
})();