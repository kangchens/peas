import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index.ts'
import Echerts from 'echarts';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.less'
Vue.prototype.$echarts = Echerts;
Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')