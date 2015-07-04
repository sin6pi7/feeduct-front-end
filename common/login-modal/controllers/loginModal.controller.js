(function () {

    var LoginModalCtrl = function ($scope, $timeout, UsersApi, $state, RegisterModalService) {
        this.cancel = $scope.$dismiss;
        this.loginError = false;
        var that = this;

        this.submit = function (email, password) {
            UsersApi.login({email: email, password: password})
                .then(function (user) {
                    $scope.$close(user);
                    $state.go('feeds.list', {}, {reload: true});
                })
                .catch(function (error) {
                    that.loginError = error;
                });
        };

        this.goToRegistration = function () {
            this.cancel();
            RegisterModalService();
        };
    };

    LoginModalCtrl.$inject = ['$scope', '$timeout', 'UsersApi', '$state', 'RegisterModalService'];

    angular.module('feeductFrontEnd').controller('LoginModalCtrl', LoginModalCtrl);
})();