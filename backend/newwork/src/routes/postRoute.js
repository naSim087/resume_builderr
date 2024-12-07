const express = require('express');
const { 
  createPost, 
  deletePost, 
  getPost, 
  getTimelinePosts, 
  likePost, 
  updatePost 
} = require('../controllers/postController.js');
const authMiddleWare = require('../Middleware/authMiddleware.js');
const authMiddleware = require('../Middleware/authMiddleware.js');

const router = express.Router();

router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
// router.get('/:id/timeline', getTimelinePosts);
router.get('/:id/timeline',(req,res,next)=>{console.log("file");next();},authMiddleware ,getTimelinePosts);
module.exports = router;