'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('users', [{
       name: 'Test User',
       email:"testuser@yopmail.com",
       password: '1234',
       is_active:true
     }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
