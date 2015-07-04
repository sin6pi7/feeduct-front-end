(function() {
    var loginCtrl = function(LoginModalService) {
        var showLoginModal = function () {
            LoginModalService();
        };

        return {
            showLoginModal: showLoginModal
        };
    };
    
    loginCtrl.$inject = ["LoginModalService"];

    angular.module("feeductFrontEnd").controller("LoginCtrl", loginCtrl)
})();