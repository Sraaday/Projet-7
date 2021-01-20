<template>
    <div class="outline">
        <form enctype="multipart/form-data">
            Titre: <input type="text" v-model="title"><br/>
            Uploadez une image : <input type="file" ref="fileToUpload"><br/>
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

</style>