<template>
    <div class="outline">
        <ul>
            <li v-for="item in items" :key="item.id" >
                <p>{{item.userName}}</p>
                <button v-if="admin || item.userId == userId" v-on:click="deleteCom(item.id)">Supprimer</button>
                <p>{{item.content}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import APICall from '../APICall/APICall.vue'

export default {
    name: 'GifComments',
    props: {
        gifId: Number
    },
    data: () => {
        return {
            items: [],
            tempItems: [],
            timer: null,
            userId: 0,
            admin: false
        }
    },
    methods: {
        refreshComments: async function () {
            if (this.items.length != this.tempItems.length ){
                this.items = this.tempItems;
            }
            await this.getComments();
        },
        getComments: async function () {
            this.tempItems = [];
            const responseComments = await APICall.methods.get(`comment/multimedia/${this.gifId}`);
            responseComments.forEach(async (item) => {
                const responseUser = await APICall.methods.get(`user/${item.userId}`);
                const newItem = {content: item.content, userName: `${responseUser.firstname} ${responseUser.lastname}`, userId: item.userId, id: item.id};
                this.tempItems.push(newItem);
            });
        },
        deleteCom: async function (comId) {
            APICall.methods.delete(`comment/${comId}`);
        }
    },
    mounted: async function () {
        this.userId = APICall.methods.getParsedToken().userId;
        this.admin = APICall.methods.getParsedToken().isAdmin;
        const responseComments = await APICall.methods.get(`comment/multimedia/${this.gifId}`);
        responseComments.forEach(async (item) => {
            const responseUser = await APICall.methods.get(`user/${item.userId}`);
            const newItem = {content: item.content, userName: `${responseUser.firstname} ${responseUser.lastname}`, userId: item.userId, id: item.id};
            this.items.push(newItem);
            this.tempItems.push(newItem);
        });
        this.timer = setInterval(() => {
            this.refreshComments()
        }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
}

</script>

<style scoped>

</style>