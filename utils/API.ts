import axios from 'axios'
import { Dispatch } from 'redux'
import { getAllProducts } from 'redux/productSlice'
import { Product } from 'types'

const API = axios.create({ baseURL: 'http://localhost:3000/api/' })

export const getProducts = async (dispatch: Dispatch) => {
  const res = await API.get('getProduct')
  const data: Product[] = await res.data
  dispatch(getAllProducts(data))
}
