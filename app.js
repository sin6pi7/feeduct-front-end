(function () {
    var routes = function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/welcome");

        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'welcome/partials/welcome.partial.html',
                controller: 'LoginModalCtrl',
                controllerAs: 'loginModalCtrl',
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

        var addAuthTokenInterceptor = function () {
            return {
                request: function (config) {
                    var token = window.sessionStorage.getItem('authToken');
                    if (token) {
                        config.headers['Authorization'] = 'Bearer ' + token;
                    }
                    return config;
                }
            }
        };
        $httpProvider.interceptors.push(addAuthTokenInterceptor);
    };

    routes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    angular.module('feeductFrontEnd', ['feeductFrontEnd.feeds', 'ui.router', 'ui.bootstrap'])
        .config(routes)
        .run(function ($rootScope, $state, LoginModalService) {

            $rootScope.$on('$stateChangeStart', function (event, toState) {
                var requireLogin = toState.data.requireLogin,
                    userLogged = !window.sessionStorage.getItem('authToken');

                if (requireLogin && userLogged) {
                    LoginModalService();
                }
            });
        });
})();