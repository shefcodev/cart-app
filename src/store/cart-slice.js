import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    replaceCart(state, { payload }) {
      state.items = payload.items;
      state.totalQuantity = payload.totalQuantity;
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
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatchFn) => {
    dispatchFn(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending!',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://redux-cart-8ce23-default-rtdb.firebaseio.com//cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed!');
      }
    };

    try {
      await sendRequest();

      dispatchFn(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatchFn(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
