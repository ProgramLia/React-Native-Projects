// IMPORTS...
const router = require('express').Router();
const { authMiddleware, roleMiddleware } = require('../../../middleware/auth');
const { topup } = require('../controllers/topup');

router.post('/topup', authMiddleware , roleMiddleware("user" , "admin")  ,topup);

// EXPORTS...
module.exports = router;