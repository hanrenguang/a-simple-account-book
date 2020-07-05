const { app } = require('egg-mock/bootstrap');

after(async () => {
  // 删除测试中创建的账单
  const billRes = await app.model.Bill.findAll({
    order: [['id', 'DESC']], limit: 1,
  });
  await app.model.Bill.destroy({ where: { id: billRes[0].id } });

  // 删除测试中创建的分类
  const categoryRes = await app.model.Category.findAll({
    order: [['id', 'DESC']], limit: 1,
  });
  await app.model.Category.destroy({ where: { id: categoryRes[0].id } });
});