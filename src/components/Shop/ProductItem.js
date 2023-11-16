import { useDispatch } from 'react-redux';

import Card from '../UI/Card';
import { cartActions } from '../../store/cart-slice';
import styles from './ProductItem.module.css';

const ProductItem = ({ title, id, price, description }) => {
  const dispatchFn = useDispatch();

  const addItemToCartHandler = () => {
    dispatchFn(cartActions.addItemToCart({ title, id, price, description }));
  };

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button onClick={addItemToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
