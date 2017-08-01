/**
 * @file 入口文件 在index.tpl中设置的入口文件
 * @author zhouwunan
 */

'use strict';

import * as Vue from 'vue/dist/vue.js';
import * as VueRouter from 'vue-router';
import App from './views/app/app.vue';
import routers from './routers'   // 初始化路由
import * as iView from 'iview';
import 'iview/dist/styles/iview.css';     // 使用iview的css

Vue.use(VueRouter);
Vue.use(iView);

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routers
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();

});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});