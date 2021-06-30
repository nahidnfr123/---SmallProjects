import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Auth/Login.vue")
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Auth/Register.vue")
    },
    {
        path: "/profile",
        name: "Profile",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Profile.vue"),
        meta: { requiresAuth: true }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;

router.beforeEach((to, from, next) => {

    // check if the route requires authentication and user is not logged in
    if (to.matched.some(route => route.meta.requiresAuth) && !store.state.auth.isLoggedIn) {
        // redirect to login page
        next({ name: 'Login' })
        return
    }

    // if logged in redirect to dashboard
    if(to.path === '/login' && store.state.auth.isLoggedIn) {
        next({ name: 'Profile' })
        return
    }

    next()
})
