'use strict';

require('dotenv').config();

module.exports = {
  users: {
    initialUser: {
      username: 'coachDriver',
      firstName: 'Coach',
      lastName: 'Driver',
      password: 'coachDriver',
      email: '',
      avatar: ''
    },
    defaultAvatar: ''
  },
  jwt: {
    accessToken: {
      ttl: 3600 // seconds
    },
    refreshToken: {
      ttl: 604800 // seconds
    }
  },
  dbConfig: {
    dialectOptions: {
      ssl: false,
      decimalNumbers: true
    },
    logging: console.log
  }
};

