<template>
    <div class="outline">
        <p>{{userName}}</p>
        <h1>{{title}}</h1>
        <LikeDislike :gif="objectToLikes" v-if="show" />
        <img :src="gifUrl" />
        <h1>Commentaires</h1>
        <GifComments :gifId="id"/>
        <PostComment :gifId="id"/>
    </div>
</template>


<script>
import APICall from '../APICall/APICall.vue'
import GifComments from './GifComments.vue'
import PostComment from './PostComment.vue'
import LikeDislike from './LikeDislike.vue'

export default {
    name: 'DisplayGif',
    props: {
        id: Number
    },
    components: {
        GifComments,
        PostComment,
        LikeDislike
    },
    data: () => {
        return {
            title: "",
            gifUrl: "",
            userName:"",
            likes: 0,
            dislikes: 0,
            objectToLikes: null,
            show: false
        }
    },
    mounted: async function () {
        const responseGif = await APICall.methods.get(`gif/${this.id}`);
        this.title = responseGif.title;
        this.gifUrl = responseGif.imageUrl;
        this.objectToLikes = { id: responseGif.id, likes: responseGif.likes, dislikes: responseGif.dislikes
                             , likesList : responseGif.usersLiked, dislikesList: responseGif.usersDisliked };
        const responseUser = await APICall.methods.get(`user/${responseGif.userId}`);
        this.userName = `${responseUser.firstname} ${responseUser.lastname}`;

        this.show = true;
    }
}
</script>

<style scoped>

</style>