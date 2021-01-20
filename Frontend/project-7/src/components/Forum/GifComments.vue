<template>
    <div class="outline">
        <ul>
            <li v-for="item in items" :key="item.id" >
                <p>{{item.userName}}</p>
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
            timer: null
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
                const newItem = {content: item.content, userName: `${responseUser.firstname} ${responseUser.lastname}`};
                this.tempItems.push(newItem);
            });
        }
    },
    mounted: async function () {
        const responseComments = await APICall.methods.get(`comment/multimedia/${this.gifId}`);
        responseComments.forEach(async (item) => {
            const responseUser = await APICall.methods.get(`user/${item.userId}`);
            const newItem = {content: item.content, userName: `${responseUser.firstname} ${responseUser.lastname}`};
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