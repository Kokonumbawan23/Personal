var express = require('express');
var router = express.Router();

const { handlerLoginUser,
        handlerRegisterUser,} = require('./handler');

//Login Handler
router.post('/login',handlerLoginUser);
//Register Handler
router.post('/register',handlerRegisterUser);

module.exports = router;
