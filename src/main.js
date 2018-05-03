import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

const Fractions = () => System.import('./components/Fractions.vue');
const Comments = () => System.import('./components/Comments.vue');

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/fractions', component: Fractions, alias: '/' },
  { path: '/comments', component: Comments }
];
const router = new VueRouter({ routes });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
