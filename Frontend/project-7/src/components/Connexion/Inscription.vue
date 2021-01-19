<template>
    <div class="outline">
        <form>
            <h1>Inscrivez-vous</h1>
            <p>Entrez votre Email</p>
            <input type="email" placeholder="ex: email@email.com" v-model="email"/>
            <p>Votre prénom</p>
            <input type="text" placeholder="ex: Jean" v-model="firstName"/>
            <p>Votre nom de famille</p>
            <input type="text" placeholder="ex: Dupont" v-model="lastName"/>
            <p>Choisissez un mot de passe</p>
            <input type="password" placeholder="****" v-model="password"/>
            <div>
                <button type="button" v-on:click="sendForm">S'inscrire</button> 
            </div>
        </form>
    </div>
</template>


<script>
import APICall from '../APICall/APICall.vue'

export default {
    name: 'Inscription',
    data: () => {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            error: ""
        }
    },
    methods: {
        sendForm: async function() {
            if (this.isValid()) {
                const response = await APICall.methods.post("user/signup", {"email": this.email, "password": this.password, "lastname": this.lastName, "firstname": this.firstName});
                this.error = response.error;
            }
        },
        isValid: function() {
            return /[A-Za-z-\s]/.test(this.firstName) && /[A-Za-z-\s]/.test(this.lastName);
        }
    }
}


</script>




<style scoped>
    .outline {
        outline: solid 1px lightskyblue;
        position: relative;
        outline-offset: 1vh;
        left: 20vh;
        margin-right: 40vh;
    }
    button {
        background-color: lightgreen;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin-top: 1vh;
    }
</style>