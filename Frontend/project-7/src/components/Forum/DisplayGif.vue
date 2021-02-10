<template>
    <div class="outline">
        <h1>{{title}}</h1>
        <p> crée par {{userName}} {{createdAt | formatDate}}</p>
        
        
        <img :alt="title" :src="gifUrl" />
        <LikeDislike :gif="objectToLikes" v-if="show" />
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
            createdAt: 0,
            objectToLikes: null,
            show: false
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
        const responseGif = await APICall.methods.get(`gif/${this.id}`);
        this.title = responseGif.title;
        this.gifUrl = responseGif.imageUrl;
        this.createdAt = responseGif.createdAt;
        this.objectToLikes = { id: responseGif.id, likes: responseGif.likes, dislikes: responseGif.dislikes
                             , likesList : responseGif.usersLiked, dislikesList: responseGif.usersDisliked };
        const responseUser = await APICall.methods.get(`user/${responseGif.userId}`);
        this.userName = `${responseUser.firstname} ${responseUser.lastname}`;
        

        this.show = true;
    }
}
</script>

<style scoped>

img {
    padding-bottom: 10px;
}

@media screen and (max-width: 600px) {
  p {
   font-size: 15px;
  }

}
</style>