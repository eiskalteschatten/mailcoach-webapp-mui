'use strict';

require('dotenv').config();

module.exports = {
  users: {
    initialUser: {
      username: 'coachDriver',
      firstName: 'Coach',
      lastName: 'Driver',
      password: '1coachDriver!',
      email: '',
      avatar: ''
    },
    defaultAvatar: '',
    defaultSettings: {
      language: 'en',
      theme: 'light'
    }
  },
  jwt: {
    accessToken: {
      ttl: 3600 // seconds; 1 hour
    },
    refreshToken: {
      ttl: 604800 // seconds; 1 week
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

