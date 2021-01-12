const Gif = require('../models/gif');
const fs = require('fs');

exports.createGif = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}/images/${req.file.filename}`)
    Gif.create({
        title: "",
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes : 0,
        usersLiked : "",
        usersDisliked : ""

    })
    .then(() => res.status(201).json({ message: 'Gif enregistré !'}))
    .catch(error => res.status(400).json({ message: 'ça marche paaaaas !' }));
};

exports.getAllGif = (req, res, next) => {
    Gif.find()
    .then(gifs => res.status(200).json(gifs))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneGif = (req, res, next) => {
    Gif.findOne({ _id: req.params.id })
    .then(gif => res.status(200).json(gif))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteGif = (req, res, next) => {
    Gif.findOne({ _id: req.params.id })
    .then(gif => {
        const filename = gif.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Gif.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Gif supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};  