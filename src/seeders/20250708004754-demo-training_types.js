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
    await queryInterface.bulkInsert("training_types", [
        { id: 1, name: "Easy Run" },
        { id: 2, name: "Hard Run" },
        { id: 3, name: "Intervalos" },
        { id: 4, name: "Tempo Run" },
        { id: 5, name: "Recuperación" },
        { id: 6, name: "Long Run" },
        { id: 7, name: "Técnica de Carrera" },
        { id: 8, name: "Subidas" },
        { id: 9, name: "Fartlek" },
        { id: 10, name: "Descanso Activo" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("training_types", null, {});
  },
};
