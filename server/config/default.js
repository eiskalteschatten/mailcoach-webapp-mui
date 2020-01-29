'use strict';

require('dotenv').config();

module.exports = {
  jwt: {
    accessToken: {
      ttl: 3600 // seconds
    },
    refreshToken: {
      ttl: 604800 // seconds
    }
  }
};

