"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("terrain_types", [
      { id: 1, name: "Asfalto" },
      { id: 2, name: "Tierra" },
      { id: 3, name: "Césped" },
      { id: 4, name: "Arena" },
      { id: 5, name: "Pista (Tartán)" },
      { id: 6, name: "Sendero" },
      { id: 7, name: "Montaña" },
      { id: 8, name: "Cemento" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("terrain_types", null, {});
  },
};
