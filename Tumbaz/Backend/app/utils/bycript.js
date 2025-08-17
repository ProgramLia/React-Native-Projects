// MY SETUP...
const bycript = require("bcryptjs");

async function hashing(data) {
     return await bycript.hash(data, 12);
}

async function compare(oldData, newData) {
     return await bycript.compare(oldData, newData);
}

module.exports = {hashing, compare};
