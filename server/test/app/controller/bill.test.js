'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/bill.test.js', () => {
  describe('GET /bill/queryBillingList', () => {
    it('should work', async () => {
      // 只传入分页数据
      const url1 = '/bill/queryBillingList?pageNum=1&pageSize=10';
      const res1 = await app.httpRequest().get(url1);
      assert(res1.status === 200);
      assert(res1.body.billingList.length === 10);
      assert(res1.body.count === 46);

      // 传入时间，且在时间范围内
      const startTime1 = new Date(2019, 0).getTime();
      const endTime1 = new Date(2019, 11).getTime();
      const url2 = `${url1}&startTime=${startTime1}&endTime=${endTime1}`;
      const res2 = await app.httpRequest().get(url2);
      assert(res2.status === 200);
      assert(res2.body.billingList.length === 10);
      assert(res1.body.count === 46);

      // 传入时间，且在时间范围外
      const startTime2 = new Date(2020, 0).getTime();
      const endTime2 = new Date(2020, 6).getTime();
      const url3 = `${url1}&startTime=${startTime2}&endTime=${endTime2}`;
      const res3 = await app.httpRequest().get(url3);
      assert(res3.status === 200);
      assert(res3.body.billingList.length === 0);
      assert(res3.body.count === 0);

      // 不传分页数据，报错
      const url4 = '/bill/queryBillingList';
      const res4 = await app.httpRequest().get(url4);
      assert(res4.status === 422);
      assert(res4.body.message === 'Invalid param');
    });
  });

  describe('GET /bill/queryTotalAmount', () => {
    it('should work', async () => {
      // 不传参，返回总的收入支出金额
      const url1 = '/bill/queryTotalAmount';
      const res1 = await app.httpRequest().get(url1);
      assert(res1.status === 200);
      assert(res1.body.incomeTotal === 134000);
      assert(res1.body.expenseTotal === -104800);

      // 传入时间，且在时间范围内
      const startTime = new Date(2019, 6).getTime();
      const endTime = new Date(2019, 6, 31).getTime();
      const url2 = `${url1}?startTime=${startTime}&endTime=${endTime}`;
      const res2 = await app.httpRequest().get(url2);
      assert(res2.status === 200);
      assert(res2.body.incomeTotal === 31000);
      assert(res2.body.expenseTotal === -12700);
    });
  });

  describe('POST /bill/createBill', () => {
    it('should work', async () => {
      const url = '/bill/createBill';
      // 正确传参
      const res1 = await app.httpRequest().post(url).send({
        categoryId: 9,
        type: 1,
        amount: 10000,
      });
      assert(res1.status === 200);
      assert(res1.body.message === '账单新建成功！');

      // 不传参
      const res2 = await app.httpRequest().post(url);
      assert(res2.status === 422);
      assert(res2.body.message === 'Invalid param');

      // 传入不存在的分类
      const res3 = await app.httpRequest().post(url).send({
        categoryId: 100,
        type: 1,
        amount: 10000,
      });
      assert(res3.status === 422);
      assert(res3.body.message === '所选分类不存在！');
    });
  });
});
