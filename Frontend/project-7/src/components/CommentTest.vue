<template>
    <div class="outline">
        <form>
            <h1>Espace Commentaire</h1>
            <p>Entrez votre commentaire</p>
            <input type="text" placeholder="" v-model="content"/>
            <button type="button" v-on:click="sendForm">Connexion</button>
        </form>
        <p>{{response}}</p>
    </div>
</template>
<script>
import APICall from './APICall/APICall.vue'

export default {
    name: 'CommentTest',
    data: () => {
        return {
            content: "",
            response: ""
        }
    },
    methods: {
        sendForm: async function() {
            this.response = await APICall.methods.post("comment", {"content": this.content});
            this.error = this.response.error;
        }
    }
}
</script>