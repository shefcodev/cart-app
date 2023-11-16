import { useDispatch } from 'react-redux';

import styles from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';

const CartButton = () => {
  const dispatchFn = useDispatch();

  const toggleCartHandler = () => {
    dispatchFn(uiActions.toggle());
  };

  return (
    <button className={styles.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={styles.badge}>1</span>
    </button>
  );
};

export default CartButton;
