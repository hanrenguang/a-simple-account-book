'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 获取分类数据
  async index() {
    const { ctx } = this;
    const { Category } = ctx.model;

    const result = await Category.findAll();
    const categoryList = result;

    ctx.body = { code: 0, categoryList };
    ctx.status = 200;
  }

  // 新增分类
  async createCategory() {
    const { ctx } = this;
    const { Category } = ctx.model;

    const paramsScheme = {
      categoryName: { type: 'string' },
      type: { type: 'number' },
    };
    // 校验参数
    try {
      ctx.validate(paramsScheme, ctx.request.body);
    } catch (err) {
      ctx.body = { code: 1, message: 'Invalid param' };
      ctx.status = 422;
      return;
    }

    const { categoryName, type } = ctx.request.body;
    // 校验分类是否存在
    const result = await Category.findOne({
      where: { name: categoryName },
    });
    if (result) {
      ctx.body = { code: 1, message: '分类已存在！' };
      ctx.status = 422;
      return;
    }
    // 创建分类
    await Category.create({
      name: categoryName,
      type,
      created_at: new Date(),
      updated_at: new Date(),
    });

    ctx.body = {
      code: 0,
      message: '分类新建成功！',
    };
    ctx.status = 200;
  }
}

module.exports = HomeController;
