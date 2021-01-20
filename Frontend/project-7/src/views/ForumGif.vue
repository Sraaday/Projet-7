<template>
    <div>
        <router-link to="/main">MainPage</router-link>
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