import Vue from 'vue'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css";
import 'codemirror/lib/codemirror.css'
import VueCodemirror from 'vue-codemirror'
import CKEditor from '@ckeditor/ckeditor5-vue'
import VuetifyUploadButton from 'vuetify-upload-button'
import App from './App.vue'
import router from './router'

Vue.use(Vuetify);
Vue.use(VueCodemirror);
Vue.use(VuetifyUploadButton);
Vue.use(CKEditor);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.config.errorHandler = function (err, vm, info) {
  console.error(err);
};

Vue.config.warnHandler = function (err, vm, info) {
  console.warn(err);
};