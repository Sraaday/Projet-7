const { Gif } = require("../sequelize").models;
const jwt = require('jsonwebtoken');



// Fonction général du like/dislike
exports.like = async (req,res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log("Je cherche le gif");
    Gif.findOne({where:{ id: req.params.id }})
    .then(gif => {
        switch (req.body.like) {
        case -1 :
            console.log("Je dislike le gif");
            addDislike(req.params.id, userId, res, gif);
            break;
        case 0 :
            console.log("Je remove les like du gif");
            removeLikeDislike(req.params.id, userId, res, gif);
            break;
        case 1 :
            console.log("Je like le gif");
            addLike(req.params.id, userId, res, gif);
            break;
        default :
            return res.status(400).json({ error });
        }
     })
}

function hasUserId (userId, userList) {
    for (const userInd in userList) {
        if (userId === userList[userInd]) {
            return true;
        }
    }
    return false;
}

function addUserIdInList (userId, userList) {
    const res = [userId];
    for (const userInd in userList) {
        res.push(userList[userInd]);
    }
    return res;
}

async function addLike (id, userId, res, gif) {
    if (!hasUserId(userId,gif.usersLiked)) {
        removeDislike(id, userId, res, gif);
        Gif.update( {
            likes: gif.likes + 1,
            usersLiked: addUserIdInList(userId, gif.usersLiked)
        }, {where: { id: id }})
            .then(() => res.status(201).json({ message: 'Like ajouté !'}))
            .catch( error => res.status(400).json({ error }))
    }
}

function addDislike (id, userId, res, gif) {
    if (!hasUserId(userId,gif.usersDisliked)) {
        removeLike(id, userId, res, gif);
        Gif.update( {
            dislikes: gif.dislikes + 1,
            usersDisliked: addUserIdInList(userId, gif.usersDisliked)
        }, {where: { id: id }})
            .then(() => res.status(201).json({ message: 'Like ajouté !'}))
            .catch( error => res.status(400).json({ error }))
    }
}

function removeLikeDislike (id, userId, res, gif) {
    removeDislike(id, userId, res, gif);
    removeLike(id, userId, res, gif);

}

function remUserIdInList (userId, userList) {
    const res = [];
    for (const userInd in userList) {
        if (userId !== userList[userInd]) {
            res.push(userList[userInd]);
        }
    }
    return res;
}

function removeDislike (id, userId, res, gif) {
    if (hasUserId(userId,gif.usersDisliked)) {
        Gif.update( {
            dislikes: gif.dislikes - 1,
            usersDisliked: remUserIdInList(userId, gif.usersDisliked)
        }, {where: { id: id }})
            .then(() => res.status(201).json({ message: 'Dislike enlevé !'}))
            .catch( error => res.status(400).json({ error }))
    }
}
     
    
function removeLike (id, userId, res, gif) {
    if (hasUserId(userId,gif.usersLiked)) {
        Gif.update( {
            likes: gif.likes - 1,
            usersLiked: remUserIdInList(userId, gif.usersLiked)
        }, {where: { id: id }})
            .then(() => res.status(201).json({ message: 'Like enlevé !'}))
            .catch( error => res.status(400).json({ error }))
    }
}