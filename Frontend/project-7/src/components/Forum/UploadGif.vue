<template>
  <file-upload :url='url' :thumb-url='thumbUrl' :headers="headers" @change="onFileChange"></file-upload>
</template>

<script>
import APICall from '../APICall/APICall.vue'
import Vue from 'vue'
import FileUpload from 'v-file-upload'
Vue.use(FileUpload)

export default {
  data () {
    return {
      url: APICall.methods.getUrl("gif"),
      headers: APICall.methods.getHeader(),
      filesUploaded: []
    }
  },
  methods: {
    thumbUrl (file) {
      return file.myThumbUrlProperty
    },
    onFileChange (file) {
      // Handle files like:
      this.fileUploaded = file
    }
  }
}
</script>