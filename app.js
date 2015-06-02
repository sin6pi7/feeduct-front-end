(function () {
  var routes = function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/feeds");

    $stateProvider.
      state('feeds', {
        url: '/feeds',
        templateUrl: 'feeds/feeds.layout.html',
        abstract: 'true'
      });
  };
  routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  angular.module('feeductFrontEnd', ['feeductFrontEnd.feeds', 'ui.router'])
    .config(routes);
})();