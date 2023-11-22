import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

const App = () => {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatchFn = useDispatch();

  useEffect(() => {
    dispatchFn(fetchCartData());
  }, [dispatchFn]);

  useEffect(() => {
    if (isInitial) {
      // dispatchFn(fetchCartData()); Can alternatively fetch cart-data onload here
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatchFn(sendCartData(cart));
    }
  }, [cart, dispatchFn]);

  return (
    <Fragment>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
};

export default App;
