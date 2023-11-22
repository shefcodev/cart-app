import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  return async (dispatchFn) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://redux-cart-8ce23-default-rtdb.firebaseio.com//cart.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch data!');
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();

      dispatchFn(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatchFn(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
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
