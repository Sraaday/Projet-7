const { Gif } = require("../sequelize").models;
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.createGif = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Gif.create({
        title: req.body.title,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes : 0,
        usersLiked : "",
        usersDisliked : "",
        userId: userId,

    })
    .then(() => res.status(201).json({ message: 'Gif enregistré !'}))
    .catch(error => res.status(400).json({ message: 'ça marche paaaaas !' }));
};

exports.getAllGif = (req, res, next) => {
    Gif.findAll()
    .then(gifs => res.status(200).json(gifs))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneGif = (req, res, next) => {
    console.log(req.params.id)
    Gif.findOne({where:{ id: req.params.id }})
    .then(gif => res.status(200).json(gif))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteGif = (req, res, next) => {
    Gif.findOne({where: { id: req.params.id }})
    .then(gif => {
        const filename = gif.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Gif.destroy( {where:{ id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Gif supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};  