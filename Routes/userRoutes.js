const express = require('express');
const { registerController,
    getAllUsers,
    loginController } = require('../Controllers/userControllers.js')


//router object
const router = express.Router();

//All users  || Get
router.get('/all-users', getAllUsers);

//Create User || POST
router.post("/register", registerController)


//Login User || POST
router.post('/login', loginController)


module.exports = router;