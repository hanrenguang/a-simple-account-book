import Vue from 'vue';
// 引入 Element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入根组件
import App from './App.vue';
import 'style/common.scss';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
