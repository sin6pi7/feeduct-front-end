(function () {
    var UsersApi = function ($http, devConfig, $rootScope) {
        return {
            login: login,
            logout: logout,
            register: register
        };

        function login(credentials) {
            return $http.post('http://localhost:9000/api/v1/login', credentials)
                .success(function (response) {
                    window.sessionStorage.setItem(devConfig.AUTH_TOKEN_NAME, response.data[0].token);
                    $rootScope.currentUser = {credentials: credentials};
                }).error(function (error) {
                    console.error(error)
                });
        }

        function logout() {
            return $http.post('http://localhost:9000/api/v1/logout', {})
                .success(function (response) {
                    delete $rootScope.currentUser;
                    window.sessionStorage.removeItem(devConfig.AUTH_TOKEN_NAME);
                })
                .error(function (error) {
                    console.log(error)
                });
        }

        function register(credentials) {
            return $http.post('http://localhost:9000/api/v1/register', credentials)
                .success(function (response) {
                    console.log("Successfully registered user")
                })
                .error(function (error) {
                    console.error("Cannot register new user: ", error);
                });
        }
    };

    UsersApi.$inject = ['$http', 'devConfig', '$rootScope'];

    angular.module('feeductFrontEnd').service('UsersApi', UsersApi);
})();