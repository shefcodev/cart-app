import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../store/ui-slice';
import styles from './CartButton.module.css';

const CartButton = () => {
  const dispatchFn = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatchFn(uiActions.toggle());
  };

  return (
    <button className={styles.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={styles.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
