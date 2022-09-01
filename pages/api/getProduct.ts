import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from 'spreadsheet-to-json'
export default async function handler(

    req: NextApiRequest,
    res: NextApiResponse
  ) {
    extractSheets(
        {
          spreadsheetKey: process.env.SHEETS_ID,
    
          credentials: require('../../credentials.json'),
    
          sheetsToExtract: ['Product'],
        },
        function (err: any, data: any) {
          console.log('Product: ', data.Product)
          res.send(data.Product)
        }
      )
    }
  