import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from 'spreadsheet-to-json'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  extractSheets(
    {
      spreadsheetKey: process.env.SHEET_ID,

      credentials: require('../../credentials.json'),

      sheetsToExtract: ['Product'],
    },
    function (err: any, data: any) {
      const product = data.Product.find((item: any) => item.id == req.query.id)
      console.log(product)
      res.send(product)
    }
  )
}
