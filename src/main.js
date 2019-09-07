import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../public/public.css'
import 'element-ui/lib/theme-chalk/display.css'
import animated from 'animate.css' 

 Vue.use(animated)


Vue.prototype.$axios=axios
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
