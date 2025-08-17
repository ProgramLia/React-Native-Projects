// MY SETUP...
const { NotFound, BadRequest } = require("../errors/error");
const { hashing } = require("../utils/bycript");
const prisma = require("../utils/prisma");

async function getUsers(req) {
     const users = await prisma.user.findMany();
     return users;
}

async function getUser(req) {
     const { id } = req.params;
     const user = await prisma.user.findUnique({ where: { id } });
     if (!user) throw new NotFound("USER NOT FOUND")
     return user;
}

async function insertUser(req) {
     const { username, email, password, confirmPassword } = req.body;
     if (!username || !email || !password || !confirmPassword) throw new BadRequest("ALL FIELDS ARE REQUIRE");
     if (password != confirmPassword) throw new BadRequest("PASSWORD CONFIRMATION IS DOE'NT MATCH");
     const newUser = await prisma.user.create({ data: { username, email, password: await hashing(password) } });
     return newUser
}

async function editUser(req) {
     const { id } = req.params;
     const { username, email, password } = req.body;
     const user = await prisma.user.findUnique({ where: {id} });
     if(!user) throw new NotFound("USER NOT FOUND");
     const newData = await prisma.user.update({ where: {id}, data: { username, email, password: await hashing(password) } });
     return newData;
}

async function  removeUser(req) {
     const {id} = req.params;
     const user = await prisma.user.findUnique({where:{id}});
     if(!user) throw new NotFound("USER NOT FOUND");
     return await prisma.user.delete({where:{id}});
}

module.exports = { getUsers, getUser, insertUser, editUser, removeUser}


