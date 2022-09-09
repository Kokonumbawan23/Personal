var express = require('express');
var router = express.Router();

const {
  handlerDeleteUser,
  handlerGetUser,
  handlerGetUserById,
  handlerPostUser,
  handlerPutUser
} = require('./handler');

/* GET users listing. */
router.get('/user', handlerGetUser);
// GET user by id
router.get('/user/:id', handlerGetUserById);
// CREATE user
router.post('/user/',handlerPostUser);
// EDIT user
router.put('/user/:id',handlerPutUser);
// DELETE user
router.delete('/user/:id', handlerDeleteUser);

module.exports = router;
