import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, Product } from 'types'

const initialState: CartItem[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemsToCart(state, action) {
      const item = state.find(
        (product: Product) => product.id === action.payload.id
      )
      if (item) {
        return state.map((ele: CartItem) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity }
          } else {
            return item
          }
        })
      } else {
        return [...state, action.payload]
      }
      
    },
    removeItems(state, action){
      return state.filter(item => item.id !== action.payload)
    }
  },
})

export const { addItemsToCart , removeItems} = cartSlice.actions
export default cartSlice.reducer
