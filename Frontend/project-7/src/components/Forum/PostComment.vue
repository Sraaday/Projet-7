<template>
    <div class="outline">
        <form>
            <label for="commentaire">Entrez votre commentaire</label>
            <input id="commentaire" type="text" placeholder="" v-model="content"/>
            <button type="button" v-on:click="sendForm">Envoyer</button>
        </form>
    </div>
</template>
<script>
import APICall from '../APICall/APICall.vue'

export default {
    name: 'PostComment',
    props: {
        gifId: Number
    },
    data: () => {
        return {
            content: ""
        }
    },
    methods: {
        sendForm: async function() {
            if (this.content != "") {
                const response = await APICall.methods.post("comment", {"content": this.content, "gifId": this.gifId});
                if (!response.error){
                    this.content = "";
                }
                this.error = response.error;
            }
            
        }
    }
}
</script>