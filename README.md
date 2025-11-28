# TI SIGMA - Plataforma de Cursos

Bem-vindo ao TI SIGMA, uma plataforma de cursos online. Este projeto é construído com um frontend em Next.js e um backend em Node.js, com bancos de dados PostgreSQL e MongoDB, todos orquestrados com Docker.

## Tecnologias Utilizadas

*   **Frontend**: Next.js, React, TypeScript
*   **Backend**: Node.js, Express, Sequelize
*   **Bancos de Dados**:
    *   PostgreSQL: Para autenticação e dados de usuários.
    *   MongoDB: Para o conteúdo dos cursos (funcionalidade a ser implementada).
*   **Orquestração**: Docker, Docker Compose

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

*   [Node.js](https://nodejs.org/) (versão 18 ou superior)
*   [npm](https://www.npmjs.com/)
*   [Docker](https://www.docker.com/get-started)
*   [Docker Compose](https://docs.docker.com/compose/install/) (geralmente vem com o Docker)

## Como Configurar e Executar

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### 1. Clone o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_DIRETORIO>
```

### 2. Execute o Script de Setup

O projeto inclui um script de setup que cria os arquivos de configuração, instala as dependências e prepara o ambiente.

```bash
bash setup.sh
```

Este script irá:
*   Verificar se Node.js, npm e Docker estão instalados.
*   Criar os arquivos `.env` para o frontend e backend.
*   Instalar as dependências `npm` para ambos os projetos.
*   Gerar um `docker-compose.yml` otimizado para desenvolvimento.

### 3. Inicie a Aplicação com Docker

A maneira recomendada de executar o projeto é com Docker. Use o comando a seguir na raiz do projeto:

```bash
sudo docker compose up --build -d
```

Este comando irá:
*   Construir as imagens do Docker para o frontend e o backend.
*   Iniciar os contêineres para todos os serviços (frontend, backend, PostgreSQL, MongoDB).
*   Executar a aplicação em modo de desenvolvimento com hot-reloading.

### 4. Acesse a Aplicação

Após iniciar os contêineres, você pode acessar os seguintes URLs:

*   **Frontend**: [http://localhost:3000](http://localhost:3000)
*   **Backend**: [http://localhost:8000](http://localhost:8000)

## Estrutura do Projeto

```
.
├── backend/         # Código do backend (Node.js/Express)
├── frontend/        # Código do frontend (Next.js)
├── .gitignore       # Arquivos e diretórios ignorados pelo Git
├── docker-compose.yml # Arquivo de orquestração do Docker (gerado pelo setup.sh)
├── README.md        # Este arquivo
└── setup.sh         # Script de configuração inicial
```

## Instruções do Banco de Dados

Este projeto utiliza dois bancos de dados:

1.  **PostgreSQL**: Para autenticação e dados de usuários.
2.  **MongoDB**: Para o conteúdo da aplicação (atualmente não implementado).

A configuração é gerenciada via Docker, o que simplifica a instalação e o gerenciamento.

### Como Iniciar os Bancos de Dados

A forma mais fácil de iniciar os bancos de dados é usando o `docker-compose.yml` fornecido.

1.  **Inicie os contêineres em segundo plano:**
    ```bash
    sudo docker compose up -d
    ```
    Este comando irá iniciar o PostgreSQL, o MongoDB, o backend e o frontend.

2.  **Verifique se os contêineres estão em execução:**
    ```bash
    sudo docker ps
    ```
    Você deverá ver os contêineres `ti-postgres` e `ti_mongodb_db` (ou similar) em execução.

### Como Parar os Bancos de Dados

Para parar os contêineres e os bancos de dados:

```bash
sudo docker compose down
```

### Persistência de Dados

Os dados são armazenados em volumes do Docker, o que significa que eles **não serão perdidos** quando você parar os contêineres com `docker compose down`. Os volumes são:

*   `postgres_data`: Para os dados do PostgreSQL.
*   `mongodb_data`: Para os dados do MongoDB.

Se você quiser remover completamente os dados, pode executar:

```bash
sudo docker compose down -v
```

### Credenciais Padrão

As credenciais padrão estão definidas no arquivo `.env.backend` (para PostgreSQL) e no `docker-compose.yml` (para MongoDB).

**PostgreSQL:**
*   **Host**: `localhost`
*   **Porta**: `5432`
*   **Usuário**: `postgres`
*   **Senha**: `postgres`
*   **Banco de Dados**: `ti_database`

**MongoDB:**
*   **Host**: `localhost`
*   **Porta**: `27017`
*   **Usuário**: `mongo`
*   **Senha**: `17112007`
*   **Banco de Dados**: `TI_db`

**IMPORTANTE:** Altere essas senhas em um ambiente de produção por segurança.

### Conectando com um Cliente de Banco de Dados

Você pode usar um cliente de banco de dados gráfico como DBeaver, DataGrip ou pgAdmin para se conectar ao PostgreSQL. Use as credenciais listadas acima. Como os bancos de dados estão rodando em contêineres Docker, mas com as portas mapeadas para o seu `localhost`, você pode se conectar a eles como se estivessem rodando localmente.


## Esquema do Banco de Dados (SQL)

Abaixo está o esquema SQL para as tabelas de conteúdo do curso. A tabela `users` é gerenciada automaticamente pelo Sequelize.

```sql
-- Tabela para armazenar os cursos
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para os módulos de um curso
CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL -- A ordem do módulo no curso
);

-- Tabela para as aulas de um módulo
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    video_url VARCHAR(255) NOT NULL, -- URL do vídeo da aula
    "order" INTEGER NOT NULL, -- A ordem da aula no módulo
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para rastrear o progresso do usuário
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id) -- Garante que um usuário só pode completar uma aula uma vez
);
```

## Ideias para Melhorias Futuras

Aqui estão algumas ideias para expandir o projeto:

*   **Gamificação**: Implementar um sistema de pontos, medalhas e ranking para incentivar o engajamento dos alunos.
*   **Quizzes e Avaliações**: Adicionar quizzes ao final de cada módulo para testar o conhecimento dos alunos.
*   **Fórum da Comunidade**: Criar um espaço para que os alunos possam discutir as aulas, tirar dúvidas e interagir.
*   **Certificados de Conclusão**: Gerar certificados automaticamente quando um aluno completar um curso.
*   **Painel de Administração**: Desenvolver uma área para que administradores possam criar, editar e gerenciar cursos, módulos e aulas.
*   **Integração de Pagamentos**: Adicionar suporte a gateways de pagamento para vender cursos.

