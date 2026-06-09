# SpaceGuard

Aplicação completa para monitoramento de satélites e leitura de temperatura da Terra, com backend .NET e frontend mobile React Native consumindo exclusivamente a API REST existente.

## Objetivo

Simular um sistema profissional de monitoramento climático espacial, exibindo métricas, histórico térmico, alertas e operações de cadastro com persistência centralizada na API.

## Tecnologias Utilizadas

Backend:

* ASP.NET Core 8
* C#
* Entity Framework Core
* PostgreSQL 16
* Docker e Docker Compose

Frontend mobile:

* React Native
* Expo
* TypeScript
* React Navigation
* Axios
* ESLint e Prettier

## Estrutura da Solução

* `SpaceGuard/`: API .NET existente
* `docker/`: composição dos containers
* `mobile/`: aplicativo React Native com a interface de monitoramento

## Endpoints Mapeados da API

Satélites:

* `GET /api/Satelites`
* `GET /api/Satelites/{id}`
* `POST /api/Satelites`
* `PUT /api/Satelites`
* `DELETE /api/Satelites/{id}`

Indicadores ambientais:

* `GET /api/Indicadores`
* `GET /api/Indicadores/{id}`
* `POST /api/Indicadores`
* `PUT /api/Indicadores`
* `DELETE /api/Indicadores/{id}`

Alertas ambientais:

* `GET /api/Alertas`
* `GET /api/Alertas/{id}`
* `POST /api/Alertas`
* `PUT /api/Alertas`
* `DELETE /api/Alertas/{id}`

## Funcionalidades do App

* Dashboard com temperatura média, maior, menor e última atualização
* Lista de regiões monitoradas com busca
* Detalhes da região com histórico de leituras e alertas vinculados
* Cadastro e edição de região
* Lista de leituras térmicas
* Lista de alertas ambientais
* Alternância de tema claro/escuro
* Seed automático de dados de demonstração quando a API estiver vazia

## Estrutura de Pastas do Mobile

```text
src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── components/
├── screens/
├── services/
├── api/
├── hooks/
├── routes/
├── styles/
├── utils/
├── constants/
└── types/
```

## Como Executar o Backend

```bash
docker compose -f docker/docker-compose.yml up -d
```

API padrão:

* `http://localhost:8080/api`

## Como Executar o Mobile

```bash
cd mobile
npm install
npm run start
```

O cliente Axios tenta automaticamente as portas locais `5129` e `8080` para reduzir falhas de conexão entre o backend em desenvolvimento e o backend em Docker.
Se precisar forçar um host específico, defina `EXPO_PUBLIC_API_BASE_URL`.

## Configuração da API

O cliente Axios está centralizado em `src/api/apiClient.ts`, com base URL configurável, fallback automático entre portas locais, timeout e tratamento global de erros.

## Prints

Espaço reservado para capturas da interface final.

## Sugestão de Commits

1. `Initial project setup`
2. `Configure navigation`
3. `Create reusable components`
4. `Integrate .NET API`
5. `Implement CRUD operations`
6. `Add dashboard metrics`
7. `Improve UI and responsiveness`
8. `Configure ESLint and Prettier`
9. `Final adjustments and bug fixes`

## Autor

Projeto SpaceGuard adaptado para avaliação técnica.
