<template>
    <div class="flex justify-center align-middle">
        <form class="w-full max-w-sm mt-20" @submit.stop.prevent="register">
            <h1 class="text-center text-2xl mb-6">Register</h1>

            <!--            <div class="flex flex-col mt-3" v-if="errors">
                            <span class="text-red-500 italic">{{ errors }}</span>
                        </div>-->

            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        Full Name
                    </label>
                </div>
                <div class="md:w-2/3">
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name" type="text" value="Jane Doe"
                        v-model="form.name">
                    <span class="text-red-500 italic" v-if="errors.name">{{ errors.name[0] }}</span>
                </div>
            </div>

            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        Username:
                    </label>
                </div>
                <div class="md:w-2/3">
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="username" type="text" value="JaneDoe123"
                        v-model="form.username">
                    <span class="text-red-500 italic" v-if="errors.username">{{ errors.username[0] }}</span>
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        Email:
                    </label>
                </div>
                <div class="md:w-2/3">
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="email" type="email" value="Jane Doe"
                        v-model="form.email">
                    <span class="text-red-500 italic" v-if="errors.email">{{ errors.email[0] }}</span>
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                        Password
                    </label>
                </div>
                <div class="md:w-2/3">
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-password" type="password" placeholder="******************"
                        v-model="form.password">
                    <span class="text-red-500 italic" v-if="errors.password">{{ errors.password[0] }}</span>
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="confirm-password">
                        Confirm Password
                    </label>
                </div>
                <div class="md:w-2/3">
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="confirm-password" type="password" placeholder="******************"
                        v-model="form.password_confirmation">
                </div>
            </div>
            <div class="md:flex md:items-center">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                    <button
                        class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit">
                        Register
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
        title: ' | Register',
        meta: [
            {hid: 'description', name: 'description', content: 'Registration page'}
        ],
    },
    data() {
        return {
            form: {
                name: '',
                username: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            errors: []
        }
    },
    methods: {
        async register() {
            try {
                let errors = []
                await this.$axios.$get('sanctum/csrf-cookie')
                await this.$axios.$post('/register', this.form)
                    .then((resp) => {
                        this.$auth.loginWith('laravelSanctum', {data: this.form})
                    }).catch((err) => {
                        if (err.response.status == 422) {
                            errors = err.response.data.errors
                        }
                    })
                this.errors = errors
            } catch (error) {
            }
        }
    }
}
</script>

<style scoped>

</style>
