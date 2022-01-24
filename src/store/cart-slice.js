import { createSlice } from '@reduxjs/toolkit'
import { uiActions } from './ui-slice'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false /** we use it  */,
    //totalAmount: 0
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items
    },
    addItemToCart(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)
      state.changed = true
      state.totalQuantity++

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        })
      } else {
        existingItem.quantity = existingItem.quantity + 1
        existingItem.totalPrice = existingItem.totalPrice + newItem.price
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload
      const existingItem = state.items.find((item) => item.id === id)
      state.changed = true
      state.totalQuantity--
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id)
      } else {
        // item[id].quantity -1; why not this way
        // he does it this way
        existingItem.quantity--
        //this code he doesn't write her as he said why ? i dont know yet
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price
      }
    },
  },
})

export const cartSliceActions = cartSlice.actions
export default cartSlice
