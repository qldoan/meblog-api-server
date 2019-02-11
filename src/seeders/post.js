'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tbl_post', [
      {
        content: 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces.',
        show: true,
        title: 'React - A JavaScript library for building user interfaces',
      },
      {
        content: 'Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces.',
        show: true,
        title: 'Vue - The Progressive JavaScript Framework',
      },
      {
        content: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
        show: true,
        title: 'Express - Fast, unopinionated, minimalist web framework for Node.js',
      },
    ], {
      force: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tbl_post', null, {});
  }
};