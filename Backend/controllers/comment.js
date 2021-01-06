const { raw } = require('body-parser');
const { Comment } = require("../sequelize").models;


exports.createComment = (req, res, next) => {

    
    Comment.create({
        content: req.body.content

    })
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
    .catch(error => res.status(400).json({ message: 'ça marche paaaaas !' }));
};

exports.getAllComment = (req, res, next) => {
    Comment.findAll()
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error }));
};

exports.modifyComment = (req, res, next) => {
    const commentObject = req.file ?
    {
        ...JSON.parse(req.body.comment),
    } : { ...req.body };
    Comment.updateOne({ _id: req.params.id }, { ...commentObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Commentaire modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
    .then(c => {
        
        Comment.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
        .catch(error => res.status(400).json({ error }));
   
    })
    .catch(error => res.status(500).json({ error }));
};  