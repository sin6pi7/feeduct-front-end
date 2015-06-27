(function () {
  var routes = function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/feeds");

    $stateProvider
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'welcome/partials/welcome.partial.html',
        data: {
          requireLogin: false
        }
      })
      .state('feeds', {
        url: '/feeds',
        templateUrl: 'feeds/feeds.layout.html',
        abstract: 'true',
        data: {
          requireLogin: true
        }
      });

    //$httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  };

  routes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  angular.module('feeductFrontEnd', ['feeductFrontEnd.feeds', 'ui.router', 'ui.bootstrap'])
    .config(routes)
    .run(function ($rootScope, $state, LoginModalService) {

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;

        if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
          event.preventDefault();

          LoginModalService()
            .then(function () {
              return $state.go(toState.name, toParams);
            })
            .catch(function () {
              $state.go('welcome');
            });
        }
      });
    });
})();