import { useDispatch } from 'react-redux';

import Card from '../UI/Card';
import { cartActions } from '../../store/cart-slice';
import styles from './ProductItem.module.css';

const ProductItem = ({ title, id, price, description }) => {
  const dispatchFn = useDispatch();

  const addItemToCartHandler = () => {
    // fetch('https://redux-cart-8ce23-default-rtdb.firebaseio.com/cart.json', {
    //   method: 'POST',
    //   body: JSON.stringify(newCart),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

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

// const newTotalQunatity = cart.totalQuantity + 1;
// const updatedItems = cart.items.slice();
// const existingItem = updatedItems.find((item) => item.itemId === id);

// if (existingItem) {
//   const updatedItem = { ...existingItem };
//   updatedItem.quantity++;
//   updatedItem.totalPrice += price;
//   const existingItemIndex = updatedItems.findIndex(
//     (item) => item.itemId === id
//   );
//   updatedItems[existingItemIndex] = updatedItem;
// } else {
//   updatedItems.push({
//     name: title,
//     itemId: id,
//     price: price,
//     quantity: 1,
//     totalPrice: 1,
//   });
// }

// const newCart = {
//   items: updatedItems,
//   totalQuantity: newTotalQunatity,
// };
// dispatchFn(cartActions.replaceCart(newCart));
