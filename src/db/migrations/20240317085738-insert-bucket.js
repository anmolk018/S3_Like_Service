'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('buckets', [{
      id:1,
      name: 'bucket1',
      createdBy: 1
    },{
       id:2,
       name: 'bucket2',
       createdBy: 1
     }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
