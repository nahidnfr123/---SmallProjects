<template>
    <div class="container">
        <div class="m-auto col-12 col-md-8">
            <h3 class="text-center">Register</h3>
            <form @submit.stop.prevent="register">
                <div class="form-group">
                    <div class="mb-2">
                        <label for="name" class="col-form-label">Name</label>
                        <input type="text" class="form-control" id="name" v-model="credentials.name" />
                        <div v-if="errors && errors.name" class="text-sm text-danger" style="font-size: 12px">
                            {{ errors.name.length ? errors.name[0] : errors.name }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="mb-2">
                        <label for="email" class="col-form-label">Email</label>
                        <input type="email" class="form-control" id="email" v-model="credentials.email" />
                        <div v-if="errors && errors.email" class="text-sm text-danger" style="font-size: 12px">
                            {{ errors.email.length ? errors.email[0] : errors.email }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="mb-2">
                        <label for="inputPassword" class="col-form-label">Password</label>
                        <input type="password" class="form-control" id="inputPassword" v-model="credentials.password" />
                        <div v-if="errors && errors.password" class="text-sm text-danger" style="font-size: 12px">
                            {{ errors.password.length ? errors.password[0] : errors.password }}
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="mb-2">
                        <label for="passwordConfirmation" class="col-form-label">Password Confirmation</label>
                        <input type="password" class="form-control" id="passwordConfirmation"
                               v-model="credentials.password_confirmation" />
                    </div>
                </div>

                <button name="register" class="btn btn-primary mt-3" @click.stop.prevent="register">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Register",
    data() {
        return {
            credentials: {
                name: "nahid ferdous",
                email: "nahid@gmail.com",
                password: "nahid@gmail.com",
                password_confirmation: "nahid@gmail.com"
            },
            errors: {}
        };
    },
    computed: {
        ...mapGetters({
            getErrors: "auth/getErrors"
        })
    },
    methods: {
        ...mapActions({
            userRegistration: "auth/userRegistration",
            clearError: "auth/clearError"
        }),
        async register() {
            this.errors = {};
            this.clearError();
            // this.validateRequest();
            if (this.errors && this.errors.length) {
                return;
            }
            await this.userRegistration(this.credentials);
            if (this.getErrors) {
                this.errors = this.getErrors;
                return;
            }
        },
        validateRequest() {
            if (!this.credentials.name.trim().length) this.errors.name = "The name field is required!";
            if (!this.credentials.email.trim().length) this.errors.email = "The email field is required!";
            if (!this.credentials.password.trim().length) this.errors.password = "The password field is required!";
            else if (this.credentials.password.trim().length < 8) this.errors.password = "Password must be at least 8 characters!";
            else if (this.credentials.password !== this.credentials.password_confirmation) {
                this.errors.password = "Password and password confirmation did not match.";
            }
        }
    }
};
</script>

<style scoped>

</style>
