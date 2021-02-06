<template>
    <div class="outline">
        <form enctype="multipart/form-data">
            <label for="titre">Titre: </label>
            <input id="titre" type="text" v-model="title"><br/>
            <label for="fichier">Uploadez une image :</label>
            <input id="fichier" type="file" ref="fileToUpload"><br/>
            <button type="button" v-on:click="sendForm">Poster</button>
        </form>
    </div>
</template>

<script>
import APICall from '../APICall/APICall.vue';

export default {
    data () {
        return {
            title:''
        }
    },
    methods: {
        sendForm: async function () {
        const data = new FormData();
        data.append("title", this.title);
        if(this.$refs.fileToUpload.files.length) {
            data.append("file", this.$refs.fileToUpload.files[0]);
        }

        const result = await APICall.methods.postFile('gif', data);
        if (!result.error){
            this.title = "";
        }
        }
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

input {
    display: flex;
    flex-direction: row;
    align-self: center;
    padding-top: 5px ;
    padding-bottom: 5px ;

}

button {
    max-width: 33%;
    display: flex;
    align-self: center;
}
</style>