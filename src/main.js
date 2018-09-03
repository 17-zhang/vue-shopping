// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './ui/element-ui'
import './ui/my-own-ui'

import './assets/css/base.css'
import './assets/css/vue2-animate.css'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false // 阻止vue在启动时生成提示

// 页面跳转后，返回顶部
router.afterEach(() => {
  window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
