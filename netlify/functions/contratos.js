const { google } = require('googleapis');

exports.handler = async function(event, context) {
  // Configuração de CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Responder imediatamente a requisições OPTIONS (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Carregar credenciais do ambiente
    const serviceAccount = JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT, 'base64').toString('utf8'));
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!serviceAccount || !sheetId) {
      console.error('Credenciais não encontradas:', { 
        hasServiceAccount: !!process.env.GOOGLE_SERVICE_ACCOUNT,
        hasSheetId: !!process.env.GOOGLE_SHEET_ID 
      });
      throw new Error('Credenciais do Google Sheets não configuradas');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Contratos', // Nome da aba ajustado
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: res.data.values || []
      })
    };

  } catch (error) {
    console.error('Erro na função contratos:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};
