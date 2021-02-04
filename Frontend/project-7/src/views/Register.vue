<template>
  <div class="register">
    <h1>Vous avez déjà un compte ? Cliquez <router-link to="/">ici</router-link> pour vous connecter.</h1>
    <Inscription href="Acceuil"/>
  </div>
</template>



<script>
import Inscription from '../components/Connexion/Inscription.vue';


export default {
  components: {
      Inscription
  }
}
</script>

