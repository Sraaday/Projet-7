<template>
    <div class="outline">
        <div v-if="currentGifSelected != -1">
            <button type="button" v-on:click="closeShowOneGif()">Fermer</button>
            <DisplayGif :id="currentGifSelected" />
        </div>
        <div v-show="currentGifSelected == -1">
            <UploadGif />
            <ul>
                <li v-for="item in items" :key="item.id" >
                    <p>{{item.userName}}</p>
                    <h1><a v-on:click="showOneGif(item.id)">{{item.title}}</a></h1>
                    <button v-if="admin || item.userId == userId" v-on:click="deleteGif(item.id)">Supprimer</button>
                    <LikeDislike :gif="item" />
                    <img v-bind:src="item.gifUrl" />
                </li>
            </ul>
        </div>    
    </div>
</template>
<script>
import APICall from '../APICall/APICall.vue'
import DisplayGif from './DisplayGif.vue'
import UploadGif from './UploadGif.vue'
import LikeDislike from './LikeDislike.vue'

export default {
    name: 'DisplayAllGifs',
    props: {
        id: Number
    },
    components: {
        DisplayGif,
        UploadGif,
        LikeDislike
    },
    data: () => {
        return {
            items: [],
            tempItems: [],
            currentGifSelected: -1,
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
            await this.getGifs();
        },
        getGifs: async function () {
            this.tempItems = [];
            const responseGif = await APICall.methods.get(`gif`);
            responseGif.forEach(async (item) => {
                const responseUser = await APICall.methods.get(`user/${item.userId}`);
                const newItem = { title: item.title, gifUrl: item.imageUrl, id: item.id
                                , userId: item.userId, userName: `${responseUser.firstname} ${responseUser.lastname}`
                                , likes: item.likes, dislikes: item.dislikes, likesList : item.usersLiked, dislikesList: item.usersDisliked };
                this.tempItems.push(newItem);
            });
        },
        showOneGif: function (gifId){
            this.currentGifSelected = gifId;
        },
        closeShowOneGif: function () {
            this.currentGifSelected = -1;
        },
        deleteGif: async function (gifId) {
            APICall.methods.delete(`gif/${gifId}`);
        }
    },
    mounted: async function () {
        this.userId = APICall.methods.getParsedToken().userId;
        this.admin = APICall.methods.getParsedToken().isAdmin;
        const responseGif = await APICall.methods.get(`gif`);
        responseGif.forEach(async (item) => {
            const responseUser = await APICall.methods.get(`user/${item.userId}`);
            const newItem = { title: item.title, gifUrl: item.imageUrl, id: item.id
                            , userId: item.userId, userName: `${responseUser.firstname} ${responseUser.lastname}`
                            , likes: item.likes, dislikes: item.dislikes, likesList : item.usersLiked, dislikesList: item.usersDisliked };
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