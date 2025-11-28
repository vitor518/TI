const { Sequelize } = require('sequelize');

const dbPassword = process.env.PG_PASSWORD
  ? String(process.env.PG_PASSWORD)
  : null;

if (!process.env.PG_DATABASE) {
  throw new Error('PG_DATABASE não está definida');
}

if (!process.env.PG_USER) {
  throw new Error('PG_USER não está definida');
}

if (!dbPassword) {
  console.warn('⚠️  PG_PASSWORD não definida');
}

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  dbPassword,
  {
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    logging: process.env.NODE_ENV === 'production' ? false : console.log,
    timezone: '-03:00',

    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    },

    retry: {
      max: 3,
      match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/
      ]
    }
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Conexão com PostgreSQL verificada'))
  .catch(err => console.error('❌ Erro ao conectar:', err.message));

module.exports = sequelize;
