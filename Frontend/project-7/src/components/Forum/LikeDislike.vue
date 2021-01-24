<template>
    <div class="outline">
        <p>{{gif.likes}} <button v-on:click="addLike">Likes</button> {{gif.dislikes}} <button v-on:click="addDislike">Dislikes</button></p>
        <p v-if="hasLiked">Vous avez liké ce post</p>
        <p v-if="hasDisliked">Vous avez disliké ce post</p>
    </div>
</template>
<script>
import APICall from '../APICall/APICall.vue'

export default {
    name: 'LikeDislike',
    props: {
        gif: Object
    },
    data: () => {
        return {
            hasLiked: false,
            hasDisliked: false
        }
    },
    methods: {
        addLike: async function() {
            if (!this.hasLiked) {
                const response = await APICall.methods.post(`gif/${this.gif.id}/like`, {"like": 1});
                if (!response.error){
                    this.hasLiked = true;
                    this.gif.likes ++;
                    if (this.hasDisliked) {
                        this.hasDisliked = false;
                        this.gif.dislikes --;
                    }
                }
            } else {
                const response = await APICall.methods.post(`gif/${this.gif.id}/like`, {"like": 0});
                if (!response.error){
                    this.hasLiked = false;
                    this.gif.likes --;
                }
            }
            
        },

        addDislike: async function() {
            if (!this.hasDisliked) {
                const response = await APICall.methods.post(`gif/${this.gif.id}/like`, {"like": -1});
                if (!response.error){
                    this.hasDisliked = true;
                    this.gif.dislikes ++;
                    if (this.hasLiked) {
                        this.hasLiked = false;
                        this.gif.likes --;
                    }
                }
            } else {
                const response = await APICall.methods.post(`gif/${this.gif.id}/like`, {"like": 0});
                if (!response.error){
                    this.hasDisliked = false;
                    this.gif.dislikes --;
                }
            }
            
        }

    },
    mounted: function() {
        const userId = APICall.methods.getParsedToken().userId;
        for (const likeUserId in this.gif.likesList) {
            if (userId === this.gif.likesList[likeUserId]) {
                this.hasLiked = true;
            }
        }
        for (const dislikeUserId in this.gif.dislikesList) {
            if (userId === this.gif.dislikesList[dislikeUserId]) {
                 this.hasDisliked =  true;
            }
        }
    }
}
</script>