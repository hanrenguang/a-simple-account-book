const { app } = require('egg-mock/bootstrap');

after(async () => {
  // 删除测试中创建的账单
  const res = await app.model.Bill.findAll({
    order: [['id', 'DESC']], limit: 1,
  });
  await app.model.Bill.destroy({ where: { id: res[0].id } });
});