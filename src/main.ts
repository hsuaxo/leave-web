import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuelidate from "vuelidate";
import VueMoment from "vue-moment";
import { BootstrapVue } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 60000,
});

Vue.use(VueAxios, axiosInstance);
Vue.use(Vuelidate);
Vue.use(VueMoment);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
