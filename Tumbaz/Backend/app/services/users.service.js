// MY SETUP...
const prisma = require("../utils/prisma");

async function getUsers(params) {
     const users = await prisma.user.findMany();
     return users;
}

module.exports = {getUsers}

