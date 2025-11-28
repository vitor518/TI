// IMPORTANTE: Carregar variáveis de ambiente ANTES de qualquer outro import
const path = require('path');

// Carregar .env.backend do root do projeto primeiro
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.backend') });
// Sobrescrever com .env.local se existir (para desenvolvimento local)
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.local'), override: true });

// Validar variáveis de ambiente críticas
const requiredEnvVars = ['PG_HOST', 'PG_DATABASE', 'PG_USER', 'PG_PASSWORD'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Erro: Variáveis de ambiente obrigatórias não encontradas:');
  missingEnvVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('\nCertifique-se de ter um arquivo .env.backend ou .env.local na raiz do projeto.');
  process.exit(1);
}

// Agora sim, importar os módulos que dependem das variáveis de ambiente
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ 
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Função para iniciar o servidor
async function startServer() {
  try {
    console.log('🔄 Testando conexão com o banco de dados...');
    
    // Testar conexão com o banco
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    // Sincronizar modelos com o banco
    console.log('🔄 Sincronizando modelos com o banco de dados...');
    await sequelize.sync({ alter: false }); // Use alter: true apenas em desenvolvimento se necessário
    console.log('✅ Modelos sincronizados com sucesso.');

    // Iniciar o servidor
    app.listen(port, () => {
      console.log('================================');
      console.log(`✅ Servidor rodando na porta ${port}`);
      console.log(`📍 URL: http://localhost:${port}`);
      console.log(`🗄️  Banco: ${process.env.PG_DATABASE}@${process.env.PG_HOST}`);
      console.log('================================');
    });

  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:');
    console.error(error);
    
    if (error.name === 'SequelizeConnectionError') {
      console.error('\n💡 Dicas para resolver:');
      console.error('   1. Verifique se o PostgreSQL está rodando');
      console.error('   2. Confirme as credenciais no arquivo .env.backend');
      console.error('   3. Verifique se o banco de dados existe');
      console.error('   4. Confira o host e porta do PostgreSQL');
    }
    
    process.exit(1);
  }
}

// Tratamento de erros não capturados
process.on('unhandledRejection', (error) => {
  console.error('❌ Erro não tratado (Promise Rejection):', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Erro não tratado (Exception):', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('⚠️  SIGTERM recebido, encerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n⚠️  SIGINT recebido, encerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

// Iniciar o servidor
startServer();