import Vue from 'vue'
import App from './customer.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './routers'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes
});

router.afterEach(route => {
  window.document.title = route.name || '';
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
});