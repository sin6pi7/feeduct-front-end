var feedsFactory = function ($http, devConfig) {
  return {
    getAll: function () {
      return $http.get(devConfig.endpoint + '/feeds/').then(
        function (response) {
          return response.data.data;
        },
        function (error) {
          return error;
        }
      )
    },
    getById: function (id) {
      return $http.get(devConfig.endpoint + '/feeds/' + id).then(
        function (response) {
          return response.data.data;
        },
        function (error) {
          return error;
        }
      )
    },
    addFeed: function(feed) {
      return $http.post(devConfig.endpoint + '/feeds/', feed).then();
    }
  }
};

feedsFactory.$inject = ['$http', 'devConfig'];

angular.module('feeductFrontEnd.feeds').factory('FeedsFactory', feedsFactory);