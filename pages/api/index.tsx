import { extractSheets } from 'spreadsheet-to-json'
import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { uuid } from 'uuidv4'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      const id = uuid()
      const { Name, Description, Price, Image } = req.body
      const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
      })
      const client = await auth.getClient()

      const googleSheets = google.sheets({ version: 'v4', auth: client })
      const spreadsheetId = process.env.SHEETS_ID

      const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
      })

      googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: 'Product!A1:H1',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[id, Name, Description, Price, Image]] },
      })
      break
  }

//   extractSheets(
//     {
//       spreadsheetKey: process.env.SHEETS_ID,

//       credentials: require('../../credentials.json'),

//       sheetsToExtract: ['Product'],
//     },
//     function (err: any, data: any) {
//       console.log('Product: ', data.Product)
//       res.send(data)
//     }
//   )
// 
}
