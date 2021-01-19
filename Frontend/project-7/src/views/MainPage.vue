<template>
    <div>
        <router-link to="/main">MainPage</router-link>
        <h1>Bienvenue sur le réseau social de Groupomania !</h1>
        <h2> Echangez avec vos collègues dès maintenant ! </h2>
        <h3> <router-link to="/ForumTexte">Accès au forum textuel !</router-link> </h3>
        <h3> <router-link to="/ForumGif">Accès au forum Multimédia !</router-link> </h3>


        <Deconnexion/>





    </div>
</template>


<script>
import Deconnexion from '../components/Connexion/Deconnexion.vue';


export default {
  name: 'Main',
  components : {
    Deconnexion
  }
}
</script>