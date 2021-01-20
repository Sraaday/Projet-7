const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const like = require('../middleware/like');

const gifCtrl = require('../controllers/gif');


// Toutes les routes concernants les gifs sont sécurisées via auth et les images sont gérées grâce à multer
router.post('/',auth, multer, gifCtrl.createGif);
router.get('/',auth, gifCtrl.getAllGif);
router.get('/:id', auth, gifCtrl.getOneGif);
//router.put('/:id', auth, multer, gifCtrl.modifyGif);
router.delete('/:id', auth, gifCtrl.deleteGif);  
router.post('/:id/like', auth, like.like);

module.exports = router;