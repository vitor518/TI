const { Sequelize } = require('sequelize');

// ensure password is a string (dotenv may supply it as string, but coerce anyway)
const dbPassword = (process.env.PG_PASSWORD === undefined || process.env.PG_PASSWORD === null)
  ? undefined
  : String(process.env.PG_PASSWORD);

if (dbPassword === undefined) {
  console.warn('Warning: PG_PASSWORD is not set — database authentication will likely fail.');
}

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, dbPassword, {
  host: process.env.PG_HOST,
  dialect: 'postgres',
});

module.exports = sequelize;
