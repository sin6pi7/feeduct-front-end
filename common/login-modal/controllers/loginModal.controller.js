(function () {

    var LoginModalCtrl = function ($scope, $timeout, UsersApi, $state) {
        this.cancel = $scope.$dismiss;
        this.loginError = false;
        var that = this;

        this.submit = function (email, password) {
            UsersApi.login({email: email, password: password})
                .then(function (user) {
                    $scope.$close(user);
                    $state.go($state.current, {}, {reload: true});
                })
                .catch(function (error) {
                    that.loginError = error;
                });
        };
    };

    LoginModalCtrl.$inject = ['$scope', '$timeout', 'UsersApi', '$state'];

    angular.module('feeductFrontEnd').controller('LoginModalCtrl', LoginModalCtrl);
})();