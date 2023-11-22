import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, { payload }) {
      state.items = payload.items;
      state.totalQuantity = payload.totalQuantity;
      // state.changed = false; // reductant
    },
    addItemToCart(state, { payload }) {
      const newItem = payload;
      const existingItem = state.items.find(
        (item) => item.itemId === newItem.id
      );

      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price; // Checkout
        // existingItem.totalPrice = existingItem.quantity * existingItem.price;
      }

      state.totalQuantity++;
      state.changed = true;
    },
    removeItemFromCart(state, { payload }) {
      const id = payload;
      const existingItem = state.items.find((item) => item.itemId === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.itemId !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }

      state.totalQuantity--;
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
