(function () {
  var routes = function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/welcome");

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

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.withCredentials = true;
  };

  routes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  angular.module('feeductFrontEnd', ['feeductFrontEnd.feeds', 'ui.router', 'ui.bootstrap'])
    .config(routes)
    .run(function ($rootScope, $state, LoginModalService, UsersApi) {

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;

        if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
          event.preventDefault();

          // let the browser use cookies first
          UsersApi.login({})
          // cookies worked - save user
          .then(function (user) {
            $rootScope.currentUser = user;
          })
          // didn't work - prompt with login modal
          .catch(LoginModalService)
          // logged in either with cookies or modal => go to desired state
          .then(function () {
            return $state.go(toState.name, toParams);
          })
          // modal didn't work either - login failed => redirect to welcome page
          .catch(function (err) {
            return $state.go('welcome');
          });
        }
      });

    });
})();