(function () {
  var LoginModalService = function ($modal, $rootScope) {

    function assignCurrentUser(userResult) {
      $rootScope.currentUser = userResult.data.data;
    }

    return function () {
      var instance = $modal.open({
        templateUrl: 'common/login-modal/partials/loginModal.partial.html',
        controller: 'LoginModalCtrl',
        controllerAs: 'LoginModalCtrl',
        backdrop: true
      });

      return instance.result.then(assignCurrentUser);
    };
  };

  LoginModalService.$inject = ['$modal', '$rootScope'];

  angular.module('feeductFrontEnd').service('LoginModalService', LoginModalService);

})();