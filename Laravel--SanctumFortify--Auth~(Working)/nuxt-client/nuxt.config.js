export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'nuxt-client',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
    /*components: {
        dirs: [
            "~/components",
            /!*{
                path: "~/components/Cart",
                prefix: "Cart" /// Usage <CartComponentName/>
            },*!/
        ]
    },*/

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/auth-next'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: 'http://localhost:8000/',
        credentials: true
    },
    auth: {
        strategies: {
            'laravelSanctum': {
                provider: 'laravel/sanctum',
                url: 'http://localhost:8000',
                endpoints: {
                    login: {
                        url: '/login'
                    },
                    logout: {
                        url: '/logout'
                    },
                    user: {
                        url: '/api/user'
                    },
                },
                user: {
                    property: false
                }
            },
        },
        redirect: {
            login: "/auth/login",
            logout: "/",
            callback: "/auth/login",
            home: "/"
        }
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    router: {
        linkActiveClass: "",
        linkExactActiveClass: "active"
        // middleware: "guest",
    },
}
