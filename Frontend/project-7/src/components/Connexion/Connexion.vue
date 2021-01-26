<template>
    <div class="outline">
        <form>
            <h1>Connexion</h1>
            <label for="email">Entrez votre Email</label>
            <input id="email" type="email" placeholder="" v-model="email"/>
            <label for="pass">Entrez votre mot de passe</label>
            <input id="pass" type="password" placeholder="" v-model="password"/>
            <button type="button" v-on:click="sendForm">Connexion</button>
        </form>
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
            error: ""
        }
    },
    props: {
        href: String
    },
    methods: {
        sendForm: async function() {
            const response = await APICall.methods.post("user/login", {"email": this.email, "password": this.password});
            APICall.methods.setToken(response.token);
            this.error = response.error;

            if (response.token != null) {
                this.onConnectionSuccess();
            }
        },
        onConnectionSuccess: function() {
            this.$router.push({ name: this.href });
        }
    }
}
</script>
<style scoped>

</style>