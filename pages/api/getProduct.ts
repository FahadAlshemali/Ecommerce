import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from 'spreadsheet-to-json'
import { ColorType, ImageType, Product, SizesType } from 'types'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  extractSheets(
    {
      spreadsheetKey: process.env.SHEETS_ID,

      credentials: require('../../credentials.json'),

      sheetsToExtract: ['Product', 'Images', 'Colors', 'Sizes'],
    },
    function (
      err: any,
      data: {
        Product: Product[]
        Images: ImageType[]
        Colors: ColorType[]
        Sizes: SizesType[]
      }
    ) {
      const products = data.Product.map((product: any) => {
        const images = data.Images.filter(
          (image: ImageType) => image.productId === product.id
        )
        const colors = data.Colors.filter(
          (color: ColorType) => color.productId === product.id
        )
        const sizes = data.Sizes.filter(
          (size: SizesType) => size.productId === product.id
        )
        return { ...product, images, colors, sizes }
      })

      res.send(products)
    }
  )
}
