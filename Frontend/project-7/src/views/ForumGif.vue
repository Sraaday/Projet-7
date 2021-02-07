<template>
    <div>
        <router-link to="/main">MainPage</router-link>
        <img alt="logo Groupomania" class="logo" src="../assets/icon.png" />
        <h1> Espace Multimédia </h1>
        
        <DisplayAllGifs />
        
    </div>
</template>


<script>
import DisplayAllGifs from '../components/Forum/DisplayAllGifs.vue';



export default {
  name: 'ForumGif',
  components: {
    DisplayAllGifs
  }
}
</script>

<style scoped>
.logo {
    width: 150px;
    display: flex;
    align-self: center;
    border: #ba4e38;
    border-style: solid ;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  
</style>