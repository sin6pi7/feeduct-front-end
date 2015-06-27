(function () {
  var routes = function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/feeds");

    $stateProvider.
      state('feeds', {
        url: '/feeds',
        templateUrl: 'feeds/feeds.layout.html',
          controller: 'AuthCtrl',
          controllerAs: 'authCtrl',
        abstract: 'true'
      });

      $httpProvider.defaults.useXDomain = true;
      //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    //authCtrl.init('/', '/login', '/logout');
  };
  routes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  angular.module('feeductFrontEnd', ['feeductFrontEnd.feeds', 'ui.router'])
    .config(routes);
})();