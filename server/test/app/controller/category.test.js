'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/category.test.js', () => {
  describe('GET /category/queryCategoryList', () => {
    it('should work', async () => {
      const url = '/category/queryCategoryList';
      // 只传入分页数据
      const res1 = await app.httpRequest().get(url);
      assert(res1.status === 200);
      assert(res1.body.categoryList.length === 11);
    });
  });

  describe('POST /category/createCategory', () => {
    it('should work', async () => {
      const url = '/category/createCategory';
      // 正确传参
      const res1 = await app.httpRequest().post(url).send({
        categoryName: '新分类',
        type: 1,
      });
      assert(res1.status === 200);
      assert(res1.body.message === '分类新建成功！');

      // 不传参
      const res2 = await app.httpRequest().post(url);
      assert(res2.status === 422);
      assert(res2.body.message === 'Invalid param');

      // 传入已存在的分类
      const res3 = await app.httpRequest().post(url).send({
        categoryName: '工资',
        type: 1,
      });
      assert(res3.status === 422);
      assert(res3.body.message === '分类已存在！');
    });
  });
});
