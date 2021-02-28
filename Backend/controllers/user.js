const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require("../sequelize").models;


// Création d'un compte utilisateur
exports.signup = async (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                email: req.body.email,
                password: hash,
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                isAdmin : false
            })
                .then(() => res.status(201).json({ message: "Utilisateur créé" }))
                .catch(error => {res.status(400).json({ error : "Requête incorrecte" })});
        })
        .catch(error => res.status(500).json({ error }));

};

// Connexion à un compte utilisateur
exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur introuvable !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        // Attribution d'un token d'authentification généré lors de la connexion à un compte existant
                        token: jwt.sign(
                            { userId: user.id, isAdmin: user.isAdmin },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));


};

exports.getOneUser = (req, res, next) => {
    User.findOne({where: { id: req.params.id }})
    .then(User => res.status(200).json(User))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    User.findOne({where:{ id: req.params.id }})
    .then(user => {
        // Vérifie si l'action est autorisé via les données extraites du token 
        if (req.isAdmin || req.userId == user.id) {        
            User.destroy({where:{ id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
            .catch(error => res.status(400).json({ error }));
    }
    else {
        return res.status(401).json ({error: 'non autorisé'})
    }
    })
    .catch(error => res.status(500).json({ error }));
}; 

exports.getAllUser = (req, res, next) => {
    if (req.isAdmin ) {
        User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));

    }
    else {
        return res.status(401).json ({error: 'requête non autorisé'})
    }
};