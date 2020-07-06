# 简易记账本——client

`Vue.js` + `Vuex` + `Element-UI`

```
client
├── babel.config.js        
├── jest.config.js
├── package.json
├── public
│   ├── favicon.ico        
│   └── index.html
├── README.md
├── src
│   ├── api
│   │   ├── extends                  // 存放具体 API 接口
│   │   │   ├── bill.js    
│   │   │   └── category.js
│   │   ├── gateway.js               // 请求统一拦截
│   │   └── index.js
│   ├── App.vue                      // 根组件
│   ├── assets
│   │   ├── logo.png
│   │   └── style
│   │       ├── common.scss          // 公共样式
│   │       └── variable.scss        // 变量表
│   ├── components
│   │   ├── add-bill.vue             // 创建账单及分类组件
│   │   ├── billing-list.vue         // 账单列表组件
│   │   └── billing-statistics.vue   // 账单统计组件
│   ├── helper
│   │   └── formatDate.js            // 日期格式化
│   ├── main.js                      // 主入口文件
│   └── store                        // Vuex 状态管理目录
│       └── index.js
├── tests                            // 测试文件目录
│   └── unit
│       └── billing-statistics.spec.js
├── vue.config.js
└── yarn.lock
```

## 安装及初始化

进入 `client` 目录下，安装依赖：
```bash
$ npm install
// 或者
$ yarn install
```

## 运行

1. 后端服务开启后，如果 `7001` 端口被占用，则会递增选择下一个端口，前端接口配置的端口是 `7001`，如果不一致，则修改 `client/src/api/gateway.js` 文件：
```JavaScript
// client/src/api/gateway.js
// 第 8 行，改为相应端口即可
baseURL: 'http://localhost:7001',
```
2. 开启前端服务：
```bash
$ npm start
```
会自动打开浏览器。


## 测试

在 `client` 目录下运行以下命令，由于时间原因，单元测试覆盖率不高：
```bash
$ npm run test:unit
```
