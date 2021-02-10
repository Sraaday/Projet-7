<template>
    <div class="container-fluid">
        <ul class="nav navbar-nav navbar-right">
      <li><a class="logout" v-on:click="sendForm"><span class="glyphicon glyphicon-log-out"></span> Déconnexion</a> </li>
    </ul>
        
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