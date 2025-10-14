# Sistema de Gestão de Contratos

Este projeto é um sistema web React hospedado no Netlify, com funções serverless para integração com Google Sheets API. Permite CRUD para as tabelas Fiscais, Empresas e Contratos.

## Estrutura Inicial
- React (frontend)
- Netlify Functions (backend serverless)
- Integração Google Sheets API

## Como rodar localmente
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure as credenciais da conta de serviço Google (veja instruções abaixo).
3. Rode localmente:
   ```bash
   npm run dev
   ```

## Credenciais necessárias
- Crie um projeto no Google Cloud Platform
- Habilite a Google Sheets API
- Crie uma conta de serviço e baixe o arquivo JSON
- Compartilhe a planilha com o e-mail da conta de serviço
- Defina as variáveis de ambiente no Netlify:
  - `GOOGLE_SERVICE_ACCOUNT` (conteúdo do JSON, codificado em base64 ou como secrets)
  - `GOOGLE_SHEET_ID` (ID da planilha)

## Estrutura de Pastas
- `src/` - Frontend React
- `netlify/functions/` - Funções serverless para CRUD

## Funcionalidades
- Menu principal
- CRUD para Fiscais, Empresas, Contratos
- Listagem dos registros de cada tabela

---

> Substitua este README conforme for evoluindo o projeto.
