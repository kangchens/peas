import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index.ts'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.less'
Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')