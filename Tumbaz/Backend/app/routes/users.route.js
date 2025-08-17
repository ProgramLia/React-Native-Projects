// MY SETUP...
const { Users, User, create, update, deleteUser } = require("../controllers/users.controller");
const router = require("express").Router();

router.get("/users" , Users);
router.get("/users/:id" , User);
router.post("/users" , create);
router.put("/users/:id" , update);
router.delete("/users/:id" , deleteUser);

module.exports = router;
