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
                firstname: req.body.firstname
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
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));


};