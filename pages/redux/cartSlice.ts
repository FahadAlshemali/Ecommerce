import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from 'types'

const initialState: {
  cartItems: Product[]
  cartTotalQuantity: number
  cartTotalAmount: number
} = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemsToCart(state, action: PayloadAction<Product[]>) {
      state.cartItems = action.payload
    },
    addProductToCart(state, action: PayloadAction<Product>) {
      state.cartItems.push(action.payload)
    },
  },
})

export const { addItemsToCart } = cartSlice.actions
export default cartSlice.reducer
