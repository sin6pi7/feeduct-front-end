(function () {

  var LoginModalCtrl = function ($scope, UsersApi) {
    this.cancel = $scope.$dismiss;

    this.submit = function (email, password) {
      UsersApi.login({email: email, password: password}).then(function (user) {
        $scope.$close(user);
      },
      function (error) {
        $scope.$dismiss(error);
      });
    };
  };

  LoginModalCtrl.$inject = ['$scope', 'UsersApi'];

  angular.module('feeductFrontEnd').controller('LoginModalCtrl', LoginModalCtrl);
})();