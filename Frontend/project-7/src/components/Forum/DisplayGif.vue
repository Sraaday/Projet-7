<template>
    <div class="outline">
        <p>{{userName}}</p>
        <h1>{{title}}</h1>
        <p>{{likes}} Likes - {{dislikes}} Dislikes</p>
        <img :src="gifUrl" />
        <h1>Commentaires {{1}}</h1>
        <GifComments :gifId="id"/>
        <PostComment :gifId="id"/>
    </div>
</template>
<script>
import APICall from '../APICall/APICall.vue'
import GifComments from './GifComments.vue'
import PostComment from './PostComment.vue'

export default {
    name: 'DisplayGif',
    props: {
        id: Number
    },
    components: {
        GifComments,
        PostComment
    },
    data: () => {
        return {
            title: "",
            gifUrl: "",
            userName:"",
            likes: 0,
            dislikes: 0
        }
    },
    mounted: async function () {
        const responseGif = await APICall.methods.get(`gif/${this.id}`);
        this.title = responseGif.title;
        this.gifUrl = responseGif.imageUrl;
        this.likes = responseGif.likes;
        this.dislikes = responseGif.dislikes;
        const responseUser = await APICall.methods.get(`user/${responseGif.userId}`);
        this.userName = `${responseUser.firstname} ${responseUser.lastname}`;
        

    }
}
</script>

<style scoped>

</style>