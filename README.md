# Autoflex - Sistema de Gestão de Produção e Estoque

Este projeto é uma solução Fullstack desenvolvida como teste prático. O sistema permite o gerenciamento de produtos e matérias-primas, criação de receitas (fichas técnicas) e utiliza um algoritmo de otimização para sugerir a produção ideal baseada no valor agregado dos produtos e estoque disponível.

## Tecnologias Utilizadas

### Backend

- **Java 21**
- **Spring Boot 4** (Web, JPA, Validation)
- **PostgreSQL** (Banco de Dados)
- **Flyway** (Migração de Banco de Dados)
- **Docker** (Containerização)

### Frontend

- **React** (Vite)
- **TypeScript**
- **Nginx** (Servidor Web de Produção)
- **Redux Toolkit** (Gerenciamento de Estado Global)
- **Tailwind CSS** (Estilização e Responsividade)
- **Lucide React** (Ícones)
- **Cypress** (Testes E2E)

---

## Funcionalidades

- **CRUD de Produtos:** Cadastro completo com Código (SKU), Nome e Valor.
- **CRUD de Matérias-Primas:** Cadastro completo com Código, Nome e Estoque.
- **Gestão de Receitas:** - Vínculo de N matérias-primas para 1 produto.
  - Edição de quantidades.
  - Remoção de ingredientes.
  - Validação para evitar duplicidade.
- **Algoritmo de Otimização (Guloso):**
  - Sugere a quantidade máxima de produção.
  - Prioriza produtos de maior valor monetário.
  - Calcula o lucro total potencial.
- **Usabilidade:**
  - Gerador automático de códigos SKU/MAT.
  - Feedback visual de carregamento e ações.

---

## Como Executar (Recomendado: Docker)

A maneira mais fácil de rodar a aplicação é utilizando o Docker Compose, que sobe o Banco de Dados, o Backend e o Frontend simultaneamente.

### Pré-requisitos

- Docker e Docker Compose instalados.

### Passo a Passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/jonaferreir4/autoflex-test
   cd autoflex
   ```

2. Configure as variáveis de ambiente: O projeto necessita de um arquivo `.env` na raiz para configurar o banco de dados. Crie este arquivo copiando o exemplo fornecido:

    *Linux / Mac / Git Bash:*

      ```bash
      cp .env.example .env
      ```

    *Windows (CMD / PowerShell):*

      ```bash
      copy .env.example .env
      ```

3. Execute o Docker Compose:

   ```bash
    docker compose up --build
   ```

4. Aguarde os containers subirem. O sistema estará disponível em:

    - Frontend: <http://localhost:5173>
    - Backend API: <http://localhost:8080>
    - Banco de Dados: Porta 5432

> Nota:  O banco de dados será criado automaticamente pelas migrações do Flyway.

## Testes Automatizados (Cypress)

O projeto conta com testes End-to-End (E2E) que simulam o fluxo real do usuário, garantindo a integridade das funcionalidades críticas (Cadastro, Receitas e Otimização).

**Pré-requisito:** A aplicação deve estar rodando (via Docker ou localmente) para que os testes funcionem.

1. Entre na pasta do frontend:

   ```bash
   cd frontend
    ```

2. Instale as dependências de desenvolvimento:

    ```bash
   npm install
    ```

3. Execute os testes:

    Modo Interativo (Recomendado): Abre a interface visual do Cypress para você assistir os testes rodando.

    ```bash
      npx cypress open
    ```

    Selecione E2E Testing > Chrome > Clique em full-flow.
