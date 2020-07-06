# 简易记账本——server

`Egg.js` + `Sequelize`

```
server
├── app                   
│   ├── controller        
│   │   ├── bill.js           // 账单接口逻辑
│   │   └── category.js       // 分类接口逻辑
│   ├── model
│   │   ├── bill.js           // 账单表模型
│   │   └── category.js       // 分类表模型
│   ├── public
│   └── router.js             // 后端 API 路由
├── appveyor.yml
├── config
│   ├── config.default.js     // 默认开发配置项
│   ├── config.unittest.js    // 单元测试配置项
│   └── plugin.js             // 插件配置项
├── csv-files                 // csv 文件及处理函数目录
│   ├── bill.csv
│   ├── categories.csv
│   └── helper.js
├── database
│   ├── config.json
│   └── migrations            // 迁移脚本目录
│       ├── 20200704033922-init-bills.js
│       ├── 20200704035823-init-categories.js
│       └── 20200704042129-migrate-csvdata.js
├── env.config.js             // 公共配置项
├── jsconfig.json
├── package.json
├── README.md
├── test                      // 测试文件目录
│   └── app
│       └── controller
│           ├── bill.test.js
│           └── category.test.js
└── yarn.lock
```

## 安装及初始化

1. 安装依赖：
```bash
$ npm install
// 或者
$ yarn install
```
2. 修改根目录下的 `env.config.js` 中的 `mysql` 配置项，`cors` 项如果前端 `8080` 端口被占用，则改为相应端口即可：
```JavaScript
mysql: {
  host: '127.0.0.1', // 主机
  port: 3306, // 端口
  username: 'root', // 用户名
  password: '', // 密码
},
```
3. 在 `server` 目录下进入命令行，运行以下命令创建数据库及数据表，并插入所提供的 `csv` 数据，开始前确保 `mysql` 服务已开启：
```bash
// 该命令会自动创建开发及测试环境的数据库，如果创建失败则需手动创建
// 开发环境数据库：account-book
// 测试环境数据库：account-book-test
$ npm run db:create

// 进行数据表及 csv 数据插入工作，这一步会运行 database/migrations 目录下的脚本
// 开发环境创表并插入 csv 数据
$ npm run db:migrate
// 测试环境创表并插入 csv 数据
$ npm run test:db:migrate
```
`migrate` 命令还提供了撤销操作，但是一般不会使用，使用后有回退的效果，在这里即删表删库删数据：
```bash
// 回退最近运行的一个 migrate 脚本
$ npm run db:migrate:undo
// 回退所有 migrate 脚本
$ npm run db:migrate:undo:all

// 测试数据库的回退
$ npm run test:db:migrate:undo
$ npm run test:db:migrate:undo:all
```
4. 上面都没问题的话，现在在 `mysql` 数据库已经创建好了开发和测试环境的数据库并填充了 `csv` 数据。到这里环境就准备完毕。


## 运行

进入 `server` 目录，在命令行输入：
```bash
$ npm run dev
```
这时候后端服务就开启了。


## 测试

确保前面已经执行了测试数据库的初始化操作，测试数据就使用的从 `csv` 导入的数据，在 `server` 目录下运行以下命令即可：
```bash
$ npm run test
```
