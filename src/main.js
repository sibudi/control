/* JS库 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import babelpolyfill from 'babel-polyfill'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/id'
import NProgress from 'nprogress'
import VueVideoPlayer from 'vue-video-player'

/* CSS */
import 'alertifyjs/build/css/alertify.min.css';
import 'element-ui/lib/theme-default/index.css'
import 'nprogress/nprogress.css'
import 'font-awesome/css/font-awesome.min.css'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')




/* 组件 */
import App from './App'

/* JS方法 */
import store from './vuex/store'
import routes from './common/router'
import Config from './common/config'
import DataUtil from './common/dataUtil'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI, { locale });
Vue.use(VueVideoPlayer)

//进度条
NProgress.configure({ showSpinner: false });

//路由配置
const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  let currentUrl = window.location.hash.split('#')[1].split('?')[0];
  let isHavePermission = DataUtil.getPermissionSet().has(currentUrl.split("Inn")[0]);
  let isHavePermissionInn = DataUtil.getPermissionSet().has(currentUrl);
  if (!isHavePermission && !isHavePermissionInn && to.path !== '/unauthorizedInn') {
    //Need to ignore the path to avoid infinite loop
    next('/unauthorizedInn');
    NProgress.done();
  }
  else {
    next();
  }
  
  // var perMiss = DataUtil.getPermissionSet();  /*从localStorage中获取权限列表*/
  // if(perMiss.has(to.path)){       /*判断用户是否有该页面权限*/
  //   next()
  // }else{
  //   next({path:'/unauthorizedInn'})        /*无权限跳转到 /home*/
  // }
});

router.afterEach(transition => {
  NProgress.done();
});

//ajax公共配置
Vue.http.options = { root: Config.host };
Vue.http.interceptors.push(function(request, next) {
  request.url += '?sessionId='+DataUtil.sid()+'&ip='+localStorage.getItem("ip");
  next((response) => {
    if (!response.ok) {
      console.log(response);
      //this.$message.error(Config.ajaxError);
      //this.$router.push('/login');
    } 
    else if (response.body.code === 9999) {
      DataUtil.sid('');
      this.$router.push('/login');
    }
    return response;
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

