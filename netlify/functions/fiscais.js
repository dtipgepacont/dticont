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
    // Validar presença das variáveis de ambiente
    if (!process.env.GOOGLE_SERVICE_ACCOUNT || !process.env.GOOGLE_SHEET_ID) {
      console.error('Variáveis de ambiente não encontradas:', {
        hasServiceAccount: !!process.env.GOOGLE_SERVICE_ACCOUNT,
        hasSheetId: !!process.env.GOOGLE_SHEET_ID
      });
      throw new Error('Credenciais do Google Sheets não configuradas');
    }

    let serviceAccount;
    try {
      // Decodificar e fazer parse do JSON das credenciais
      const decodedCredentials = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT, 'base64').toString('utf8');
      serviceAccount = JSON.parse(decodedCredentials);
      
      // Validar campos obrigatórios das credenciais
      const requiredFields = ['client_email', 'private_key', 'project_id'];
      const missingFields = requiredFields.filter(field => !serviceAccount[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Campos obrigatórios ausentes nas credenciais: ${missingFields.join(', ')}`);
      }
    } catch (parseError) {
      console.error('Erro ao processar credenciais:', parseError);
      throw new Error('Credenciais do Google Service Account inválidas');
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    }

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Fiscais', // Nome da aba ajustado
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
    console.error('Erro na função fiscais:', error);
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
