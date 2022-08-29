import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from 'types'

const initialState: Product[] = []

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAllItem: (state, action: PayloadAction<Product[]>) => {
        console.log(state)
      return action.payload
    },
    addItem: (state, action: PayloadAction<Product>) => {
      state.push(action.payload)
    },
    removeItem: (state, action: PayloadAction<Product>) => {
      return state.filter(
        (product: Product) => product.id !== action.payload.id
      )
    },
  },
})

export const { getAllItem, addItem, removeItem } = productSlice.actions
export default productSlice.reducer
