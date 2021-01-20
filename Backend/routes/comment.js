const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const like = require('../middleware/like');

const commentCtrl = require('../controllers/comment');


// Toutes les routes concernants les comments sont sécurisées via auth et les images sont gérées grâce à multer
router.post('/', auth, commentCtrl.createComment);
router.get('/multimedia/:gifId', auth, commentCtrl.getAllComment);
router.get('/:id', auth, commentCtrl.getOneComment);
router.put('/:id', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);  
router.post('/:id/like', auth, like.like);

module.exports = router;