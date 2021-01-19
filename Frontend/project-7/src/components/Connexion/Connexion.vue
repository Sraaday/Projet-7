<template>
    <div class="outline">
        <form>
            <h1>Connectez-vous</h1>
            <p>Entrez votre Email</p>
            <input type="email" placeholder="" v-model="email"/>
            <p>Entrez votre mot de passe</p>
            <input type="password" placeholder="" v-model="password"/>
            <button type="button" v-on:click="sendForm">Connexion</button>
        </form>
        <p>{{response}}</p>
    </div>
</template>
<script>
import APICall from '../APICall/APICall.vue'

export default {
    name: 'Connexion',
    data: () => {
        return {
            email: "",
            password: "",
            response: "",
            error: ""
        }
    },
    methods: {
        sendForm: async function() {
            this.response = await APICall.methods.post("user/login", {"email": this.email, "password": this.password});
            APICall.methods.setToken(this.response.token);
            this.error = this.response.error;
        }
    }
}
</script>
<style scoped>

</style>