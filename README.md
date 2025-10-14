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

### 1. Criar credenciais Google
1. Acesse https://console.cloud.google.com/
2. Crie um novo projeto ou selecione um existente.
3. No menu lateral, acesse "APIs e serviços" > "Biblioteca" e ative a **Google Sheets API**.
4. No menu "APIs e serviços" > "Credenciais", clique em "Criar credencial" > "Conta de serviço".
5. Siga os passos e faça o download do arquivo JSON da conta de serviço.
6. No Google Sheets, compartilhe a planilha com o e-mail da conta de serviço (ex: `xxxx@xxxx.iam.gserviceaccount.com`) com permissão de editor.

### 2. Configurar variáveis de ambiente no Netlify
1. Abra o arquivo JSON da conta de serviço em um editor de texto.
2. Codifique o conteúdo do JSON em base64. Exemplo (no terminal):
   ```bash
   base64 -w 0 caminho/para/seu-arquivo.json
   ```
   No Windows, use:
   ```powershell
   [Convert]::ToBase64String([IO.File]::ReadAllBytes('caminho\\para\\seu-arquivo.json'))
   ```
3. No painel do Netlify, acesse "Site settings" > "Environment variables" e adicione:
   - `GOOGLE_SERVICE_ACCOUNT` com o valor gerado em base64
   - `GOOGLE_SHEET_ID` com o ID da sua planilha (encontrado na URL do Google Sheets)

### 3. Deploy
Após configurar as variáveis, o deploy funcionará normalmente e o sistema terá acesso à planilha.

## Estrutura de Pastas
- `src/` - Frontend React
- `netlify/functions/` - Funções serverless para CRUD

## Funcionalidades
- Menu principal
- CRUD para Fiscais, Empresas, Contratos
- Listagem dos registros de cada tabela

---

> Substitua este README conforme for evoluindo o projeto.
