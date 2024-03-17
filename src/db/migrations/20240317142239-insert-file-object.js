'use strict';
const path = require('path')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('fileobjects', [{
       name: '[1710686374805]-Get_Started_With_Smallpdf (2).pdf',
       path:path.join(__dirname, "..", "..", "..","storage","bucket1","[1710686374805]-Get_Started_With_Smallpdf (2).pdf"),
       mimetype:"application/pdf",
       status:"success",
       bucket_id:1,
       is_deleted:false,
       createdBy: 1
     },
     {
      name: '[1710686741404]-lorem ipsum.txt',
      path:path.join(__dirname, "..", "..", "..","storage","bucket2","[1710686741404]-lorem ipsum.txt"),
      mimetype:"text/plain",
      status:"success",
      bucket_id:2,
      is_deleted:false,
      createdBy: 1
    }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
