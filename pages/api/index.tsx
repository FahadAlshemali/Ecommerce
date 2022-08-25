//  Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { extractSheets } from 'spreadsheet-to-json'
import type { NextApiRequest, NextApiResponse } from 'next'

// interface Data extends GaxiosResponse{
//   name: string
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  extractSheets(
    {
      // your google spreadhsheet key
      spreadsheetKey: '12ozPThNSYrW6D16tg0zabyZqEsRT7y4XjB5nsJkHNmM',
      // your google oauth2 credentials or API_KEY
      credentials: require('../../credentials.json'),
      // optional: names of the sheets you want to extract
      sheetsToExtract: ['Product'],
      // optional: custom function to parse the cells
      //formatCell: formatCell
    },
    function (err: any, data: any) {
      console.log('Product: ', data.Product)
      res.send(data.Product)
    }
  )
}
