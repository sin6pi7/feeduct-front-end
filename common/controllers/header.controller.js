(function () {
  var headerCtrl = function ($state, UsersApi) {
    this.logout = function () {
      UsersApi.logout()
        .then(function () {
          $state.go('welcome');
        })
        .catch(function (error) {
          throw error;
        })
    }
  };

  headerCtrl.$inject = ['$state', 'UsersApi'];

  angular.module('feeductFrontEnd').controller('HeaderCtrl', headerCtrl);
})();