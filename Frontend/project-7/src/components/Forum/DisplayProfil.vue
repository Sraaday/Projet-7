<template>
       <div class="outline">
        <h1>{{firstName}} {{lastName}}</h1>
        <h2>Adresse mail : {{email}}</h2>
        <button v-if="admin || id == userId" v-on:click="deleteProf(id)">Supprimer le profil</button>
    </div>
</template>

<style scoped>

</style>

<script>
import APICall from '../APICall/APICall.vue'

export default {
    name: 'DisplayProfil',
    props: {
        id: Number
    },
    data: () => {
        return {
            firstName: "",
            lastName: "",
            email: "",
            userId: 0,
            admin: false
        }
    },

    methods: {
        deleteProf: async function (profId) {
            APICall.methods.delete(`user/${profId}`);
            if (this.userId == this.id) {
                APICall.methods.removeToken();
                this.$router.push({ name: "Acceuil" });
            } else {
                this.$router.go();
            }
        }
    },

    mounted: async function () {
        this.userId = APICall.methods.getParsedToken().userId;
        this.admin = APICall.methods.getParsedToken().isAdmin;
        const responseUser = await APICall.methods.get(`user/${this.id}`);
        this.firstName = responseUser.firstname;
        this.lastName = responseUser.lastname;
        this.email = responseUser.email;
    }
}
</script>