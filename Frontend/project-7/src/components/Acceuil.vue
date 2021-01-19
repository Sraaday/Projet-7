<template>
    <div>
        <img id="logo" />
        <h1>Bienvenue sur Groupomania !</h1>
        <h2>Connectez-vous pour accéder au site</h2>
        <h3>Nouveau ? Inscrivez-vous en cliquant sur l'onglet "Inscription" en haut à gauche !</h3>
        <router-link />
    </div>
</template>
<script>
import Inscription from './Connexion/Inscription.vue';
import Connexion from './Connexion/Connexion.vue';
export default {
    components: {
        Inscription,
        Connexion
    }
}
</script>
<style scoped>

</style>