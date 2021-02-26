const { raw } = require('body-parser');
const { Comment } = require("../sequelize").models;



exports.createComment = (req, res, next) => {
    
    
    Comment.create({
        content: req.body.content,
        userId: req.userId,
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
    Comment.update({where:{ id: req.params.id, userId: req.userId} }, { ...commentObject, id: req.params.id })
    .then(() => res.status(200).json({ message: 'Commentaire modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.findOne({where:{ id: req.params.id  }})
    .then(c => {
        if (req.isAdmin || req.userId == c.userId) {
            Comment.destroy({where:{ id: req.params.id }}) 
        
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        }
        else {
            return res.status(401).json ({error: 'pas autorisé'})
        }
    })
    .catch(error => res.status(500).json({ error }));
};  