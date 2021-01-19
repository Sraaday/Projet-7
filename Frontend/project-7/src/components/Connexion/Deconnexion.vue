<template>
    <div class="outline">
        <button type="button" v-on:click="sendForm">Déconnexion</button>
    </div>
</template>
<script>
import APICall from '../APICall/APICall.vue'

export default {
    name: 'Deconnexion',
    methods: {
        sendForm: function() {
            APICall.methods.removeToken();
            this.$router.push({ name: 'Acceuil' });
        },
    }
}
</script>

<style scoped>

</style>