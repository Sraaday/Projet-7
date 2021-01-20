const Gif = require('../models/gif');

// Fonction général du like/dislike
exports.like = (req,res, next) => {
    Gif.findOne({ id: req.params.id })
    .then(gif => {
        switch (req.body.like) {
        case -1 :
            addDislike(req.params.id, req.body.userId, res, gif);
            break;
        case 0 :
            removeLikeDislike(req.params.id, req.body.userId, res, gif);
            break;
        case 1 :
            addLike(req.params.id, req.body.userId, res, gif);
            break;
        default :
            return res.status(400).json({ error });
        }
     })
    
}

function addLike (id, userId, res, gif) {
    if (gif.usersLiked.find(user => user === userId)==null) {
        removeDislike(id, userId, res, gif);
        Gif.updateOne({ _id: id }, {
            $inc: {likes:1}, 
            $push: {usersLiked: userId}, 
            id: id
        })
            .then(() => res.status(201).json({ message: 'Like ajouté !'}))
            .catch( error => res.status(400).json({ error }))
    }
}

function addDislike (id, userId, res, gif) {
    if (gif.usersDisliked.find(user => user === userId)==null) {
        removeLike(id, userId, res, gif);
        Gif.updateOne({ id: id }, {
            $inc: {dislikes:1},
            $push: {usersDisliked: userId},
            id: id
        })
            .then(() => res.status(201).json({ message: 'Dislike ajouté !'}))
            .catch( error => res.status(400).json({ error }))
    }
}

function removeLikeDislike (id, userId, res, gif) {
    removeDislike(id, userId, res, gif);
    removeLike(id, userId, res, gif);

}

function removeDislike (id, userId, res, gif) {
    if (gif.usersDisliked.find(user => user === userId)) {
        Gif.updateOne({ id: id }, {
            $inc: {dislikes:-1},
            $pull: {usersDisliked: userId},
            id: id
        })
            .then(() => res.status(201).json({ message: 'Dislike enlevé !'}))
            .catch( error => res.status(400).json({ error }))
    }
}
     
    
function removeLike (id, userId, res, gif) {
    if (gif.usersLiked.find(user => user === userId)) {
        Gif.updateOne({ id: id }, {
            $inc: {likes:-1},
            $pull: {usersLiked: userId},
            id: id
        })
            .then(() => res.status(201).json({ message: 'Like enlevé !'}))
            .catch( error => res.status(400).json({ error }))
    }
}