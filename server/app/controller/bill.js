'use strict';

const Controller = require('egg').Controller;
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

class HomeController extends Controller {
  // 获取账单
  async index() {
    const { ctx } = this;
    const { Bill } = ctx.model;
    const paramsScheme = {
      startTime: { type: 'number', required: false },
      endTime: { type: 'number', required: false },
      pageNum: { type: 'number' },
      pageSize: { type: 'number' },
    };
    // 校验参数
    try {
      ctx.validate(paramsScheme, ctx.request.query);
    } catch (err) {
      ctx.body = { code: 1, message: 'Invalid param' };
      ctx.status = 422;
      return;
    }

    const { pageNum, pageSize, startTime, endTime } = ctx.request.query;
    const where = {};
    if (startTime && endTime) {
      where.created_at = { [Op.between]: [ new Date(startTime), new Date(endTime) ] };
    }
    const result = await Bill.findAndCountAll({
      where,
      order: [[ 'created_at', 'DESC' ]],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    });
    const billingList = result.rows;
    const count = result.count;

    ctx.body = { code: 0, billingList, count };
    ctx.status = 200;
  }

  // 获取账单收支总数
  async queryTotalAmount() {
    const { ctx } = this;
    const { Bill } = ctx.model;
    const paramsScheme = {
      startTime: { type: 'number', required: false },
      endTime: { type: 'number', required: false },
    };
    // 校验参数
    try {
      ctx.validate(paramsScheme, ctx.request.query);
    } catch (err) {
      ctx.body = { code: 1, message: 'Invalid param' };
      ctx.status = 422;
      return;
    }

    const { startTime, endTime } = ctx.request.query;
    const where = {};
    if (startTime && endTime) {
      where.created_at = { [Op.between]: [ new Date(startTime), new Date(endTime) ] };
    }
    const billingList = await Bill.findAll({ where });
    let incomeTotal = 0;
    let expenseTotal = 0;

    billingList.forEach(({ type, amount }) => {
      if (type === 0) { // 支出
        expenseTotal -= amount * 100;
      } else {
        incomeTotal += amount * 100;
      }
    });

    incomeTotal /= 100;
    expenseTotal /= 100;

    ctx.body = { code: 0, expenseTotal, incomeTotal };
    ctx.status = 200;
  }

  // 新增账单
  async createBill() {
    const { ctx } = this;
    const { Bill, Category } = ctx.model;

    const paramsScheme = {
      categoryName: { type: 'string', required: false },
      type: { type: 'number' },
      amount: { type: 'number' },
    };
    // 校验参数
    try {
      ctx.validate(paramsScheme, ctx.request.body);
    } catch (err) {
      ctx.body = { code: 1, message: 'Invalid param' };
      ctx.status = 422;
      return;
    }

    const { categoryName, type, amount } = ctx.request.body;
    // 校验分类是否存在
    const result = await Category.findOne({
      where: { name: categoryName },
    });
    if (!result) {
      ctx.body = { code: 1, message: '所选分类不存在！' };
      ctx.status = 422;
      return;
    }
    // 创建账单
    await Bill.create({
      category_name: categoryName,
      type,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
    });

    ctx.body = {
      code: 0,
      message: '账单新建成功！',
    };
    ctx.status = 200;
  }
}

module.exports = HomeController;
