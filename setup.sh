#!/bin/bash

echo "🚀 TI SIGMA - Setup Completo"
echo "============================"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Verificar dependências
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo "📋 Verificando dependências..."
if ! command_exists node; then
    echo -e "${RED}❌ Node.js não instalado. Baixe em: https://nodejs.org/${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

if ! command_exists npm; then
    echo -e "${RED}❌ npm não instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm -v)${NC}"

if command_exists docker; then
    echo -e "${GREEN}✅ Docker $(docker -v | cut -d' ' -f3 | cut -d',' -f1)${NC}"
    DOCKER_AVAILABLE=true
else
    echo -e "${YELLOW}⚠️  Docker não encontrado (opcional)${NC}"
    DOCKER_AVAILABLE=false
fi

echo ""
echo "🔧 Criando arquivos de configuração..."

# ============================================
# BACKEND - .env.backend
# ============================================
if [ ! -f ".env.backend" ]; then
    echo -e "${BLUE}Criando .env.backend...${NC}"
    cat > .env.backend << 'EOF'
# Configurações do Servidor
PORT=8000
NODE_ENV=development

# Configurações do Banco de Dados PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=ti_database
PG_USER=postgres
PG_PASSWORD=postgres

# Configurações JWT
JWT_SECRET=ti_sigma_jwt_secret_change_in_production_$(openssl rand -hex 32)
JWT_REFRESH_SECRET=ti_sigma_refresh_secret_change_in_production_$(openssl rand -hex 32)
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
EOF
    echo -e "${GREEN}✅ .env.backend criado${NC}"
else
    echo -e "${YELLOW}⚠️  .env.backend já existe (mantendo)${NC}"
fi

# ============================================
# BACKEND - index.js
# ============================================
echo -e "${BLUE}Atualizando backend/index.js...${NC}"
cat > backend/index.js << 'EOF'
// IMPORTANTE: Carregar variáveis de ambiente ANTES de qualquer outro import
const path = require('path');

// Carregar .env.backend do root do projeto primeiro
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.backend') });
// Sobrescrever com .env.local se existir
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.local'), override: true });

// Validar variáveis de ambiente críticas
const requiredEnvVars = ['PG_HOST', 'PG_DATABASE', 'PG_USER', 'PG_PASSWORD'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Erro: Variáveis de ambiente obrigatórias não encontradas:');
  missingEnvVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('\nCertifique-se de ter um arquivo .env.backend na raiz do projeto.');
  process.exit(1);
}

// Agora sim, importar os módulos que dependem das variáveis de ambiente
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 8000;

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
    
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida.');

    console.log('🔄 Sincronizando modelos com o banco de dados...');
    await sequelize.sync({ alter: false });
    console.log('✅ Modelos sincronizados.');

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
      console.error('\n💡 Dicas:');
      console.error('   1. Verifique se o PostgreSQL está rodando');
      console.error('   2. Confirme as credenciais no .env.backend');
      console.error('   3. Verifique se o banco de dados existe');
    }
    
    process.exit(1);
  }
}

// Tratamento de erros
process.on('unhandledRejection', (error) => {
  console.error('❌ Erro não tratado:', error);
  process.exit(1);
});

process.on('SIGTERM', async () => {
  console.log('⚠️  SIGTERM recebido, encerrando...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n⚠️  SIGINT recebido, encerrando...');
  await sequelize.close();
  process.exit(0);
});

startServer();
EOF
echo -e "${GREEN}✅ backend/index.js atualizado${NC}"

# ============================================
# BACKEND - db.js
# ============================================
echo -e "${BLUE}Atualizando backend/db.js...${NC}"
cat > backend/db.js << 'EOF'
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
EOF
echo -e "${GREEN}✅ backend/db.js atualizado${NC}"

# ============================================
# BACKEND - Dockerfile
# ============================================
echo -e "${BLUE}Atualizando backend/Dockerfile...${NC}"
cat > backend/Dockerfile << 'EOF'
FROM node:18-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production || npm install --only=production

COPY . .

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["npm", "start"]
EOF
echo -e "${GREEN}✅ backend/Dockerfile atualizado${NC}"

# ============================================
# FRONTEND - .env.local
# ============================================
if [ ! -f "frontend/.env.local" ]; then
    echo -e "${BLUE}Criando frontend/.env.local...${NC}"
    cat > frontend/.env.local << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF
    echo -e "${GREEN}✅ frontend/.env.local criado${NC}"
else
    echo -e "${YELLOW}⚠️  frontend/.env.local já existe (mantendo)${NC}"
fi

# ============================================
# FRONTEND - next.config.mjs
# ============================================
echo -e "${BLUE}Atualizando frontend/next.config.mjs...${NC}"
cat > frontend/next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.youtube.com',
      },
      {
        protocol: 'https',
        hostname: '**.youtu.be',
      },
    ],
  },

  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ]
  },
}

export default nextConfig
EOF
echo -e "${GREEN}✅ frontend/next.config.mjs atualizado${NC}"

# ============================================
# FRONTEND - lib/api.ts
# ============================================
echo -e "${BLUE}Criando frontend/lib/api.ts...${NC}"
mkdir -p frontend/lib
cat > frontend/lib/api.ts << 'EOF'
import * as React from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  console.error('⚠️ NEXT_PUBLIC_API_URL não está definida!')
}

const getApiUrl = () => {
  if (!API_URL) {
    return 'http://localhost:8000'
  }
  return API_URL
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data?: T; error?: string; status: number }> {
  const url = `${getApiUrl()}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    const data = await response.json()

    return {
      data: response.ok ? data : undefined,
      error: !response.ok ? (data.message || 'Erro na requisição') : undefined,
      status: response.status,
    }
  } catch (error) {
    console.error('Erro na requisição:', error)
    return {
      error: 'Não foi possível conectar ao servidor',
      status: 0,
    }
  }
}

export const api = {
  login: async (email: string, password: string) => {
    return apiRequest<{ accessToken: string; refreshToken: string }>(
      '/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    )
  },

  register: async (name: string, email: string, password: string) => {
    return apiRequest<{ message: string }>(
      '/api/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      }
    )
  },

  healthCheck: async () => {
    return apiRequest('/health')
  },
}

export function useApiHealth() {
  const [isHealthy, setIsHealthy] = React.useState<boolean | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const checkHealth = async () => {
      setIsLoading(true)
      const { status } = await api.healthCheck()
      setIsHealthy(status === 200)
      setIsLoading(false)
    }

    checkHealth()
  }, [])

  return { isHealthy, isLoading }
}
EOF
echo -e "${GREEN}✅ frontend/lib/api.ts criado${NC}"

# ============================================
# DOCKER COMPOSE
# ============================================
if $DOCKER_AVAILABLE; then
    echo -e "${BLUE}Criando docker-compose.yml...${NC}"
    cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: ti-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${PG_USER:-postgres}
      POSTGRES_PASSWORD: ${PG_PASSWORD:-postgres}
      POSTGRES_DB: ${PG_DATABASE:-ti_database}
    ports:
      - "${PG_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${PG_USER:-postgres}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - ti-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: ti-backend
    restart: unless-stopped
    environment:
      NODE_ENV: ${NODE_ENV:-development}
      PORT: ${PORT:-8000}
      PG_HOST: postgres
      PG_PORT: 5432
      PG_DATABASE: ${PG_DATABASE:-ti_database}
      PG_USER: ${PG_USER:-postgres}
      PG_PASSWORD: ${PG_PASSWORD:-postgres}
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
    ports:
      - "${PORT:-8000}:8000"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - ti-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: ti-frontend
    restart: unless-stopped
    environment:
      NEXT_PUBLIC_API_URL: http://backend:8000
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - ti-network

networks:
  ti-network:
    driver: bridge

volumes:
  postgres_data:
    driver: local
EOF
    echo -e "${GREEN}✅ docker-compose.yml criado${NC}"
fi

# ============================================
# INSTALAR DEPENDÊNCIAS
# ============================================
echo ""
echo "📦 Instalando dependências..."

echo -e "${BLUE}Backend...${NC}"
cd backend
npm install
echo -e "${GREEN}✅ Backend dependencies instaladas${NC}"

cd ..

echo -e "${BLUE}Frontend...${NC}"
cd frontend
npm install
echo -e "${GREEN}✅ Frontend dependencies instaladas${NC}"

cd ..

# ============================================
# MENSAGEM FINAL
# ============================================
echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✅ Setup concluído com sucesso!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "📝 Próximos passos:"
echo ""

if $DOCKER_AVAILABLE; then
    echo -e "${YELLOW}OPÇÃO 1 - Docker (Recomendado):${NC}"
    echo "  docker-compose up -d"
    echo ""
fi

echo -e "${YELLOW}OPÇÃO 2 - Local:${NC}"
echo "  1. Certifique-se que o PostgreSQL está rodando"
echo "  2. Crie o banco: psql -U postgres -c 'CREATE DATABASE ti_database;'"
echo ""
echo "  Terminal 1 - Backend:"
echo "    cd backend && npm run start:dev"
echo ""
echo "  Terminal 2 - Frontend:"
echo "    cd frontend && npm run dev"
echo ""
echo "🌐 URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "  Health:   http://localhost:8000/health"
echo ""
echo -e "${RED}⚠️  IMPORTANTE:${NC}"
echo "  - Altere as senhas em .env.backend para produção"
echo "  - Configure JWT_SECRET e JWT_REFRESH_SECRET"
echo ""echo "🚀 Bom trabalho com o TI SIGMA!"
