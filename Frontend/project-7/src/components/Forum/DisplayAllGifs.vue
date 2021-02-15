<template>
    <div class="outline">
        <div v-if="currentGifSelected != -1">
            <button type="button" v-on:click="closeShowOneGif()">Fermer</button>
            <DisplayGif :id="currentGifSelected" />
        </div>
        <div v-show="currentGifSelected == -1">
            <UploadGif />
            <ul>
                <li v-for="item in pageOfItems" :key="item.id" >
                    
                    <h1><a v-on:click="showOneGif(item.id)">{{item.title}}</a></h1>
                    <p> créé par {{item.userName}}  {{item.createdAt | formatDate}}</p>
                    <button v-if="admin || item.userId == userId" v-on:click="deleteGif(item.id)">Supprimer</button>
                    
                    <img :alt="item.title" v-bind:src="item.gifUrl" />
                    <LikeDislike :gif="item" />
                </li>
            </ul>
            <jw-pagination :items="items" :pageSize=5 @changePage="onChangePage"></jw-pagination>
            
        </div>    
    </div>
</template>



<script>
import APICall from '../APICall/APICall.vue'
import DisplayGif from './DisplayGif.vue'
import UploadGif from './UploadGif.vue'
import LikeDislike from './LikeDislike.vue'
import JwPagination from 'jw-vue-pagination';



export default {
    name: 'DisplayAllGifs',
    props: {
        id: Number
    },
    components: {
        DisplayGif,
        UploadGif,
        LikeDislike,
        JwPagination
    },
    data: () => {
        return {
            items: [],
            pageOfItems: [],
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
                                , likes: item.likes, dislikes: item.dislikes, likesList : item.usersLiked, dislikesList: item.usersDisliked 
                                , createdAt: item.createdAt};
                this.tempItems.unshift(newItem);
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
        },
        onChangePage(pageOfItems) {
           this.pageOfItems = pageOfItems;
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
        this.userId = APICall.methods.getParsedToken().userId;
        this.admin = APICall.methods.getParsedToken().isAdmin;
        const responseGif = await APICall.methods.get(`gif`);
        responseGif.forEach(async (item) => {
            const responseUser = await APICall.methods.get(`user/${item.userId}`);
            const newItem = { title: item.title, gifUrl: item.imageUrl, id: item.id
                            , userId: item.userId, userName: `${responseUser.firstname} ${responseUser.lastname}`
                            , likes: item.likes, dislikes: item.dislikes, likesList : item.usersLiked, dislikesList: item.usersDisliked 
                            , createdAt: item.createdAt};
            this.items.unshift(newItem);
            this.tempItems.unshift(newItem);
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


img {
    width: 900px;
    margin: auto;
}

button {
   display: flex;
   flex-direction: column;
   margin: auto;
   margin-bottom: 10px;
   margin-top: 10px;
}


ul {
    margin: 0px;
    padding: 0px;
}

li {
    margin: auto;
}

li {
    border: black;
    border-style: solid ;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: white;
    width: 80%;
  }

  ul {
  list-style-type: none;
}

@media screen and (max-width: 992px) {
  div {
    display: flex;
    flex-direction: column;
  }

  #nav {
    padding: 10px;
  }

  img {
    width: 500px;
}

    li {
        width: 95%;
    }
}

/* On screens that are 600px or less */
@media screen and (max-width: 992px) {
    .pagination {
        display: flex;
        align-self: center;
    }
}
/* On screens that are 600px or less */
@media screen and (max-width: 600px) {
  div {
    display: flex;
    flex-direction: column;
  }

  img {
    width: 270px;
}

.pagination {
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-items: center;
    align-self: center;
}

p{
    font-size: 15px;
}
}
</style>