const express = require('express');
const { sendConnectionRequest, cancelConnectionRequest,acceptFriendRequest,ignoreFriendRequest } = require('../controllers/UpdateRequest');
const router = express.Router();
const authenticate = require('../Middleware/authMiddleware');
router.post('/:id/send-connection-request',sendConnectionRequest);
router.post('/:id/cancel-connection-request',cancelConnectionRequest);
router.put("/:userId/accept/:requestId",(req,res,next)=>{
console.log("imcomding call");
next();
} ,    authenticate      ,    acceptFriendRequest   );
router.delete("/:userId/ignore/:requestId",    authenticate , ignoreFriendRequest);
module.exports = router;