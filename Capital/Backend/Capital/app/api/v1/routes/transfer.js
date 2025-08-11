// IMPORTS...
const router = require('express').Router();
const { authMiddleware, roleMiddleware } = require('../../../middleware/auth');
const {transfer, getContact, getReceiver} = require('../controllers/transfer');

router.get('/receiver' , authMiddleware , roleMiddleware("user" , "admin") , getContact);
router.get("/receiver/photo" , authMiddleware , roleMiddleware("user" , "admin") , getReceiver)
router.post('/transfer', authMiddleware , roleMiddleware("user" , "admin")  , transfer);

// EXPORTS...
module.exports = router;