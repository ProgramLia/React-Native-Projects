// MY SETUP...
const {Pool} = require("pg");
const { PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT } = require("../config");

const pool = new Pool({
     user:PGUSER,
     host:PGHOST,
     database:PGDATABASE,
     password:PGPASSWORD,
     port:PGPORT,
})

module.exports = pool;
