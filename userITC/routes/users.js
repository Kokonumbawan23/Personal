var express = require('express');
var router = express.Router();
const AuthenticationToken = require('../middleware/AuthToken');

const {
  handlerDeleteUser,
  handlerGetUser,
  handlerGetUserById,
  handlerPutUser,
} = require('./handler');

/* GET users listing. */
router.get('/user',AuthenticationToken, handlerGetUser);
// GET user by id
router.get('/user/:id',AuthenticationToken, handlerGetUserById);
// EDIT user
router.put('/user/:id',AuthenticationToken,handlerPutUser);
// DELETE user
router.delete('/user/:id',AuthenticationToken, handlerDeleteUser);


module.exports = router;
