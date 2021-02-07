<template>
    <div>
        <router-link class="menu" to="/main">MainPage</router-link>
        <router-link class="menu" to="/profil">Consulter mon Profil</router-link>
        <img alt="Logo Groupamania" class="logo" src="../assets/icon-above-font.png"/>
        <h1>Bienvenue sur notre réseau social !</h1>
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

<style scoped>
.menu {
  padding: 10px 10px 10px 10px;
}


.logo {
    width: 450px;
    display: flex;
    align-self: center;
    border: #ba4e38;
    border-style: solid ;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 10px;
    margin-top: 10px;
  }

@media screen and (max-width: 992px) {
  div {
    display: flex;
    flex-direction: column;
  }

  #nav {
    padding: 10px;
  }

  a {
    font-size: 25px;
  }

  .logo {
    width: 450px;
    display: flex;
    align-self: center;
    border: #ba4e38;
    border-style: solid ;
    border-radius: 5px;
  }
}

/* On screens that are 600px or less */
@media screen and (max-width: 600px) {
  div {
    display: flex;
    flex-direction: column;
  }

  .logo {
    width: 290px;
    display: flex;
    align-self: center;
    border: #ba4e38;
    border-style: solid ;
    border-radius: 5px;
  }

  a {
    font-size:20px;
  }

  h2 {
    font-size: 23px;
  }

  h1 {
    font-size: 27px;
  }
}
</style>