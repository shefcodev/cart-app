import { useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import styles from './CartItem.module.css';

const CartItem = ({ title, id, quantity, total, price }) => {
  const dispatchFn = useDispatch();

  const addToCartHandler = () => {
    dispatchFn(cartActions.addItemToCart({ title, id, price }));
  };

  const removeFromCartHandler = () => {
    dispatchFn(cartActions.removeItemFromCart(id));
  };

  return (
    <li className={styles.item}>
      <header>
        <h3>{title}</h3>
        <div className={styles.price}>
          ${total.toFixed(2)}{' '}
          <span className={styles.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={styles.details}>
        <div className={styles.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={removeFromCartHandler}>-</button>
          <button onClick={addToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
