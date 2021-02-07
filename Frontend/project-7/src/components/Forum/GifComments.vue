<template>
    <div class="outline">
        <ul>
            <li v-for="item in items" :key="item.id" >
                <p>{{item.userName}} {{item.createdAt | formatDate}}</p>
                <p>{{item.content}}</p>
                <button v-if="admin || item.userId == userId" v-on:click="deleteCom(item.id)">Supprimer</button>
                
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
                const newItem = {content: item.content, userName: `${responseUser.firstname} ${responseUser.lastname}`, userId: item.userId, id: item.id, createdAt: item.createdAt};
                this.tempItems.push(newItem);
            });
        },
        deleteCom: async function (comId) {
            APICall.methods.delete(`comment/${comId}`);
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
        const responseComments = await APICall.methods.get(`comment/multimedia/${this.gifId}`);
        responseComments.forEach(async (item) => {
            const responseUser = await APICall.methods.get(`user/${item.userId}`);
            const newItem = {content: item.content, userName: `${responseUser.firstname} ${responseUser.lastname}`, userId: item.userId, id: item.id, createdAt: item.createdAt};
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
ul {
    margin: 0px;
    padding: 0px;
}

li {
    display: flex;
    align-self: center;
    flex-direction: column;
    border: #ba4e38;
    border-style: solid ;
    border-radius: 5px;
    margin: 5px;
    background-color: #fd8671;

}

button {
    width: 33%;
    align-self: center;
    margin-top: 10px;
    margin-bottom: 10px;
}

@media screen and (min-width: 992px) {
  li {
    width: 33%;
    align-self: center;
    margin: auto;
    margin-top: 10px ;
    margin-bottom: 10px ;
  }

}

@media screen and (max-width: 600px) {
  p {
   font-size: 15px;
  }

}
</style>