(function () {
    var headerCtrl = function ($state, UsersApi, devConfig) {
        this.logout = function () {
            UsersApi.logout()
                .then(function () {
                    $state.go('welcome');
                })
                .catch(function (error) {
                    throw error;
                })
        };

        this.isUserLoggedIn = function() {
            return !!window.sessionStorage.getItem(devConfig.AUTH_TOKEN_NAME)
        }
    };

    headerCtrl.$inject = ['$state', 'UsersApi', 'devConfig'];

    angular.module('feeductFrontEnd').controller('HeaderCtrl', headerCtrl);
})();