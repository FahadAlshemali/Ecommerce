import axios from 'axios'
import { Dispatch } from 'redux'
import { getAllProducts } from 'redux/productSlice'
import { Order, Product } from 'types'

const API = axios.create({ baseURL: 'http://localhost:3000/api/' })

export const addOrder = async (values: Order) => {
  await API.post('order', values)
}
