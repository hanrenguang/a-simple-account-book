import Vue from 'vue';
// 引入 Element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入 api 工厂函数
import apiFactory from './api/index';
// 引入根组件
import App from './App.vue';
import 'style/common.scss';

Vue.use(ElementUI);
// 挂载 api 方法到 Vue.prototype.$api，方便调用
apiFactory(Vue);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
