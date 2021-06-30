<template>
    <div class="container">
        <div class="text-center">
            <h3>Profile</h3>

            <div class="text-start col-6">
                <div>Profile Information:</div>
                <div v-if="user">
                    <div>Name: {{ user.name }}</div>
                    <div>Email: {{ user.email }}</div>
                    <div>Joined: {{ user.created_at }}</div>
                </div>

                <button class="btn btn-primary" @click.stop.prevent="logout()">Logout</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            data: null
        };
    },
    computed: {
        ...mapGetters({
            user: "auth/getUser"
        })
    },
    mounted() {
        if (localStorage.token) {
            axios.get("/api/post", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                this.data = response.data.data;
            }).catch(error => {

            });
        }
    },
    methods:{
        logout(){

        }
    }
};
</script>
