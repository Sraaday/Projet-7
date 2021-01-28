<template>
    <div>
        <router-link to="/main">MainPage</router-link>
        <ul>
            <li v-for="user in userList" :key="user.id" >
                <p>{{user.userName}} créé {{user.createdAt | formatDate}}</p>
                <DisplayProfil :id="user.id" v-if="user.show"/>
                <button v-if="!user.show" v-on:click="user.show = true">Voir plus</button>
                <button v-if="user.show" v-on:click="user.show = false">Voir moins</button>
            </li>
        </ul>
    </div>    
</template>

<style scoped>

</style>



<script>
import DisplayProfil from '../components/Forum/DisplayProfil.vue';
import APICall from '../components/APICall/APICall.vue';

export default {
    name: 'ListeUtilisateur',

    components: { 
        DisplayProfil
    },
    data: () => {
        return {
            userList: [],
            show: false
        }
    },
    methods: {
        invertShow: function (user){
            user.show = !user.show;
        }
    },
    filters: {
        formatDate: function (date) {
            const splitDateTime = date.split('T');
            const splitDate = splitDateTime[0].split('-');
            const splitTime = splitDateTime[1].split(':');
            return `le ${splitDate[2]}/${splitDate[1]}/${splitDate[0]} à ${splitTime[0]}h${splitTime[1]}`
        }
    },
    mounted: async function () {
        const responseUser = await APICall.methods.get(`user`);
            responseUser.forEach(async (item) => {
                const newItem = { id: item.id, userName: `${item.firstname} ${item.lastname}`, createdAt: item.createdAt, show: false};
                this.userList.push(newItem);
            });
        this.show = true;
    }

}
</script>