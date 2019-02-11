'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_project', [
      {
        description: 'Project description',
        image: 'https://cdn.stocksnap.io/img-thumbs/960w/QUXNHAIOCK.jpg',
        name: 'Project 1',
        position: 'Back End Developer',
      },
      {
        description: 'Project description',
        image: 'https://cdn.stocksnap.io/img-thumbs/960w/DWQKYDVEKD.jpg',
        name: 'Project 2',
        position: 'Back End Developer',
      },
      {
        description: 'Project description',
        image: 'https://cdn.stocksnap.io/img-thumbs/960w/QEUHCFGQNP.jpg',
        name: 'Project 3',
        position: 'Full Stack Developer',
      },
      {
        description: 'Project description',
        image: 'https://cdn.stocksnap.io/img-thumbs/960w/LEJ7HJ5BEA.jpg',
        name: 'Project 4',
        position: 'Full Stack Developer',
      },

    ], {
      force: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tbl_project', null, {});
  }
};