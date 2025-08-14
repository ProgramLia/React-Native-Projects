// MY SETUP...
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
     PGUSER:process.env.PGUSER,
     PGHOST:process.env.PGHOST,
     PGDATABASE:process.env.PGDATABASE,
     PGPASSWORD:process.env.PGPASSWORD,
     PGPORT:process.env.PGPORT,
}