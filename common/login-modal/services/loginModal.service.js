(function () {

  var LoginModalService = function ($modal, $rootScope) {

    function assignCurrentUser(user) {
      $rootScope.currentUser = user;
      return user;
    }

    return function () {
      var instance = $modal.open({
        templateUrl: 'common/login-modal/partials/loginModal.partial.html',
        controller: 'LoginModalCtrl',
        controllerAs: 'LoginModalCtrl',
        backdrop: false
      });

      return instance.result.then(assignCurrentUser);
    };
  };

  LoginModalService.$inject = ['$modal', '$rootScope'];

  angular.module('feeductFrontEnd').service('LoginModalService', LoginModalService);

})();