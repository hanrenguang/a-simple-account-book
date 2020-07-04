'use strict';
/* eslint no-unused-vars: "off" */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING, FLOAT } = Sequelize;
    await queryInterface.createTable('categories', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      category_id: STRING(20),
      name: { type: STRING(30), allowNull: false, unique: true },
      type: { type: INTEGER, allowNull: false },
      created_at: { type: DATE, allowNull: false },
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('categories');
  },
};
