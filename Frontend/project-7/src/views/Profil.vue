<template>
    <div>
      <router-link to="/main">MainPage</router-link>
      <DisplayProfil :id="id" v-if="show"/>
    </div>
</template>

<style scoped>

</style>



<script>
import DisplayProfil from '../components/Forum/DisplayProfil.vue';
import APICall from '../components/APICall/APICall.vue'

export default {
  name: 'Profil',

  components: { DisplayProfil
  },
  data: () => {
        return {
            id: 0,
            show: false
        }
    },

  mounted: function () {
    this.id = APICall.methods.getParsedToken().userId;
    this.show = true;
  }

}
</script>