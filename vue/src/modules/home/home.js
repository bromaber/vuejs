import Vue from 'vue'
import App from './home.vue'
import vueTap from 'v-tap';
Vue.use(vueTap);

new Vue({
    el: "#app",
    render: h => h(App)
});
