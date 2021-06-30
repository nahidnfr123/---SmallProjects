window.axios = require("axios");

export default {
    namespaced: true,
    state: {
        isLoggedIn: !!localStorage.getItem("token"),
        user: null,
        errors: null
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getErrors(state) {
            return state.errors;
        }
    },
    mutations: {
        loginUser(state) {
            state.isLoggedIn = true;
        },
        setUser(state, data) {
            state.user = data;
        },
        setErrors(state, errors) {
            state.errors = errors;
        },
        logoutUser(state) {
            state.isLoggedIn = false;
        }
    },
    actions: {
        async userLogin({ commit }, credentials) {
            await axios.post("/api/auth/login", credentials)
                .then(response => {
                    // login user, store the token and redirect to dashboard
                    commit("loginUser");
                    commit("setUser", response.data.user);
                    localStorage.setItem("token", response.data.access_token);
                })
                .catch(error => {
                    this.loginError = true;
                });
        },

        async userRegistration({ commit }, data) {
            await axios.post("/api/auth/register", data)
                .then((response) => {
                    commit("loginUser");
                    commit("setUser", response.data.user);
                    localStorage.setItem("token", response.data.access_token);
                    this.clearError();
                }).catch(error => {
                    if (error && error.response.status == 422) {
                        if (error.response && error.response.data) {
                            commit("setErrors", error.response.data.errors);
                        }
                    }
                });
        },
        logout({ commit }) {

        },
        clearError({ commit }) {
            commit("setErrors", null);
        }
    },
    modules: {}
};
