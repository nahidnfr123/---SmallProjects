<template>
    <div>
        <h1>
            User List:
        </h1>
        <ul v-if="usersList.length">
            <li v-for="user in usersList" :key="user.id">user.name</li>
        </ul>
    </div>
</template>

<script>
export default {
    middleware: ['auth'],
    data(){
        return{
            usersList:[]
        }
    },
    mounted() {
      this.getUsers();
    },
    methods:{
        async getUsers(){
            this.$axios.$get('/users').then((res)=>{
                this.usersList = res.data;
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
