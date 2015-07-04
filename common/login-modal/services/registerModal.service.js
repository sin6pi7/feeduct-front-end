(function () {
  var registerModalService = function ($modal) {

    return function () {
      $modal.open({
        templateUrl: 'common/login-modal/partials/registerModal.partial.html',
        controller: 'RegisterModalCtrl',
        controllerAs: 'RegisterModalCtrl',
        backdrop: false
      });
    };
  };

  registerModalService.$inject = ['$modal'];

  angular.module('feeductFrontEnd').service('RegisterModalService', registerModalService);
})();