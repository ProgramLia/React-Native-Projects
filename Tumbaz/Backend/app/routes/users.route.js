// MY SETUP...
const { Users } = require("../controllers/users.controller");
const router = require("express").Router();

router.get("/users" , Users);

module.exports = router;
