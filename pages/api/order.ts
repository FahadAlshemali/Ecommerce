import { NextApiRequest, NextApiResponse } from 'next'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { uuid } from 'uuidv4'
import { extractSheets } from 'spreadsheet-to-json'
import { Product } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      postalCode,
      address,
      floor,
      apartment,
      cartItems,
    } = req.body
    const doc = new GoogleSpreadsheet(process.env.SHEET_ID)
    const credentials = JSON.parse(
      Buffer.from(process.env.SECRET!, 'base64').toString()
    )
    await doc.useServiceAccountAuth({
      private_key: credentials.private_key,
      client_email: credentials.client_email,
    })

    await doc.loadInfo()
    const orderId = uuid()
    const orderSheet = doc.sheetsByTitle['Order']
    await orderSheet.addRow({
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      postalCode,
      address,
      floor,
      apartment,
      id: orderId,
    })
    const orderLineSheet = doc.sheetsByTitle['orderLine']

    for (let i = 0; i < cartItems.length; i++) {
      await orderLineSheet.addRow({
        id: uuid(),
        orderId,
        productId: cartItems[i].id,
        quantity: cartItems[i].quantity,
      })
    }
    res.send({ message: 'Order is created' })
  } catch (e) {
    res.status(500).send(e)
  }
}
