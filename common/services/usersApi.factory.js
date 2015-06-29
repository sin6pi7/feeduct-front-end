(function () {
  var UsersApi = function ($http, devConfig, $q) {

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
        })
        .catch(function (error) {
          throw error;
        });
    }
  };

  UsersApi.$inject = ['$http', 'devConfig', '$q'];

  angular.module('feeductFrontEnd').service('UsersApi', UsersApi);
})();