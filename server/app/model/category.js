'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Category = app.model.define('categories', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    category_id: STRING(20),
    name: { type: STRING(30), allowNull: false, unique: true },
    type: { type: INTEGER, allowNull: false },
    created_at: { type: DATE, allowNull: false },
    updated_at: DATE,
  });

  return Category;
};
