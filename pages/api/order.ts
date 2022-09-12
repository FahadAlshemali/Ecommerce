import { NextApiRequest, NextApiResponse } from 'next'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { uuid } from 'uuidv4'
import { extractSheets } from 'spreadsheet-to-json'
import { Product } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cartItems, ...order } = req.body
  const doc = new GoogleSpreadsheet(process.env.SHEET_ID)
  const credentials = JSON.parse(
    Buffer.from(process.env.SECRET!, 'base64').toString()
  )
  await doc.useServiceAccountAuth({
    private_key: credentials.private_key,
    client_email: credentials.client_email,
  })

  await doc.loadInfo()
  const orderSheet = doc.sheetsById['Order']
  const orderId = uuid()
  await orderSheet.addRow({ ...order, id: orderId })

  const data = await extractSheets(
    {
      spreadSheetKey: process.env.SHEET_ID,
      Credential: require('../../credentials.json'),
      sheetToExtract: ['Product'],
    },
    function (err: any, data: any) {
      return data
    }
  )
  const product = data.Product
  const orderLineSheet = doc.sheetsByTitle['orderLine']
  for (let i = 0; i < cartItems.length; i++) {
    const currentProduct: Product = await product.find(
      (product: Product) => product.id === cartItems[i].id
    )
    if (!currentProduct) {
      res.status(400).send('Product not found!')
    }
    await orderLineSheet.addRow({
      orderId,
      productId: currentProduct.id,
      quantity: cartItems[i].quantity,
    })
  }
}
