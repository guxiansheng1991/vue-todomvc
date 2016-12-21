import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';

import mySection from './components/section.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

let router=new VueRouter({
  routes:
        [
          {
            path:'/all',component:mySection,
          },
          {
            path:'/active',component:mySection,
          },
          {
            path:'/completed',component:mySection,
          },
          {
            path:'/',redirect: '/all',
          },
        ]
});

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
