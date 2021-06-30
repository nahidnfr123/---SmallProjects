<template>
    <div class="container">
        <div class="m-auto col-12 col-md-8">
            <h3 class="text-center">Login</h3>
            <form action="">
                <div class="form-group">
                    <div class="mb-2">
                        <label for="email" class="col-form-label">Email</label>
                        <input type="email" class="form-control" id="email" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="mb-2">
                        <label for="inputPassword" class="col-form-label">Password</label>
                        <input type="password" class="form-control" id="inputPassword" />
                    </div>
                </div>
                <button name="register" class="btn btn-primary mt-3" @click.stop.prevent="login">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Login",
    data() {
        return {
            credentials: {
                email: "",
                password: ""
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
            userLogin: "auth/userLogin"
        }),
        async login() {
            this.errors = {};
            // this.validateRequest();
            if (this.errors && this.errors.length) {
                return;
            }
            if (this.getErrors && this.getErrors.length) {
                this.errors = this.getErrors;
                return;
            }
            await this.userLogin(this.credentials);
        },
        validateRequest() {
            if (!this.credentials.email.trim().length) this.errors.email = "The email field is required!";
            if (!this.credentials.password.trim().length) this.errors.password = "The password field is required!";
            else if (this.credentials.password.trim().length < 8) this.errors.password = "Password must be at least 8 characters!";
        }
    }
};
</script>
