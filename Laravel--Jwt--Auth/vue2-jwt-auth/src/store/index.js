import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import auth from "./authentication";
import user from "./user";

const store = new Vuex.Store({
    strict: true,
    modules: {
        auth,
        user
    }
});

export default store;
