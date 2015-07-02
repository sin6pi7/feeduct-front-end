var config = {
  "endpoint": "http://localhost:9000",

  ENDPOINT: this.endpoint,
  AUTH_TOKEN_NAME: 'authToken'
};

angular.module('feeductFrontEnd.feeds').constant('devConfig', config);