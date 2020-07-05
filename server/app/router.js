'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/bill/getBillingList', controller.bill.index);
  router.get('/bill/queryTotalAmount', controller.bill.queryTotalAmount);
  router.post('/bill/createBill', controller.bill.createBill);
};
