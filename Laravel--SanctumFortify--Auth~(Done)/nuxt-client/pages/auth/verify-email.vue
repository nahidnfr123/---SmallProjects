<template>
    <div class="m-10">
        <div v-if="errors && errors.length" class="text-red-400 mb-10">
            {{ errors }}
        </div>
        <div class="my-4">
            <p>Your email is not verified! <span class="text-blue-500">Please verify your email address.</span></p>
        </div>
        <button @click="sendEmailVerificationLink" class="bg-blue-800 text-blue-50 rounded-md py-2 px-4">
            <span v-if="sendingEmail">Sending ...</span>
            <span v-else-if="emailSent">Email sent</span>
            <span v-else>Send Email Verification Link</span>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sendingEmail: false,
            emailSent: false,
            errors: []
        }
    },
    methods: {
        sendEmailVerificationLink() {
            this.sendingEmail = true;
            this.$axios.$post('/email/verification-notification').then((response) => {
                this.emailSent = true;
            }).catch((error) => {
                this.errors = error;
            }).finally(() => {
                this.sendingEmail = false;
            })
        }
    }
}
</script>
