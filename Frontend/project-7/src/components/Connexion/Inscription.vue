<template>
    <div class="outline" aria-label="Inscription">
        <form>
            <h1>Inscrivez-vous</h1>
            <label for="email">Entrez votre Email</label>
            <input id="email" type="email" placeholder="ex: email@email.com" v-model="email"/>
            <label for="prenom">Votre prénom</label>
            <input id="prenom" type="text" placeholder="ex: Jean" v-model="firstName"/>
            <label for="famille">Votre nom de famille</label>
            <input id="famille" type="text" placeholder="ex: Dupont" v-model="lastName"/>
            <label for="mdp">Choisissez un mot de passe</label>
            <input id="mdp" type="password" placeholder="****" v-model="password"/>
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
    props: {
        href: String
    },
    methods: {
        sendForm: async function() {
            if (this.isValid()) {
                const response = await APICall.methods.post("user/signup", {"email": this.email, "password": this.password, "lastname": this.lastName, "firstname": this.firstName});
                this.error = response.error;
                if (response.message === "Utilisateur créé"){
                    this.onInscriptionSuccess();
                }
            }
        },
        isValid: function() {
            return /[A-Za-z-\s]/.test(this.firstName) && /[A-Za-z-\s]/.test(this.lastName);
        },
        onInscriptionSuccess: function() {
            this.$router.push({ name: this.href });
        }
    }
}


</script>




<style scoped>
    .outline {
        outline: solid 1px lightskyblue;
        outline-offset: 1vh;
        display: flex;
        margin: auto;
    }
    button {
        background-color: rgb(88, 60, 9);
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin-top: 1vh;
    }

    input {
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-items: center;
        justify-self: center;
        padding: 7px;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 10px;
}

    form {
        display: flex;
        margin: auto;
        flex-direction: column;
        vertical-align: auto;
    }

/* On screens that are 992px or less */
@media screen and (max-width: 992px) {
  div {
    display: flex;
    flex-direction: column;
  }

  #nav {
    padding: 10px;
  }
}

/* On screens that are 600px or less */
@media screen and (max-width: 600px) {
  div {
    display: flex;
    flex-direction: column;
  }
}
</style>
