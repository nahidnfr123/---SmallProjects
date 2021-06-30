<template>
    <div>
        Your Email is verified you can access this content ....
    </div>
</template>

<script>
export default {
    middleware: ['auth', 'email-verified'],

}
</script>
