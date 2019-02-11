'use strict';
let hashPassword = (username, password) => {
  const crypto = require('crypto')
    , salt = username;

  let hash = crypto.createHmac('sha512', salt);

  hash.update(password);
  return hash.digest('hex');
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_user', [
      {
        username: 'sa1',
        password: hashPassword('sa1', '753159987'),
      },
      {
        username: 'admin',
        password: hashPassword('admin', '741236985'),
      }
    ], {
      force: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tbl_user', null, {});
  }
};