# Autoflex - Sistema de Gestão de Produção e Estoque

Este projeto é uma solução Fullstack desenvolvida como teste prático. O sistema permite o gerenciamento de produtos e matérias-primas, criação de receitas (fichas técnicas) e utiliza um algoritmo de otimização para sugerir a produção ideal baseada no valor agregado dos produtos e estoque disponível.

##  Tecnologias Utilizadas

### Backend
- **Java 17+**
- **Spring Boot 3** (Web, JPA, Validation)
- **PostgreSQL** (Banco de Dados)
- **Flyway** (Migração de Banco de Dados)
- **Docker** (Containerização)

### Frontend
- **React** (Vite)
- **TypeScript**
- **Redux Toolkit** (Gerenciamento de Estado Global)
- **Tailwind CSS** (Estilização e Responsividade)
- **Lucide React** (Ícones)
- **Cypress** (Testes E2E)

---

##  Funcionalidades

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

##  Como Executar (Recomendado: Docker)

A maneira mais fácil de rodar a aplicação é utilizando o Docker Compose, que sobe o Banco de Dados, o Backend e o Frontend simultaneamente.

### Pré-requisitos
- Docker e Docker Compose instalados.

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone <seu-repo-url>
   cd autoflex
   ```

2. Execute o Docker Compose:
   ```bash
    docker compose up --build
   ```

3. Aguarde os containers subirem. O sistema estará disponível em:
    
    - Frontend: http://localhost:3000
    - Backend API: http://localhost:8080
    - Banco de Dados: Porta 5432


> Nota:  O banco de dados será criado e populado automaticamente pelas migrações do Flyway.