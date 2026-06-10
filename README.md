# SpaceGuard

SpaceGuard é uma aplicação de monitoramento climático espacial com backend .NET e frontend mobile em React Native. O projeto exibe regiões monitoradas, alertas, métricas, cadastro e edição de dados, além de uma apresentação institucional e configurações de interface.

## Visão Geral

O aplicativo foi pensado para simular um sistema profissional de acompanhamento de temperatura e satélites, consumindo a API REST existente e mantendo o fluxo de telas simples, objetivo e funcional.


## Integrantes

* Caio Felipe Silva - RM 564615
* Davi Tagawa Schincaglia Lima Lemos - RM 563457
* Luis Guilherme Borges Silva - RM 566548
* Leonardo Zerbinatti de Sales - RM 562992
* Vinícius Luis Exposito Morassi Garcia - RM 563340

## Tecnologias Utilizadas

### Backend

* ASP.NET Core 6
* C#
* Entity Framework Core 6
* Npgsql.EntityFrameworkCore.PostgreSQL
* PostgreSQL 16
* Docker
* Docker Compose

### Frontend mobile

* Expo
* React Native
* TypeScript
* React Navigation
* Axios
* react-native-gesture-handler
* react-native-safe-area-context
* react-native-screens
* react-native-web
* ESLint
* Prettier

## Estrutura do Projeto

* `backend/SpaceGuard/` - API .NET do projeto
* `backend/docker/` - compose para subir API e banco PostgreSQL
* `src/` - aplicação mobile em React Native

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

## Configuração da API

O cliente Axios está centralizado em `src/api/apiClient.ts`, com base URL configurável, fallback automático entre portas locais, timeout e tratamento global de erros.

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

### Com Docker

```bash
docker compose -f backend/docker/docker-compose.yml up -d
```

### Em desenvolvimento local

```bash
cd backend/SpaceGuard
dotnet run
```

API padrão em desenvolvimento:

* `http://localhost:5129/api`

Para Android físico, a API precisa estar acessível pela rede local do computador. Se estiver usando `dotnet run`, o backend agora escuta em `0.0.0.0:5129`, então o app pode alcançar o PC pela LAN quando estiver na mesma Wi-Fi.

Quando executado via Docker, a API fica disponível em:

* `http://localhost:8080/api`

## Como Executar o Mobile

```bash
npm install
npm run start
```

```powershell
Set-Location "c:\Users\Vinicao\Desktop\spaceguard\backend\SpaceGuard"; dotnet run
```

## Autor

Projeto SpaceGuard adaptado para avaliação técnica.
