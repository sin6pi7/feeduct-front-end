(function () {
  var UsersApi = function ($http, devConfig, $q) {

    var usersApi = {
      login: login,
      logout: logout
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
            roles: data.authorities.map(function (auth) { return auth.role; })
          }
        })
        .catch(function (error) {
          throw error;
        });
    }

    function logout() {
      // TODO: POST to /logout and then clear $rootScope.currentUser
      // placeholder - remove when implemented
      var deferred = $q.defer();
      deferred.resolve(true);
      return deferred.promise;
    }
  };

  UsersApi.$inject = ['$http', 'devConfig', '$q'];

  angular.module('feeductFrontEnd').service('UsersApi', UsersApi);
})();