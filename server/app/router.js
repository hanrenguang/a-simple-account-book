'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // bill
  router.get('/bill/queryBillingList', controller.bill.index);
  router.get('/bill/queryTotalAmount', controller.bill.queryTotalAmount);
  router.post('/bill/createBill', controller.bill.createBill);
  // category
  router.get('/category/queryCategoryList', controller.category.index);
  router.post('/category/createCategory', controller.category.createCategory);
};
