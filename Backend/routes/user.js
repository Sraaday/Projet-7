const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id',auth, userCtrl.getOneUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.get('/',auth, userCtrl.getAllUser);


module.exports = router;