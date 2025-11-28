FROM node:18-alpine

# Instalar dependências do sistema necessárias para bcrypt e pg
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copiar package files primeiro (para aproveitar cache do Docker)
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production || npm install --only=production

# Copiar o resto dos arquivos
COPY . .

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expor porta
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando para iniciar
CMD ["npm", "start"]