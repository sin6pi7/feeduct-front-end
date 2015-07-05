var feedsFactory = function ($http, devConfig) {
    return {
        getAll: function () {
            return $http.get(devConfig.endpoint + '/feeds').then(
                function (response) {
                    return response.data.data;
                },
                function (error) {
                    throw error;
                }
            )
        },
        getById: function (id) {
            return $http.get(devConfig.endpoint + '/feeds/' + id).then(
                function (response) {
                    return response.data.data;
                },
                function (error) {
                    throw error;
                }
            )
        },
        addFeed: function (feed) {
            return $http.post(devConfig.endpoint + '/feeds', feed);
        },

        removeFeed: function(feedId) {
            return $http.delete(devConfig.endpoint + '/feeds/' + feedId, {});
        }
    }
};

feedsFactory.$inject = ['$http', 'devConfig'];

angular.module('feeductFrontEnd.feeds').factory('FeedsFactory', feedsFactory);