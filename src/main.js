import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCodemirror from 'vue-codemirror'
import CKEditor from '@ckeditor/ckeditor5-vue'
import VuetifyUploadButton from 'vuetify-upload-button'
import App from './App.vue'
import router from './router'

Vue.use(Vuetify);
Vue.use(VueCodemirror);
Vue.use(CKEditor);
Vue.use(VuetifyUploadButton);

Vue.config.productionTip = false

const EventBus = new Vue();

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