'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("weathers", [
    {id: 1, name: "Soleado"},
    {id: 2, name: "Nublado"},
    {id: 3, name: "Lluvioso"},
    {id: 4, name: "Ventoso"},
    {id: 5, name: "Nevado"},
    {id: 6, name: "Húmedo"},
    {id: 7, name: "Seco"},
    {id: 8, name: "Tormenta"},
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("weathers", null, {});
  }
};
