(function () {

  var LoginModalCtrl = function ($scope, $timeout, UsersApi) {
    this.cancel = $scope.$dismiss;
    this.loginError = false;
    var that = this;

    this.submit = function (email, password) {
      UsersApi.login({email: email, password: password})
      .then(function (user) {
        $scope.$close(user);
      })
      .catch(function (error) {
        that.loginError = error;
        $timeout(function () {
          that.loginError = false;
        }, 2000);
      });
    };
  };

  LoginModalCtrl.$inject = ['$scope', '$timeout', 'UsersApi'];

  angular.module('feeductFrontEnd').controller('LoginModalCtrl', LoginModalCtrl);
})();