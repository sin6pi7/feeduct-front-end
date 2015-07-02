(function () {
  var registerModalService = function ($modal, $rootScope) {

    return function () {
      var instance = $modal.open({
        templateUrl: 'common/login-modal/partials/registerModal.partial.html',
        controller: 'RegisterModalCtrl',
        controllerAs: 'RegisterModalCtrl',
        backdrop: true
      });
    };
  };

  registerModalService.$inject = ['$modal', '$rootScope'];

  angular.module('feeductFrontEnd').service('RegisterModalService', registerModalService);

})();