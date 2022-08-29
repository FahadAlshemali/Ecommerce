import React from 'react'
import { Product } from 'types'
import { getAllItem } from 'pages/redux/productSlice'
import { useAppDispatch } from 'pages/redux/hooks'

const Products = ({ products }: any) => {
    const dispatch = useAppDispatch()
    console.log(Products)
    dispatch(getAllItem(products))
  return (
    <div>
      {products.map((product: any) => (
        <div key={product.id}>
          <div>
            <img src={product.imageSrc} />
          </div>
          <div>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Products
export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/getAllData')
  const data = await res.json()
 
  return { props: { products: data } }
}
