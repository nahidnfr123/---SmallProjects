<template>
    <div class="flex justify-center align-middle">
        <form class="w-full max-w-sm mt-20" @submit.stop.prevent="login">
            <h1 class="text-center text-2xl mb-6">Login</h1>

            <div class="flex flex-col mt-3" v-if="errors && errors.length">
                <span class="text-red-500 italic">{{ errors }}</span>
            </div>

            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="username">
                        Email / Username
                    </label>
                </div>
                <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                           id="username" type="text" value="Jane Doe"
                           v-model="form.username">
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                        Password
                    </label>
                </div>
                <div class="md:w-2/3">
                    <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                           id="inline-password" type="password" placeholder="******************"
                           v-model="form.password">
                </div>
            </div>
            <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                    <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="submit">
                        Login
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    middleware: 'guest',
    head: {
        title: '',
        meta: [
            {hid: 'description', name: 'description', content: 'Login page'}
        ],
    },
    data: () => ({
        form: {
            username: '',
            password: ''
        },
        errors: []
    }),
    methods: {
        async login() {
            try {
                await this.$auth.loginWith('laravelSanctum', {data: this.form})
            } catch (err) {
                if (err.response.status == 422) {
                    this.errors = 'Could not sign you in with those credentials.'
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
