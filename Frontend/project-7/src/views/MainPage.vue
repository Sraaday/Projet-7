<template>
    <div>
        <router-link to="/main">MainPage</router-link>
        <router-link to="/profil">Consulter mon Profil</router-link>
        <h1>Bienvenue sur le réseau social de Groupomania !</h1>
        <h2> Echangez avec vos collègues dès maintenant ! </h2>
        <h3> <router-link to="/ForumTexte">Accès au forum textuel !</router-link> </h3>
        <h3> <router-link to="/ForumGif">Accès au forum Multimédia !</router-link> </h3>
        <h3> <router-link to="/listeUtilisateur" v-show="admin">Accès administrateur</router-link> </h3>


        <Deconnexion/>





    </div>
</template>


<script>
import Deconnexion from '../components/Connexion/Deconnexion.vue';
import APICall from '../components/APICall/APICall.vue';


export default {
  name: 'Main',
  components : {
    Deconnexion
  },
  data: () => {
    return {
      admin: false
    }
  },
  mounted: function () {
      this.admin = APICall.methods.getParsedToken().isAdmin;
  }
}
</script>