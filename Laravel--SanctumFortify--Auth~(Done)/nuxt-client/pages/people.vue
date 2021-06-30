<template>
    <div class="m-10">
        <h1 class="text-2xl font-bold">
            User List:
        </h1>
        <ul v-if="usersList && Object.keys(usersList).length">
            <li v-for="user in usersList" :key="user.id">
                <span class="font-bold">Name: </span>{{ user.name }},
                <span class="font-bold">Username: </span>{{ user.username }},
                <span class="font-bold">Email: </span> {{ user.email }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    middleware: ['auth'],
    data(){
        return{
            usersList:{}
        }
    },
    mounted() {
      this.getUsers();
    },
    methods:{
        async getUsers(){
            this.$axios.$get('/api/users').then((res)=>{
                this.usersList = res;
            }).catch((err)=>{
                if(err){
                    alert('Error');
                    console.log(err);
                }
            });
        },

    }
}
</script>
