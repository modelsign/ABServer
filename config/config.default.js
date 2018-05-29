'use strict';

module.exports = appInfo => {
  const config = exports = {};
  
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527146677816_7580';
  
  // add your config here
  config.middleware = [];
  
  config.security = {
    csrf: false
  };
  
  config.io = {
    init     : {}, // passed to engine.io
    namespace: {
      '/'       : {
        connectionMiddleware: [],
        packetMiddleware    : []
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware    : []
      }
    }
  };
  
  return config;
};
