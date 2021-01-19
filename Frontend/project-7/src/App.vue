<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/Groupomania.png">
    <Inscription/>
    <Connexion/><CommentTest/><UploadGif/>
  </div>
</template>

<script>
import Inscription from './components/Connexion/Inscription.vue';
import Connexion from './components/Connexion/Connexion.vue';
import CommentTest from './components/CommentTest.vue';
import UploadGif from './components/Forum/UploadGif.vue';

export default {
  name: 'App',
  components: {
    Inscription,
    Connexion,
    CommentTest,
    UploadGif,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  width: 40%;
  outline: solid 2px lightskyblue;
  outline-offset: 2.5vh;
}
</style>
