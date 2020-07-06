'use strict';
/* eslint no-unused-vars: "off" */
const path = require('path');
const csvParser = require('../../csv-files/helper.js').csvParser;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 解析并插入 category 数据
    const categoryList = [];
    const categoryFile = path.resolve(__dirname, '../../csv-files/categories.csv');
    const categoryIdMap = {};

    await csvParser(categoryFile).then(res => {
      res.forEach(({ id, type, name }) => {
        categoryList.push({
          category_id: id,
          name,
          type: parseInt(type),
          created_at: new Date(),
          updated_at: new Date(),
        });
        categoryIdMap[id] = name;
      });
    });
    await queryInterface.bulkInsert('categories', categoryList);

    const billingList = [];
    const billFile = path.resolve(__dirname, '../../csv-files/bill.csv');

    await csvParser(billFile).then(res => {
      res.forEach(({ time, type, category, amount }) => {
        billingList.push({
          category_name: categoryIdMap[category] || '',
          amount: parseFloat(amount),
          type: parseInt(type),
          created_at: new Date(parseInt(time)),
          updated_at: new Date(),
        });
      });
    });
    await queryInterface.bulkInsert('bills', billingList);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bills', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  },
};
