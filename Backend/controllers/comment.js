const { raw } = require('body-parser');
const { Comment } = require("../sequelize").models;
const jwt = require('jsonwebtoken');


exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    
    Comment.create({
        content: req.body.content,
        userId: userId,
        gifId: req.body.gifId

    })
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
    .catch(error => res.status(400).json({ message: 'ça marche paaaaas !' }));
};

exports.getAllComment = (req, res, next) => {
    Comment.findAll({where: { gifId : req.params.gifId}})
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
    Comment.findOne({where: { id: req.params.id }})
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error }));
};

exports.modifyComment = (req, res, next) => {
    const commentObject = req.file ?
    {
        ...JSON.parse(req.body.comment),
    } : { ...req.body };
    Comment.updateOne({ id: req.params.id }, { ...commentObject, id: req.params.id })
    .then(() => res.status(200).json({ message: 'Commentaire modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ id: req.params.id })
    .then(c => {
        
        Comment.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
        .catch(error => res.status(400).json({ error }));
   
    })
    .catch(error => res.status(500).json({ error }));
};  