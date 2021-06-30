import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";

try {
    window.$ = window.jQuery = require("jquery");
    window.Popper = require("popper.js").default;
    require("bootstrap");
// eslint-disable-next-line no-empty
} catch (e) {
}
window.axios = require("axios");
const BaseUrl = "http://localhost:8000/";
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.baseURL = BaseUrl;
window.axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount("#app");
