import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.config.errorHandler = function (err, vm, info) {
  console.log(err);
};

Vue.config.warnHandler = function (err, vm, info) {
  console.log(err);
};

const openError = function openError(msg) {
  main.errormsg = msg;
  main.dialog = true;
};