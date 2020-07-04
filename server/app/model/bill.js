'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, FLOAT } = app.Sequelize;

  const Bill = app.model.define('bills', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    category_name: STRING(30),
    amount: { type: FLOAT, allowNull: false },
    type: { type: INTEGER, allowNull: false },
    created_at: { type: DATE, allowNull: false },
    updated_at: DATE,
  });

  return Bill;
};
