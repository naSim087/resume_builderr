const express = require('express');
const { deleteUser, followUser, getAllUsers, getUser, unfollowUser, updateUser } =require( '../controllers/userController.js')
// import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router()

router.get('/:id', getUser);
router.get('/',getAllUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/follow', followUser)

router.put('/:id/unfollow', unfollowUser)

module.exports = router;