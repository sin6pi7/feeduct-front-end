(function () {
    var authCtrl = function ($stateParams, feedsfactory, $rootScope, $http, $location, devConfig) {
        $rootScope.isUserAuthenticated = false;

        $rootScope.foo = "erere";

        this.username = "Luke";
        var login = function () {
            console.log("login");
            $rootScope.isUserAuthenticated = true;
        };

        var logout = function () {
            console.log("logout");
            $rootScope.isUserAuthenticated = false;
        };
        console.log("loaded");

        var init = function (homePath, loginPath, logoutPath) {
            auth.homePath = homePath;
            auth.loginPath = loginPath;
            auth.logoutPath = logoutPath;

            auth.authenticate({}, function (authenticated) {
                if (authenticated) {
                    $location.path(auth.path);
                }
            });

            // Guard route changes and switch to login page if unauthenticated
            $rootScope.$on('$routeChangeStart', function () {
                console.log("change start");
                enter();
            });
        };

        var enter = function () {
            if ($location.path() != auth.loginPath) {
                auth.path = $location.path();
                if (!auth.authenticated) {
                    $location.path(auth.loginPath);
                }
            }
        };

        var authenticate = function (credentials, callback) {
            console.log(credentials);
            var headers = credentials && credentials.username ? {
                authorization: "Basic " + btoa(credentials.username + ":" + credentials.password)
            } : {};

            console.log(headers);
            $http.get(devConfig.endpoint + '/user', {
                headers: headers
            }).success(function (data) {
                if (data.name) {
                    $rootScope.authenticated = true;
                } else {
                    $rootScope.authenticated = false;
                }
                callback && callback(auth.authenticated);
                $location.path(auth.path == auth.loginPath ? auth.homePath : auth.path);
            }).error(function () {
                auth.authenticated = false;
                callback && callback(false);
            });

        };

        var clear = function () {
            $location.path(auth.loginPath);
            auth.authenticated = false;
            $http.post(auth.logoutPath, {}).success(function () {
                console.log("Logout succeeded");
            }).error(function (data) {
                console.log("Logout failed", data);
            });
        };

        var auth = {
            authenticated: false,
            loginPath: '/login',
            logoutPath: '/logout',
            homePath: '/',
            path: $location.path(),
            authenticate: authenticate,
            clear: clear,
            init: init,
            login: login,
            logout: logout
        };

        return auth;
    };

    authCtrl.$inject = ['$stateParams', 'FeedsFactory', '$rootScope', '$http', '$location', 'devConfig'];

    console.log("auth module");
    angular.module('feeductFrontEnd.feeds').controller('AuthCtrl', authCtrl);
})();