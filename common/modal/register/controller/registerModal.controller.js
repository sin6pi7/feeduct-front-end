(function () {
    var registerModalCtrl = function ($scope, $timeout, UsersApi, $state) {
        this.cancel = $scope.$dismiss;
        this.registerError = false;
        var that = this;

        this.submit = function (email, password) {
            UsersApi.register({email: email, password: password})
                .then(function (user) {
                    $scope.$close(user);
                    $state.go($state.current, {}, {reload: true});
                })
                .catch(function (error) {
                    that.registerError = error.data.message;
                });
        };
    };

    registerModalCtrl.$inject = ['$scope', '$timeout', 'UsersApi', '$state'];

    angular.module('feeductFrontEnd').controller('RegisterModalCtrl', registerModalCtrl);
})();