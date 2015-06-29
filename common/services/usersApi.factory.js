(function () {
  var UsersApi = function ($http, devConfig) {

    var usersApi = {
      login: login
    };

    return usersApi;

    function login(credentials) {
      var validCredentials = credentials.email && credentials.password;

      var headers =  validCredentials ? {
        Authorization: "Basic " + btoa(credentials.email + ":" + credentials.password)
      } : {};

      return $http.get(
        devConfig.endpoint + '/user',
        {headers: headers})
        .then(function (response) {
          var data = response.data;
          if (typeof data.authenticated === "undefined") {
            throw new Error('Authentication failed.');
          }
          return {
            username: data.principal.username,
            role: data.authorities.role
          }
        });
    }
  };

  UsersApi.$inject = ['$http', 'devConfig'];

  angular.module('feeductFrontEnd').service('UsersApi', UsersApi);
})();