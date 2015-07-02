(function () {
    var UsersApi = function ($http, devConfig, $q, $rootScope, $state) {

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
                    $state.go('feeds.list');
                }).error(function (error) {
                    console.error(error)
                });
        }

        function logout() {
            $http.post('http://localhost:9000/api/v1/logout', {})
                .success(function (response) {
                    console.log("logout success");
                    delete $rootScope.currentUser;
                    window.sessionStorage.removeItem(devConfig.AUTH_TOKEN_NAME);
                    $state.go('welcome');
                }).error(function (error) {
                    console.log(error)
                });
        }

        function register(credentials) {
            return $http.post('http://localhost:9000/api/v1/register', credentials)
                .success(function (response) {
                    console.log("successfully registred user")

            });
        }
    };

    UsersApi.$inject = ['$http', 'devConfig', '$q', '$rootScope', '$state'];

    angular.module('feeductFrontEnd').service('UsersApi', UsersApi);
})();