<template>
    <div>
      <img alt="Logo Groupomania" id="groupomania" src="../assets/Groupomania.png" />
      <h1>Bienvenue sur Groupomania !</h1>
      <h2>Connectez-vous pour accéder au site</h2>
      <Connexion href="MainPage"/>
      <h2>Nouveau ? Inscrivez-vous en cliquant <router-link to="/register">ici</router-link></h2>
    </div>
</template>

<script>
import Connexion from '../components/Connexion/Connexion.vue';


export default {
  components: {
      Connexion
  }
}
</script>
<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
