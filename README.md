# OpenContact - Frontend  ओपन संपर्क

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-7B1FA2?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Este é o repositório do frontend para o projeto OpenContact, uma Single-Page Application (SPA) para gerenciamento de agendas e contatos. A aplicação foi desenvolvida seguindo as práticas mais modernas do Angular, com foco em uma arquitetura limpa, reativa e componentes reutilizáveis.

## ✨ Funcionalidades Implementadas

A aplicação implementa um ciclo de vida completo de funcionalidades CRUD (Create, Read, Update, Delete) para as entidades principais.

### 🏛️ Gerenciamento de Agendas
- **Criação e Edição:** Adição e atualização de agendas através de um dialog modal reutilizável.
- **Listagem:** Visualização de todas as agendas em um grid de cards responsivo.
- **Deleção:** Remoção de agendas com um dialog de confirmação para segurança.
- **Navegação:** Acesso à página de detalhes de cada agenda.

### 👤 Gerenciamento de Contatos
- **CRUD Completo:** Criação, leitura, edição e remoção de contatos associados a uma agenda específica.
- **Formulários Reativos:** Uso de Reactive Forms para validação robusta dos dados de contato (nome, tipo, DDD, telefone).
- **Tabela de Dados Profissional (`MatTable`):**
    - **Paginação:** A lista de contatos é paginada, otimizando a performance ao lidar com grandes volumes de dados.
    - **Busca em Tempo Real:** Um campo de busca filtra os contatos por nome instantaneamente, utilizando o poder do RxJS (`debounceTime`, `switchMap`) para evitar chamadas excessivas à API.
- **UX Melhorada:** Submissão de formulários com a tecla `Enter` e diálogos de confirmação para ações destrutivas.

### 🎨 UI & Design
- **Angular Material:** Interface construída com a suíte de componentes do Angular Material.
- **Layout Profissional:** Estrutura consistente com uma Navbar superior persistente e conteúdo principal centralizado.
- **Design Coeso:** Estilização customizada e polida, incluindo uma barra de busca "estilo Google", botões de ícone e um tema de cores consistente.
- **Ícones Customizados:** Registro de ícones SVG personalizados (`MatIconRegistry`) para logos de marcas (ex: GitHub).

## 🚀 Arquitetura e Tecnologias

- **Framework:** Angular (v20+)
- **Conceitos Principais:**
    - **Standalone Components:** Arquitetura 100% baseada em componentes autônomos.
    - **Controle de Fluxo Nativo:** Uso da sintaxe `@if` e `@for` para templates.
    - **Programação Reativa (RxJS):** Gerenciamento de fluxos de dados assíncronos para chamadas de API e filtros.
- **Linguagem:** TypeScript
- **Estilização:** SCSS
- **Containerização:**
    - **Dockerfile Multi-Stage:** Build otimizado que resulta em uma imagem Docker leve com Nginx.
    - **Configuração Flexível:** Uso de variáveis de ambiente no Nginx para conectar ao backend, permitindo que a mesma imagem seja usada em diferentes ambientes.

## ▶️ Como Executar (Desenvolvimento Local)

1.  **Pré-requisitos:**
    - Node.js (v22.x ou superior)
    - Angular CLI (`npm install -g @angular/cli`)

2.  **Clone o repositório:**
    ```bash
    git clone https://github.com/RafaelQSantos-RQS/OpenContactFrontend
    cd OpenContactFrontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute a aplicação:**
    ```bash
    ng serve
    ```
    A aplicação estará disponível em `http://localhost:4200/`. Lembre-se que a API backend precisa estar rodando e o arquivo `proxy.conf.json` configurado corretamente.

## 🐳 Como Executar com Docker

O projeto inclui um `Dockerfile` otimizado e uma configuração para Nginx.

1.  **Build da imagem Docker:**
    ```bash
    docker build -t opencontact-frontend .
    ```

2.  **Execute com Docker Compose (Recomendado):**
    Para rodar em conjunto com o backend, adicione o seguinte serviço ao seu arquivo `docker-compose.yml`:

    ```yaml
    services:
      # ... seu serviço de api (ex: backend-api)

      frontend:
        build:
          context: ./caminho/para/o/repo/do/frontend # Caminho para este projeto
        ports:
          - "80:80"
        depends_on:
          - backend-api
        environment:
          - API_SERVICE_URL=backend-api
    ```
    Execute com `docker-compose up`. A aplicação estará disponível em `http://localhost/`.
