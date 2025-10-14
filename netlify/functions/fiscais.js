// Exemplo de função serverless para listar fiscais (Google Sheets API)
const { google } = require('googleapis');

exports.handler = async function(event, context) {
  // Carregar credenciais do ambiente
  const serviceAccount = JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT, 'base64').toString('utf8'));
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'TblFiscais',
    });
    return {
      statusCode: 200,
      body: JSON.stringify(res.data.values),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
