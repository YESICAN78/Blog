import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//进度条
import "nprogress/nprogress.css"
import nprogress from 'nprogress';
router.beforeEach((to, from, next) => {
  nprogress.start()
  next();
})
 router.afterEach((to,from)=>{
   nprogress.done()
 })
 Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
