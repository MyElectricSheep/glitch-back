const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../middlewares/authorize')
const userController = require('../controllers/userController')

/* GET users listing. */
router.get('/scan', authorizeUser, userController.scan);

/* POST a new user. */
router.post('/plug', userController.plug)

/* POST login a user */
router.post('/login', userController.login)

/* PUT a user. */
router.put('/update', userController.update)

/* DELETE a user. */
router.delete('/unplug/:id', userController.unplug)

module.exports = router;
